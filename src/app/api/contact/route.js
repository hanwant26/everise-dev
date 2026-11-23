
import { NextResponse } from "next/server";

import {
  contactRateLimiter,
  rateLimiterConfigured,
  getClientIdentifier,
} from "@/lib/rateLimit";

import {
  saveClientInquiry,
  markInquiryEmailSent,
  markInquiryEmailFailed,
} from "@/lib/inquiries";

import {
  sendInquiryNotification,
  emailConfigured,
} from "@/lib/email";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 12 * 1024;

const ALLOWED_SERVICES = new Set([
  "website",
  "ecommerce",
  "webapp",
  "maintenance",
  "other",
]);

const ALLOWED_BUDGETS = new Set([
  "",
  "under-10k",
  "10k-25k",
  "25k-50k",
  "50k-plus",
  "discuss",
]);

const ALLOWED_FIELDS = new Set([
  "name",
  "email",
  "service",
  "budget",
  "message",
]);

function jsonResponse(body, status, extraHeaders = {}) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders,
    },
  });
}

function getAllowedOrigins() {
  const origins = new Set();

  if (process.env.NODE_ENV === "development") {
    origins.add("http://localhost:3000");
    origins.add("http://127.0.0.1:3000");
  }

  const configured =
    process.env.CONTACT_ALLOWED_ORIGINS || "";

  for (const entry of configured.split(",")) {
    const value = entry.trim();

    if (!value) continue;

    try {
      const url = new URL(value);

      if (
        !["http:", "https:"].includes(url.protocol) ||
        url.username ||
        url.password ||
        url.pathname !== "/" ||
        url.search ||
        url.hash
      ) {
        continue;
      }

      origins.add(url.origin);
    } catch {
      // Ignore invalid configured origins.
    }
  }

  return origins;
}

function isAllowedOrigin(request) {
  const header = request.headers.get("origin");

  if (!header) return false;

  try {
    const origin = new URL(header);

    return (
      header === origin.origin &&
      ["http:", "https:"].includes(origin.protocol) &&
      getAllowedOrigins().has(origin.origin)
    );
  } catch {
    return false;
  }
}

function isValidText(value, min, max) {
  return (
    typeof value === "string" &&
    value.trim().length >= min &&
    value.trim().length <= max &&
    !/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(
      value
    )
  );
}

function isValidEmail(value) {
  if (typeof value !== "string") return false;

  const email = value.trim();

  return (
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}

function validateInquiry(data) {
  if (
    !data ||
    typeof data !== "object" ||
    Array.isArray(data)
  ) {
    return "Invalid request data.";
  }

  if (
    Object.keys(data).some(
      (field) => !ALLOWED_FIELDS.has(field)
    )
  ) {
    return "Unexpected form field.";
  }

  if (!isValidText(data.name, 2, 100)) {
    return "Name must contain 2 to 100 characters.";
  }

  if (!isValidEmail(data.email)) {
    return "Enter a valid email address.";
  }

  if (!ALLOWED_SERVICES.has(data.service)) {
    return "Select a valid service.";
  }

  if (!ALLOWED_BUDGETS.has(data.budget ?? "")) {
    return "Select a valid budget.";
  }

  if (!isValidText(data.message, 10, 3000)) {
    return "Project details must contain 10 to 3000 characters.";
  }

  return null;
}

async function readLimitedJson(request) {
  const reader = request.body.getReader();
  const chunks = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      totalBytes += value.byteLength;

      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel().catch(() => { });

        return { error: "too_large" };
      }

      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;

  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    const text = new TextDecoder("utf-8", {
      fatal: true,
    }).decode(bytes);

    return { data: JSON.parse(text) };
  } catch {
    return { error: "invalid_json" };
  }
}

