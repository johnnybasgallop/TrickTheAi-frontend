import useTypewriter from "@/hooks/useTypewriter";
import React from "react";

interface props {
  text: string;
  speed: number;
}

const Typewriter: React.FC<props> = ({ text, speed }) => {
  const displayText = useTypewriter(text, speed);

  return <p className="text-lg text-green-500">{displayText}</p>;
};

export default Typewriter;
