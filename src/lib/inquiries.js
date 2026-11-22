
import "server-only";

import { withRestrictedTransaction } from "@/lib/restrictedTransaction";
import { generateInquiryToken } from "@/lib/inquiryTokens";

/**
 * Save a validated client inquiry using the restricted API role.
 *
 * The protected PostgreSQL function creates the inquiry
 * and its authorization-token hash atomically.
 *
 * Call only after request validation and rate limiting.
 */
export async function saveClientInquiry(inquiry) {
  const { name, email, service, budget, message } = inquiry;

  const { token, tokenHash } = generateInquiryToken();

  const result = await withRestrictedTransaction(
    async (client) => {
      const { rows } = await client.query(
        `
          SELECT
            inquiry_id,
            inquiry_created_at
          FROM public.create_authorized_inquiry(
            $1, $2, $3, $4, $5, $6
          )
        `,
        [
          name.trim(),
          email.trim(),
          service,
          budget ?? "",
          message.trim(),
          tokenHash,
        ]
      );

      if (rows.length !== 1 || !rows[0]?.inquiry_id) {
        throw new Error("Failed to save client inquiry.");
      }

      return {
        id: rows[0].inquiry_id,
        createdAt: rows[0].inquiry_created_at,
      };
    }
  );

  return {
    ...result,
    authorizationToken: token,
  };
}

/**
 * Mark a notification as accepted by Resend.
 *
 * A valid inquiry-specific token is required.
 * This does not guarantee inbox delivery.
 */
export async function markInquiryEmailSent(
  inquiryId,
  messageId,
  authorizationToken
) {
  if (
    typeof messageId !== "string" ||
    !messageId.trim()
  ) {
    throw new Error("A valid email message ID is required.");
  }

  const updated = await withRestrictedTransaction(
    async (client) => {
      const { rows } = await client.query(
        `
          SELECT public.update_inquiry_notification(
            $1::uuid,
            $2::text,
            'sent',
            $3::text
          ) AS updated
        `,
        [inquiryId, authorizationToken, messageId]
      );

      return rows[0]?.updated === true;
    }
  );

  if (!updated) {
    throw new Error("Unable to mark notification as sent.");
  }

  return true;
}

/**
 * Mark a notification as failed.
 *
 * The original client inquiry remains stored.
 * A valid inquiry-specific token is required.
 */
export async function markInquiryEmailFailed(
  inquiryId,
  authorizationToken
) {
  const updated = await withRestrictedTransaction(
    async (client) => {
      const { rows } = await client.query(
        `
          SELECT public.update_inquiry_notification(
            $1::uuid,
            $2::text,
            'failed',
            NULL::text
          ) AS updated
        `,
        [inquiryId, authorizationToken]
      );

      return rows[0]?.updated === true;
    }
  );

  if (!updated) {
    throw new Error("Unable to mark notification as failed.");
  }

  return true;
}
