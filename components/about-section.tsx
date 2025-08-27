"use client";

import { FounderCard } from "@/components/founder-card";
import Image from "next/image";
import logoGray from "../public/svg/logo-gray.svg";

const founders = [
  {
    name: "Maycon Douglas",
    role: "Cofundador",
    image: "/img/maycon.png",
    interviews: [
      {
        question: "Tecnologicamente, quem é você?",
        answer:
          "Sou desenvolvedor backend com experiência em Node.js e apaixonado por criar soluções que realmente possam fazer diferença.",
      },
      {
        question: "Por que decidiu se jogar no Eatlister?",
        answer:
          "Porque vejo um enorme potencial nos produtos que estamos construindo e, acima de tudo, a chance de criar soluções para uma comunidade de qual também faço parte.",
      },
      {
        question: "O que te motiva nessa jornada?",
        answer:
          "Sempre tive o desejo de unir tecnologia, impacto social e interação com comunidades. Acredito que esse seja o momento certo para transformar isso em realidade.",
      },
    ],
  },
  {
    name: "Lucas Paiva",
    role: "Cofundador",
    image: "/img/paiva.png",
    interviews: [
      {
        question: "Tecnologicamente, quem é você?",
        answer:
          "Acredito no poder de conectar pessoas que amam restaurantes e transformar essa paixão em experiências únicas de vida.",
      },
      {
        question: "Por que decidiu se jogar no Eatlister?",
        answer:
          "Contribuir com tecnologia de forma prática, transformando ideias em realidade e fazer que realmente faça diferença no dia a dia dos usuários.",
      },
      {
        question: "O que te motiva nessa jornada?",
        answer:
          "É a certeza de que meu trabalho vai impactar positivamente uma comunidade da qual eu faço parte e que me inspira diariamente. Isso me impulsiona demais.",
      },
    ],
  },
  {
    name: "Victor Peleteiro",
    role: "Cofundador",
    image: "/img/victor.png",
    interviews: [
      {
        question: "Tecnologicamente, quem é você?",
        answer:
          "Gosto de pensar que, na última década, me dediquei a ser um arquiteto de produtos digitais.",
      },
      {
        question: "Por que decidiu se jogar no Eatlister?",
        answer:
          "Olha, eu realmente acredito que isso pode deixar rico! Brincadeiras à parte, esse projeto mexe com os sentimentos que mais gosto.",
      },
      {
        question: "O que te motiva nessa jornada?",
        answer:
          "É a certeza de que meu trabalho vai impactar positivamente uma comunidade da qual eu faço parte e que me inspira diariamente. Isso me impulsiona demais.",
      },
    ],
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen bg-[#FF472D] overflow-hidden"
    >
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {founders.map((founder, index) => (
            <FounderCard
              key={founder.name}
              {...founder}
              className={`${
                index === 1 ? "md:-mt-8 mb-10" : ""
              } animate-fade-in-up`}
              style={{ animationDelay: `${(index + 1) * 0.2}s` }}
            />
          ))}
        </div>
      </div>
      <Image src={logoGray} alt="Logo Eatlister" className="mx-auto w-full" />
    </section>
  );
}
