
import "server-only";

import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY?.trim();

const notificationEmail =
  process.env.CONTACT_NOTIFICATION_EMAIL?.trim();

const resend = resendApiKey
  ? new Resend(resendApiKey)
  : null;

export const emailConfigured = Boolean(
  resend && notificationEmail
);

function escapeHtml(value) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (character) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };

      return entities[character];
    }
  );
}

export async function sendInquiryNotification(inquiry) {
  if (!emailConfigured) {
    throw new Error("Email service is not configured.");
  }

  const { name, email, service, budget, message } = inquiry;

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeService = escapeHtml(service);
  const safeBudget = escapeHtml(
    budget || "Not specified"
  );

  const safeMessage = escapeHtml(message).replace(
    /\r\n|\r|\n/g,
    "<br>"
  );

  const { data, error } = await resend.emails.send({
    from: "EVERISE DEV <onboarding@resend.dev>",
    to: [notificationEmail],
    subject: "EVERISE DEV - New Client Inquiry",

    text: [
      "New client inquiry received.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Service: ${service}`,
      `Budget: ${budget || "Not specified"}`,
      "",
      "Project Details:",
      message,
    ].join("\n"),

    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
        <h2>New Client Inquiry</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Service:</strong> ${safeService}</p>
        <p><strong>Budget:</strong> ${safeBudget}</p>
        <h3>Project Details</h3>
        <p>${safeMessage}</p>
        <hr>
        <p>EVERISE DEV - Client Inquiry Notification</p>
      </div>
    `,
  });

  if (
    error ||
    typeof data?.id !== "string" ||
    !data.id.trim()
  ) {
    throw new Error(
      "Failed to send inquiry notification."
    );
  }

  return {
    messageId: data.id.trim(),
  };
}
