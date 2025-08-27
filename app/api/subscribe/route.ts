import {
  calculateTrustScore,
  isIPBlacklisted,
  validateBotProtection,
  validateEmailPatterns,
} from "@/lib/bot-protection";
import { prisma } from "@/lib/prisma";
import {
  checkEmailRateLimit,
  checkRateLimit,
  consumeEmailRateLimit,
  consumeRateLimit,
} from "@/lib/rate-limiter";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, honeypot, userAgent, referer, startTime } =
      await request.json();

    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ message: "Email inválido" }, { status: 400 });
    }

    if (!validateEmailPatterns(email)) {
      return NextResponse.json(
        { message: "Email não permitido" },
        { status: 400 }
      );
    }

    if (isIPBlacklisted(clientIP)) {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
    }

    const ipRateLimit = await checkRateLimit(request);
    if (!ipRateLimit.allowed) {
      const resetTimeMinutes = Math.ceil(ipRateLimit.resetTime / 60000);
      return NextResponse.json(
        {
          message: `Muitas tentativas. Tente novamente em ${resetTimeMinutes} minutos.`,
          resetTime: ipRateLimit.resetTime,
        },
        { status: 429 }
      );
    }

    if (!(await checkEmailRateLimit(email))) {
      return NextResponse.json(
        {
          message:
            "Este email já foi usado recentemente. Tente novamente mais tarde.",
        },
        { status: 429 }
      );
    }

    if (startTime && userAgent) {
      const botProtectionData = {
        startTime: parseInt(startTime),
        honeypot: honeypot || "",
        userAgent: userAgent || "",
        referer: referer || "",
      };

      const botValidation = validateBotProtection(botProtectionData, {
        email,
        honeypot,
        userAgent,
        referer,
      });

      if (botValidation.isBot) {
        return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
      }

      const fillTime = Date.now() - parseInt(startTime);
      const trustScore = calculateTrustScore(
        email,
        userAgent,
        clientIP,
        fillTime
      );

      if (trustScore < 50) {
        return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
      }
    }

    const existingEmail = await prisma.emailSubscription.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingEmail) {
      return NextResponse.json(
        { message: "Este email já está cadastrado" },
        { status: 409 }
      );
    }

    await consumeRateLimit(request);
    await consumeEmailRateLimit(email);

    const subscription = await prisma.emailSubscription.create({
      data: {
        email: email.toLowerCase().trim(),
      },
    });

    return NextResponse.json(
      {
        message: "Email cadastrado com sucesso!",
        id: subscription.id,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
