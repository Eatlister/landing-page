import { RateLimiterMemory } from "rate-limiter-flexible";

export const emailRateLimiter = new RateLimiterMemory({
  keyPrefix: "email_ip",
  points: 3,
  duration: 60 * 15,
  blockDuration: 60 * 30,
});

export const emailAddressRateLimiter = new RateLimiterMemory({
  keyPrefix: "email_address",
  points: 2,
  duration: 60 * 60,
  blockDuration: 60 * 60 * 2,
});

export async function checkRateLimit(req: any): Promise<{
  allowed: boolean;
  remainingPoints: number;
  resetTime: number;
  blocked: boolean;
}> {
  try {
    const ipKey =
      (req.headers["x-forwarded-for"] as string) ||
      (req.headers["x-real-ip"] as string) ||
      "unknown";

    const ipLimit = await emailRateLimiter.get(ipKey);

    if (!ipLimit || ipLimit.remainingPoints <= 0) {
      return {
        allowed: false,
        remainingPoints: 0,
        resetTime: ipLimit?.msBeforeNext || 0,
        blocked: true,
      };
    }

    return {
      allowed: true,
      remainingPoints: ipLimit.remainingPoints,
      resetTime: ipLimit.msBeforeNext,
      blocked: false,
    };
  } catch (error) {
    console.error("Erro ao verificar rate limit:", error);
    return {
      allowed: true,
      remainingPoints: 3,
      resetTime: 0,
      blocked: false,
    };
  }
}

export async function consumeRateLimit(req: any): Promise<boolean> {
  try {
    const ipKey =
      (req.headers["x-forwarded-for"] as string) ||
      (req.headers["x-real-ip"] as string) ||
      "unknown";

    await emailRateLimiter.consume(ipKey);
    return true;
  } catch (error) {
    console.error("Erro ao consumir rate limit:", error);
    return false;
  }
}

export async function checkEmailRateLimit(email: string): Promise<boolean> {
  try {
    const emailKey = email.toLowerCase().trim();
    const emailLimit = await emailAddressRateLimiter.get(emailKey);

    if (!emailLimit || emailLimit.remainingPoints <= 0) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao verificar rate limit do email:", error);
    return true;
  }
}

export async function consumeEmailRateLimit(email: string): Promise<boolean> {
  try {
    const emailKey = email.toLowerCase().trim();
    await emailAddressRateLimiter.consume(emailKey);
    return true;
  } catch (error) {
    console.error("Erro ao consumir rate limit do email:", error);
    return false;
  }
}
