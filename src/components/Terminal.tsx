// src/components/Terminal.tsx
"use client";

import { useState } from "react";
import { sendMessage, startGame } from "../lib/api";
import InputBar from "./InputBar";
import MessageLine from "./MessageLine";

export default function Terminal() {
  const [gameId, setGameId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );

  const handleStart = async () => {
    const response = await startGame();
    console.log(`response to start game call: ${response.gameId}`);
    setGameId(response.gameId);
    setMessages([]);
  };

  const handleSendMessage = async () => {
    if (!gameId) {
      console.warn("Game ID is missing. Please start a new game.");
      return;
    }

    setMessages((prev) => [...prev, { sender: "You", text: input }]);
    console.log(`game message is ${gameId} before sending request`);
    const response = await sendMessage(gameId, input);
    setMessages((prev) => [
      ...prev,
      { sender: "AI", text: response.aiMessage },
    ]);

    setInput("");
  };

  const handleReset = () => {
    setGameId(null);
    setMessages([]);
  };

  return (
    <div className="bg-black text-green-500 py-2 h-screen font-mono">
      {!gameId ? (
        <button
          onClick={handleStart}
          className="bg-green-600 text-white font-medium px-4 py-2 mb-4"
        >
          Start Game
        </button>
      ) : (
        <>
          <div className="overflow-y-auto h-[80vh] mb-4">
            {messages.map((msg, idx) => (
              <MessageLine key={idx} sender={msg.sender} text={msg.text} />
            ))}
          </div>

          {gameId && (
            <InputBar
              input={input}
              onChange={(val) => setInput(val)}
              onSend={handleSendMessage}
            />
          )}

          <button onClick={handleReset} className="bg-red-600 px-4 py-1 mt-2">
            Reset
          </button>
        </>
      )}
    </div>
  );
}
