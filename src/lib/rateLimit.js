
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { isIP } from "node:net";

// Read credentials from server-side environment variables.
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

// Both credentials must exist.
export const rateLimiterConfigured = Boolean(
  redisUrl && redisToken
);

// Initialize a shared Redis-backed rate limiter.
export const contactRateLimiter = rateLimiterConfigured
  ? new Ratelimit({
      redis: new Redis({
        url: redisUrl,
        token: redisToken,
      }),

      // Maximum 5 requests per 10 minutes.
      limiter: Ratelimit.slidingWindow(5, "10 m"),

      // Keep contact API counters separate.
      prefix: "everise:contact:ratelimit:v1",

      // Disable optional analytics and telemetry.
      analytics: false,
      enableTelemetry: false,
    })
  : null;

// Identify the client for rate limiting.
export function getClientIdentifier(request) {
  // Trust this header only when deployed behind
  // Vercel's trusted proxy infrastructure.
  if (process.env.VERCEL === "1") {
    const ip = request.headers.get("x-real-ip")?.trim();

    if (ip && isIP(ip)) {
      return `ip:${ip}`;
    }
  }

  // Local development uses one shared testing bucket.
  if (process.env.NODE_ENV === "development") {
    return "development-local";
  }

  // Fail closed when a trusted identifier is unavailable.
  return null;
}
