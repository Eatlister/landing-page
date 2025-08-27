import type React from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface InterviewCardProps {
  question: string
  answer: string
  className?: string
  style?: React.CSSProperties
}

export function InterviewCard({ question, answer, className, style }: InterviewCardProps) {
  return (
    <Card
      className={cn(
        "bg-white rounded-3xl p-6 shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300",
        className,
      )}
      style={style}
    >
      <div className="space-y-4">
        <h3 className="font-bold text-gray-900 text-sm leading-relaxed">{question}</h3>
        <p className="text-gray-700 text-sm leading-relaxed">{answer}</p>
      </div>
    </Card>
  )
}
