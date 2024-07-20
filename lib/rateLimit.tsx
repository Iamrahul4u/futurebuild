"use server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
const rateLimit = new Ratelimit({
  redis: kv, // Use Vercel KV for storage
  limiter: Ratelimit.slidingWindow(5, "30s"), // Limit to 5 requests per minute
});

export default async function rateLimiter() {
  // Check if the user has reached their rate limit
  const ip = headers().get("x-forwarded-for") || "unknown";

  const { success } = await rateLimit.limit(`ratelimit_${ip}`);
  if (!success) {
    return {
      error: "Internal Server Error",
    };
  }
  return NextResponse.next();
}
