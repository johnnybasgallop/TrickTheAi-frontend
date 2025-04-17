// src/components/InputBar.tsx
import React from "react";

interface CodeInputBarProps {
  input: string;
  onChange: (val: string) => void;
  onSend: (code: string) => void;
  placeholder: string;
}

const CodeInputBar: React.FC<CodeInputBarProps> = ({
  input,
  onChange,
  onSend,
  placeholder,
}) => {
  return (
    <input
      className="w-full bg-black border border-green-500 p-2 my-2 ring-transparent focus:outline-none"
      value={input}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onSend()}
      placeholder={placeholder}
      autoFocus
    />
  );
};

export default CodeInputBar;
