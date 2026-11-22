
const MAX_BODY_BYTES = 12 * 1024;

export async function submitContactInquiry(
  inquiry,
  { signal } = {}
) {
  const payload = JSON.stringify({
    name: inquiry.name.trim(),
    email: inquiry.email.trim(),
    service: inquiry.service,
    budget: inquiry.budget || "",
    message: inquiry.message.trim(),
  });

  const bodySize = new TextEncoder().encode(
    payload
  ).byteLength;

  if (bodySize > MAX_BODY_BYTES) {
    throw new Error(
      "Your inquiry is too large. Please shorten your message."
    );
  }

  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
    credentials: "same-origin",
    cache: "no-store",
    signal,
  });

  let result;

  try {
    result = await response.json();
  } catch {
    throw new Error(
      "Unexpected server response. Please try again later."
    );
  }

  if (
    !result ||
    typeof result !== "object" ||
    Array.isArray(result)
  ) {
    throw new Error(
      "Invalid server response. Please try again later."
    );
  }

  if (!response.ok || result.success !== true) {
    const errorMessage =
      typeof result.error === "string" &&
      result.error.trim()
        ? result.error
        : "Unable to submit your inquiry. Please try again later.";

    throw new Error(errorMessage);
  }

  if (
    typeof result.inquiryId !== "string" ||
    !result.inquiryId.trim()
  ) {
    throw new Error(
      "Inquiry confirmation was incomplete. Please contact support before submitting again."
    );
  }

  return {
    success: true,
    message:
      typeof result.message === "string"
        ? result.message
        : "Your inquiry has been received successfully.",
    inquiryId: result.inquiryId,
  };
}
