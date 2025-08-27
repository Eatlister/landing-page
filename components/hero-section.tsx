"use client";

import type React from "react";

import { useEmailToast } from "@/hooks/use-email-toast";
import { subscribeEmail } from "@/lib/actions";
import { generateBotProtectionData } from "@/lib/bot-protection";
import { Send } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import logoIconSimple from "../public/svg/logo-simple.svg";
import logoIcon from "../public/svg/logo.svg";

export function HeroSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [botProtectionData, setBotProtectionData] = useState(
    generateBotProtectionData()
  );
  const emailToast = useEmailToast();

  useEffect(() => {
    setBotProtectionData(generateBotProtectionData());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      const result = await subscribeEmail(email.trim(), {
        honeypot: (e.target as HTMLFormElement).honeypot?.value || "",
        userAgent: botProtectionData.userAgent,
        referer: botProtectionData.referer,
        startTime: botProtectionData.startTime.toString(),
      });

      if (result.success) {
        emailToast.showSuccessToast(result.message);
        setEmail("");
        setBotProtectionData(generateBotProtectionData());
      } else {
        emailToast.showErrorToast(result.message);
      }
    } catch (error) {
      emailToast.showNetworkErrorToast();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-20 animate-fade-in-up">
          <div className="flex items-center gap-3">
            <Image
              src={logoIconSimple}
              alt="Logo Eatlister"
              priority
              className=" p-[15px] bg-[#FF472D] rounded-[22px] flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <nav>
            <a
              href="#about"
              className="text-gray-800 hover:text-[#FF472D] transition-colors font-medium underline decoration-2 underline-offset-4 decoration-[#626262] hover:decoration-[#FF472D]"
            >
              Sobre Nós
            </a>
          </nav>
        </header>

        <div className="max-w-2xl mx-auto text-center text-gray-800 animate-fade-in-up animate-delay-200">
          <h1 className="text-[20px] text-[#626262] md:text-[30px] mb-8 leading-tight font-medium max-w-md mx-auto">
            Você ainda não sabe, mas já tá procurando por isso.
          </h1>

          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto animate-scale-in animate-delay-400"
          >
            <div className="relative">
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 pr-16 bg-white border-2 border-dashed border-[#D7D7D7] rounded-full text-[#626262] placeholder:text-[#626262] focus:outline-none transition-all duration-300 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#FF472D] hover:bg-[#e63e26] disabled:bg-gray-400 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
              >
                <Send className="h-4 w-4 text-white" />
              </button>
            </div>

            <input
              type="hidden"
              name="startTime"
              value={botProtectionData.startTime}
            />
            <input
              type="hidden"
              name="userAgent"
              value={botProtectionData.userAgent}
            />
            <input
              type="hidden"
              name="referer"
              value={botProtectionData.referer}
            />

            <div className="absolute -left-[9999px] opacity-0 pointer-events-none">
              <input
                type="text"
                name="honeypot"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="sr-only"
              />
            </div>
          </form>
        </div>
        <Image
          src={logoIcon}
          alt="Logo Eatlister"
          priority
          className="w-[400px] mt-24 px-2 md:w-[800px] md:h-full mx-auto animate-fade-in-up animate-delay-600"
        />
      </div>
    </section>
  );
}
