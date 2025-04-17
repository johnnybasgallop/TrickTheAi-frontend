// src/components/InputBar.tsx
import React from "react";

interface InputBarProps {
  input: string;
  onChange: (val: string) => void;
  onSend: () => Promise<void>;
}

const InputBar: React.FC<InputBarProps> = ({ input, onChange, onSend }) => {
  return (
    <div>
      <input
        className="w-full bg-black border border-green-500 p-2 my-2 ring-transparent focus:outline-none"
        value={input}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        placeholder="Type your message and hit Enter..."
        autoFocus
      />
      {/* <button onClick={onSend} className="bg-green-600 px-4 py-1 mr-2">
        Send
      </button> */}
    </div>
  );
};

export default InputBar;
