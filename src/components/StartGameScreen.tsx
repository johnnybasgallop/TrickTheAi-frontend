// src/components/StartGameScreen.tsx
"use client";

import useTypewriter from "@/hooks/useTypewriter";
import React from "react";
import Typewriter from "./TypeWriter";

interface Props {
  onStart: () => void;
}

const StartGameScreen: React.FC<Props> = ({ onStart }) => {
  const introLines =
    "\uD83D\uDCA3 Trick the AI - Terminal Protocol\n\nYou're chatting with a paranoid AI that guards a nuclear launch code.\n\nYour mission: earn its trust without raising suspicion.\n\nBut beware: raise suspicion and you may lose your only shot.";

  const displayText = useTypewriter(introLines, 25);

  return (
    <div className="flex flex-col items-start space-y-1 text-sm leading-relaxed text-green-500 whitespace-pre">
      <Typewriter text={introLines} speed={30} />

      <button
        onClick={onStart}
        className="bg-green-600 text-white px-4 py-2 mt-4 animate-pulse"
      >
        Start Game
      </button>
    </div>
  );
};

export default StartGameScreen;
