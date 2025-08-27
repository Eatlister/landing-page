// Configurações de segurança e validação

export const SECURITY_CONFIG = {
  // Rate Limiting
  RATE_LIMIT: {
    IP_MAX_ATTEMPTS: 3, // Máximo de tentativas por IP
    IP_WINDOW_MS: 15 * 60 * 1000, // 15 minutos
    IP_BLOCK_DURATION_MS: 30 * 60 * 1000, // 30 minutos

    EMAIL_MAX_ATTEMPTS: 2, // Máximo de tentativas por email
    EMAIL_WINDOW_MS: 60 * 60 * 1000, // 1 hora
    EMAIL_BLOCK_DURATION_MS: 2 * 60 * 60 * 1000, // 2 horas
  },

  // Bot Protection
  BOT_PROTECTION: {
    MIN_FORM_FILL_TIME_MS: 2000, // 2 segundos
    MAX_FORM_FILL_TIME_MS: 300000, // 5 minutos
    MIN_TRUST_SCORE: 50, // Score mínimo de confiança
  },

  // Email Validation
  EMAIL_VALIDATION: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 254,
    ALLOWED_DOMAINS: [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "icloud.com",
      "protonmail.com",
      "tutanota.com",
    ],
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

  // IP Blacklist
  IP_BLACKLIST: [
    "127.0.0.1", // localhost
    "0.0.0.0",
    "255.255.255.255",
    "::1", // IPv6 localhost
    "fe80::1", // IPv6 link-local
  ],

  // User-Agent Validation
  USER_AGENT: {
    MIN_LENGTH: 20,
    BLOCKED_KEYWORDS: ["bot", "crawler", "spider", "scraper", "automation"],
  },

  // Logging
  LOGGING: {
    LOG_BOT_ATTEMPTS: true,
    LOG_RATE_LIMIT_VIOLATIONS: true,
    LOG_SUSPICIOUS_ACTIVITY: true,
    LOG_SUCCESSFUL_SUBMISSIONS: true,
  },
};

// Função para verificar se uma configuração está habilitada
export function isFeatureEnabled(
  feature: keyof typeof SECURITY_CONFIG
): boolean {
  return SECURITY_CONFIG[feature] !== undefined;
}

// Função para obter configuração específica
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
