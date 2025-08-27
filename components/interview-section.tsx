import { InterviewCard } from "@/components/interview-card"

const interviews = [
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
]

const interviews2 = [
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
]

const interviews3 = [
  {
    question: "Tecnologicamente, quem é você?",
    answer: "Gosto de pensar que, na última década, me dediquei a ser um arquiteto de produtos digitais.",
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
]

export function InterviewSection() {
  return (
    <section className="relative min-h-screen bg-[#FF472D] overflow-hidden">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <h2 className="text-[20rem] font-bold text-white select-none pointer-events-none">eatlister</h2>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Back Button */}
        <button className="mb-12 text-white hover:text-orange-100 transition-all duration-300 transform hover:scale-110 animate-slide-in-left">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Interview Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="space-y-6">
            {interviews.map((interview, index) => (
              <InterviewCard
                key={index}
                {...interview}
                className="animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
          <div className="space-y-6">
            {interviews2.map((interview, index) => (
              <InterviewCard
                key={index}
                {...interview}
                className="animate-fade-in-up opacity-0"
                style={{ animationDelay: `${(index + 3) * 0.1}s` }}
              />
            ))}
          </div>
          <div className="space-y-6">
            {interviews3.map((interview, index) => (
              <InterviewCard
                key={index}
                {...interview}
                className="animate-fade-in-up opacity-0"
                style={{ animationDelay: `${(index + 6) * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
