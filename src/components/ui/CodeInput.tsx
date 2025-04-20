// src/components/CodeInputBar.tsx
import React from "react";

interface CodeInputBarProps {
  input: string;
  onChange: (val: string) => void;
  onSend: (code: string) => void;
  placeholder: string;
  gameId: string;
  isInvalid: boolean;
}

const CodeInputBar: React.FC<CodeInputBarProps> = ({
  input,
  onChange,
  onSend,
  placeholder,
  gameId,
  isInvalid,
}) => {
  return (
    <input
      className={`w-full bg-black border p-2 my-2 ring-transparent focus:outline-none ${
        isInvalid ? "shake" : "border-green-500"
      }`}
      value={input}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onSend(gameId)}
      placeholder={placeholder}
      autoFocus
    />
  );
};

export default CodeInputBar;
