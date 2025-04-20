// src/components/MessageLine.tsx
import React from "react";

interface MessageLineProps {
  sender: string;
  text: string;
}

const MessageLine: React.FC<MessageLineProps> = ({ sender, text }) => {
  return (
    <div className="py-1 text-sm md:text-md lg:text-lg">
      <span
        className={`${sender == "You" ? "text-green-400" : "text-blue-300"}`}
      >
        ~ ({sender}):
      </span>{" "}
      <span
        className={`${sender == "You" ? "text-green-400" : "text-blue-300"}`}
      >
        {text}
      </span>
    </div>
  );
};

export default MessageLine;
