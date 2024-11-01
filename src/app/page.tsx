"use client";
import React from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { ButtonStart } from "@/components/ui/Button-start";


export default function MainPage() {
  return (
    <div className=" h-screen bg-neutral-900 flex flex-col items-center justify-center relative w-full">
      <h2 className="relative flex-col md:flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
        <span>Math Mastery</span>
      </h2>
      <h3 className="text-zinc-400 pt-2 font-medium text-xl px-3 text-center">
        Contesta las preguntas y demuestra tu habilidad en matemáticas
      </h3>
      <div className="relative z-10 pt-10">
        <ButtonStart hrefPath={'selection'} />
      </div>
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
