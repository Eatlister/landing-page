"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type React from "react";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { Card } from "./ui/card";

interface FounderCardProps {
  name: string;
  role: string;
  image: string;
  className?: string;
  style?: React.CSSProperties;
  interviews: Array<{
    question: string;
    answer: string;
  }>;
}

export function FounderCard({
  name,
  role,
  image,
  interviews,
  className,
}: FounderCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Card
      className={cn(
        " bg-white rounded-3xl shadow-2xl p-4 drop-shadow-card-foreground transform hover:scale-105  opacity-0 transition-all duration-500",
        className
      )}
      onClick={handleFlip}
    >
      <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="horizontal"
        flipSpeedBackToFront={0.5}
        flipSpeedFrontToBack={0.5}
      >
        <div>
          <div className="overflow-hidden mb-4">
            <Image
              src={image}
              alt={`Foto de ${name}`}
              className="w-full rounded-2xl object-cover grayscale hover:grayscale-0 transition-all duration-500"
              width={100}
              height={100}
            />
          </div>
          <div className="space-y-1">
            <h3 className="text-[22px] font-bold text-[#626262]">{name}</h3>
            <p className="text-[#626262] font-medium">{role}</p>
            <Button
              variant="link"
              className="cursor-pointer p-0 h-auto text-[#626262] font-medium underline decoration-1 underline-offset-4 decoration-[#626262]"
              onClick={handleFlip}
            >
              Ver mais
            </Button>
          </div>
        </div>
        <div>
          {interviews.map((interview, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-bold text-[#626262] text-sm leading-relaxed mt-2">
                {interview.question}
              </h3>
              <p className="text-[#626262] text-sm leading-relaxed">
                {interview.answer}
              </p>
            </div>
          ))}
        </div>
      </ReactCardFlip>
    </Card>
  );
}
