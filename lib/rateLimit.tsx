"use server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
const rateLimit = new Ratelimit({
  redis: kv, // Use Vercel KV for storage
  limiter: Ratelimit.slidingWindow(60, "1m"), // Limit to 5 requests per minute
});

export default async function rateLimiter() {
  // Check if the user has reached their rate limit
  try {
    const ip = headers().get("x-forwarded-for") || "unknown";

    const { success } = await rateLimit.limit(`ratelimit_${ip}`);
    if (!success) {
      return {
        success: false,
        error: "Rate Limit Exceeded",
        statusCode: 301,
      };
    }
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: "Internal Server Error",
      statusCode: 401,
    };
  }
}
