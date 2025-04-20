// src/components/InputBar.tsx
import React from "react";

interface InputBarProps {
  input: string;
  onChange: (val: string) => void;
  onSend: () => Promise<void>;
  placeholder: string;
}

const InputBar: React.FC<InputBarProps> = ({
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

export default InputBar;
