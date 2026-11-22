
import "server-only";

import {
  randomBytes,
  createHash,
  timingSafeEqual,
} from "node:crypto";

const TOKEN_BYTES = 32;
const TOKEN_HEX_LENGTH = TOKEN_BYTES * 2;

export function generateInquiryToken() {
  const token = randomBytes(TOKEN_BYTES).toString("hex");

  return {
    token,
    tokenHash: hashInquiryToken(token),
  };
}

export function hashInquiryToken(token) {
  if (
    typeof token !== "string" ||
    !/^[0-9a-f]{64}$/.test(token)
  ) {
    throw new Error("Invalid inquiry authorization token.");
  }

  return createHash("sha256")
    .update(token, "utf8")
    .digest("hex");
}

export function verifyInquiryToken(token, storedHash) {
  if (
    typeof storedHash !== "string" ||
    !/^[0-9a-f]{64}$/.test(storedHash)
  ) {
    return false;
  }

  let calculatedHash;

  try {
    calculatedHash = hashInquiryToken(token);
  } catch {
    return false;
  }

  return timingSafeEqual(
    Buffer.from(calculatedHash, "hex"),
    Buffer.from(storedHash, "hex")
  );
}