export async function POST(request) {
  try {
    // 1. Verify request origin.
    if (!isAllowedOrigin(request)) {
      return jsonResponse(
        {
          success: false,
          error: "Request origin is not allowed.",
        },
        403
      );
    }

    // 2. Verify rate limiter configuration.
    if (!rateLimiterConfigured || !contactRateLimiter) {
      return jsonResponse(
        {
          success: false,
          error: "Service temporarily unavailable.",
        },
        503
      );
    }

    const identifier = getClientIdentifier(request);

    if (!identifier) {
      return jsonResponse(
        {
          success: false,
          error: "Service temporarily unavailable.",
        },
        503
      );
    }

    // 3. Enforce rate limiting.
    let rateLimitResult;

    try {
      rateLimitResult =
        await contactRateLimiter.limit(identifier);
    } catch {
      return jsonResponse(
        {
          success: false,
          error: "Service temporarily unavailable.",
        },
        503
      );
    }

    if (!rateLimitResult.success) {
      const retryAfter = Math.max(
        1,
        Math.ceil(
          (rateLimitResult.reset - Date.now()) / 1000
        )
      );

      return jsonResponse(
        {
          success: false,
          error:
            "Too many requests. Please try again later.",
        },
        429,
        {
          "Retry-After": String(retryAfter),
        }
      );
    }

    // 4. Verify content type.
    const contentType =
      request.headers.get("content-type") || "";

    if (
      !/^application\/json(?:\s*;|$)/i.test(contentType)
    ) {
      return jsonResponse(
        {
          success: false,
          error: "JSON content required.",
        },
        415
      );
    }

    // 5. Enforce request size limit.
    const contentLength =
      request.headers.get("content-length");

    if (
      contentLength !== null &&
      (!/^\d+$/.test(contentLength) ||
        Number(contentLength) > MAX_BODY_BYTES)
    ) {
      return jsonResponse(
        {
          success: false,
          error: "Request is too large.",
        },
        413
      );
    }

    if (!request.body) {
      return jsonResponse(
        {
          success: false,
          error: "Request body required.",
        },
        400
      );
    }

    // 6. Parse JSON safely.
    const parsed = await readLimitedJson(request);

    if (parsed.error === "too_large") {
      return jsonResponse(
        {
          success: false,
          error: "Request is too large.",
        },
        413
      );
    }

    if (parsed.error) {
      return jsonResponse(
        {
          success: false,
          error: "Invalid JSON request.",
        },
        400
      );
    }

    // 7. Validate inquiry fields.
    const validationError = validateInquiry(parsed.data);

    if (validationError) {
      return jsonResponse(
        {
          success: false,
          error: validationError,
        },
        400
      );
    }

    // 8. Verify email configuration.
    if (!emailConfigured) {
      return jsonResponse(
        {
          success: false,
          error:
            "Inquiry service temporarily unavailable.",
        },
        503
      );
    }

    // 9. Save inquiry through the protected database function.
    

    let savedInquiry;

    try {
      savedInquiry = await saveClientInquiry(
        parsed.data
      );

      
    } catch {
      return jsonResponse(
        {
          success: false,
          error:
            "Unable to save inquiry. Please try again later.",
        },
        503
      );
    }

    // The authorization token is server-only.
    // Never include it in API responses or logs.
    const authorizationToken =
      savedInquiry.authorizationToken;

    // 10. Attempt email notification.
    let notificationMessageId = null;

    try {
      

      const notification =
        await sendInquiryNotification(parsed.data);

      

      notificationMessageId = notification.messageId;
    } catch {
      // Resend failed or rejected the request.
      // Preserve the stored inquiry.
      try {
        await markInquiryEmailFailed(
          savedInquiry.id,
          authorizationToken
        );
      } catch {
        // Tracking failure must not erase the inquiry.
      }
    }

    // 11. Record successful Resend acceptance.
    if (notificationMessageId) {
      try {
        

        await markInquiryEmailSent(
          savedInquiry.id,
          notificationMessageId,
          authorizationToken
        );

        
      } catch {
        // Resend may already have accepted the email.
        // Do not send it again.
        // Leave the inquiry available for review.
      }
    }

    // 12. Confirm successful inquiry storage.
    // Never return the authorization token.
    return jsonResponse(
      {
        success: true,
        message:
          "Your inquiry has been received successfully.",
        inquiryId: savedInquiry.id,
      },
      201
    );
  } catch {
    return jsonResponse(
      {
        success: false,
        error: "Unable to process the request.",
      },
      500
    );
  }
}

export async function GET() {
  return jsonResponse(
    {
      success: false,
      error: "Method not allowed.",
    },
    405
  );
}
