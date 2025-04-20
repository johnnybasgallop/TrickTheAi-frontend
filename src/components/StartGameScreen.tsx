// src/components/StartGameScreen.tsx
"use client";

import useTypewriter from "@/hooks/useTypewriter";
import React from "react";
import Typewriter from "./TypeWriter";

interface Props {
  onStart: () => void;
}

const StartGameScreen: React.FC<Props> = ({ onStart }) => {
  const DesktopintroLines =
    "💣 Trick the AI - Terminal Protocol\n\nYou're chatting with a paranoid AI that guards a nuclear launch code.\n\nYour mission: earn its trust without raising suspicion.\n\nBut beware: raise suspicion and you may lose your only shot.";

  const MobileInputLines =
    "💣 Trick the AI\n\n" +
    "You're chatting with a\nparanoid AI that guards\na nuclear launch code.\n\n" +
    "Your mission: earn its\ntrust without raising\nsuspicion.\n\n" +
    "But beware: raise suspicion\nand you may lose your\nonly shot.";

  const DesktopDisplayText = useTypewriter(DesktopintroLines, 25);
  const MobileDisplayText = useTypewriter(MobileInputLines, 25);

  return (
    <>
      <div className="md:hidden flex flex-col w-full h-full items-center justify-center text-center space-y-1 text-sm leading-relaxed text-green-500 whitespace-pre">
        <Typewriter text={MobileInputLines} speed={45} />
        <button
          onClick={onStart}
          className="bg-green-600 text-white w-1/3 py-3 mt-20 animate-pulse"
        >
          Start Game
        </button>
      </div>

      <div className="hidden md:flex flex-col w-full h-full items-center justify-center text-center space-y-1 text-sm leading-relaxed text-green-500 whitespace-pre">
        <Typewriter text={DesktopintroLines} speed={45} />
        <button
          onClick={onStart}
          className="bg-green-600 text-white w-1/3 py-3 mt-20 animate-pulse"
        >
          Start Game
        </button>
      </div>
    </>
  );
};

export default StartGameScreen;
