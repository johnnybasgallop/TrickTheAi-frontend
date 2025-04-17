// src/components/MessageLine.tsx
import React from "react";

interface MessageLineProps {
  sender: string;
  text: string;
}

const MessageLine: React.FC<MessageLineProps> = ({ sender, text }) => {
  return (
    <div>
      <span className="text-green-300">{sender}:</span> {text}
    </div>
  );
};

export default MessageLine;
