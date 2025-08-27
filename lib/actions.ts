"use server";

import {
  calculateTrustScore,
  validateBotProtection,
  validateEmailPatterns,
} from "@/lib/bot-protection";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function subscribeEmail(
  email: string,
  botData?: {
    honeypot?: string;
    userAgent?: string;
    referer?: string;
    startTime?: string;
  }
) {
  try {
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return { success: false, message: "Email inválido" };
    }

    if (!validateEmailPatterns(email)) {
      console.log(`Email com padrão suspeito: ${email}`);
      return { success: false, message: "Email não permitido" };
    }

    if (botData && botData.startTime && botData.userAgent) {
      const botProtectionData = {
        startTime: parseInt(botData.startTime),
        honeypot: botData.honeypot || "",
        userAgent: botData.userAgent || "",
        referer: botData.referer || "",
      };

      const botValidation = validateBotProtection(botProtectionData, {
        email,
        honeypot: botData.honeypot,
        userAgent: botData.userAgent,
        referer: botData.referer,
      });

      if (botValidation.isBot) {
        console.log(
          `Bot detectado: ${botValidation.reason}, Score: ${botValidation.score}`
        );
        return { success: false, message: "Acesso negado" };
      }

      const fillTime = Date.now() - parseInt(botData.startTime);
      const trustScore = calculateTrustScore(
        email,
        botData.userAgent,
        "unknown",
        fillTime
      );

      if (trustScore < 50) {
        console.log(`Score de confiança muito baixo: ${trustScore}`);
        return { success: false, message: "Acesso negado" };
      }
    }

    const existingEmail = await prisma.emailSubscription.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingEmail) {
      return { success: false, message: "Este email já está cadastrado" };
    }

    const subscription = await prisma.emailSubscription.create({
      data: {
        email: email.toLowerCase().trim(),
      },
    });

    revalidatePath("/");

    console.log(`Email cadastrado com sucesso via server action: ${email}`);

    return {
      success: true,
      message: "Email cadastrado com sucesso!",
      id: subscription.id,
    };
  } catch (error) {
    console.error("Erro ao processar email:", error);
    return { success: false, message: "Erro interno do servidor" };
  }
}
