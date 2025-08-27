export const SECURITY_CONFIG = {
  RATE_LIMIT: {
    IP_MAX_ATTEMPTS: 3,
    IP_WINDOW_MS: 15 * 60 * 1000,
    IP_BLOCK_DURATION_MS: 30 * 60 * 1000,

    EMAIL_MAX_ATTEMPTS: 2,
    EMAIL_WINDOW_MS: 60 * 60 * 1000,
    EMAIL_BLOCK_DURATION_MS: 2 * 60 * 60 * 1000,
  },

  BOT_PROTECTION: {
    MIN_FORM_FILL_TIME_MS: 2000,
    MAX_FORM_FILL_TIME_MS: 300000,
    MIN_TRUST_SCORE: 50,
  },

  EMAIL_VALIDATION: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 254,
    BLOCKED_PATTERNS: [
      /^test@/i,
      /^admin@/i,
      /^info@/i,
      /^noreply@/i,
      /^bot@/i,
      /^spam@/i,
      /^[a-z]{1,2}@[a-z]{1,2}\.[a-z]{1,2}$/i,
      /^[a-z]+@[a-z]+\.(test|local|invalid)$/i,
    ],
  },

  IP_BLACKLIST: ["127.0.0.1", "0.0.0.0", "255.255.255.255", "::1", "fe80::1"],

  USER_AGENT: {
    MIN_LENGTH: 20,
    BLOCKED_KEYWORDS: ["bot", "crawler", "spider", "scraper", "automation"],
  },

  LOGGING: {
    LOG_BOT_ATTEMPTS: true,
    LOG_RATE_LIMIT_VIOLATIONS: true,
    LOG_SUSPICIOUS_ACTIVITY: true,
    LOG_SUCCESSFUL_SUBMISSIONS: true,
  },
};

export function isFeatureEnabled(
  feature: keyof typeof SECURITY_CONFIG
): boolean {
  return SECURITY_CONFIG[feature] !== undefined;
}

export function getConfig<T>(path: string): T | undefined {
  const keys = path.split(".");
  let current: any = SECURITY_CONFIG;

  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }

  return current;
}
