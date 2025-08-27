// Sistema de proteção contra bots

// Tempo mínimo para preenchimento do formulário (em milissegundos)
const MIN_FORM_FILL_TIME = 2000; // 2 segundos

// Tempo máximo para preenchimento do formulário (em milissegundos)
const MAX_FORM_FILL_TIME = 300000;

export interface BotProtectionData {
  startTime: number;
  honeypot: string;
  userAgent: string;
  referer: string;
}

export interface BotProtectionResult {
  isBot: boolean;
  reason?: string;
  score: number;
}

export function generateBotProtectionData(): BotProtectionData {
  return {
    startTime: Date.now(),
    honeypot: "",
    userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "",
    referer: typeof window !== "undefined" ? document.referrer : "",
  };
}

export function validateBotProtection(
  data: BotProtectionData,
  submittedData: any
): BotProtectionResult {
  let score = 100;
  let reason = "";

  const fillTime = Date.now() - data.startTime;

  if (fillTime < MIN_FORM_FILL_TIME) {
    score -= 40;
    reason = "Formulário preenchido muito rapidamente";
  } else if (fillTime > MAX_FORM_FILL_TIME) {
    score -= 20;
    reason = "Formulário demorou muito para ser preenchido";
  }

  if (submittedData.honeypot && submittedData.honeypot.trim() !== "") {
    score = 0;
    reason = "Campo honeypot preenchido (bot detectado)";
  }

  if (!submittedData.userAgent || submittedData.userAgent.trim() === "") {
    score -= 30;
    reason = "User-Agent ausente";
  } else if (
    submittedData.userAgent.includes("bot") ||
    submittedData.userAgent.includes("crawler") ||
    submittedData.userAgent.includes("spider")
  ) {
    score = 0;
    reason = "User-Agent indica bot/crawler";
  }

  if (!submittedData.referer && typeof window !== "undefined") {
    score -= 10;
    reason = "Referer ausente";
  }

  if (submittedData.email && submittedData.email.includes("test@")) {
    score -= 20;
    reason = "Email de teste suspeito";
  }

  if (score < 30) {
    return {
      isBot: true,
      reason: reason || "Múltiplos indicadores de bot",
      score,
    };
  }

  return {
    isBot: false,
    reason: reason || "Validação passou",
    score,
  };
}

export function validateEmailPatterns(email: string): boolean {
  const suspiciousPatterns = [
    /^test@/i,
    /^admin@/i,
    /^info@/i,
    /^noreply@/i,
    /^bot@/i,
    /^spam@/i,
    /^[a-z]{1,2}@[a-z]{1,2}\.[a-z]{1,2}$/i,
    /^[a-z]+@[a-z]+\.(test|local|invalid)$/i,
  ];

  return !suspiciousPatterns.some((pattern) => pattern.test(email));
}

export function isIPBlacklisted(ip: string): boolean {
  const blacklistedIPs = ["127.0.0.1", "0.0.0.0", "255.255.255.255"];

  return blacklistedIPs.includes(ip);
}

export function calculateTrustScore(
  email: string,
  userAgent: string,
  ip: string,
  fillTime: number
): number {
  let score = 100;

  if (email && email.includes("@") && email.includes(".")) {
    score += 10;
  } else {
    score -= 30;
  }

  if (userAgent && userAgent.length > 20) {
    score += 10;
  } else {
    score -= 20;
  }

  if (ip && ip !== "unknown" && !isIPBlacklisted(ip)) {
    score += 10;
  } else {
    score -= 20;
  }

  if (fillTime >= MIN_FORM_FILL_TIME && fillTime <= MAX_FORM_FILL_TIME) {
    score += 20;
  } else {
    score -= 30;
  }

  return Math.max(0, Math.min(100, score));
}
