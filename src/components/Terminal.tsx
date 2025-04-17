// src/components/Terminal.tsx
"use client";

import { useState } from "react";
import { sendMessage, startGame } from "../lib/api";
import CodeInputBar from "./CodeInput";
import InputBar from "./InputBar";
import MessageLine from "./MessageLine";
import ProgressBar from "./ProgressBar";
import WonGameScreen from "./WonGameScreen";
export default function Terminal() {
  const [gameId, setGameId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [trustLevel, SetTrustLevel] = useState(5);
  const [paranoiaLevel, SetParanoiaLevel] = useState(0);
  const [wonGame, setWonGame] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );

  //   useEffect(() => {
  //     const storedId = localStorage.getItem("gameId");
  //     if (storedId) {
  //       setGameId(storedId);
  //     }
  //   }, []);

  const handleStart = async () => {
    const response = await startGame();
    console.log(`response to start game call: ${response.gameId}`);
    setGameId(response.gameId);
    // localStorage.setItem("gameId", response.gameId);
    setMessages([]);
  };

  const handleEnterCode = (code: string) => {
    if (code == gameId) {
      setWonGame(true);
      SetTrustLevel(5);
      SetParanoiaLevel(0);
      setCodeInput("");
    } else {
      setCodeInput("");
    }
  };

  const handleSendMessage = async () => {
    if (!gameId) {
      console.warn("Game ID is missing. Please start a new game.");
      return;
    }
    setInput("");

    setMessages((prev) => [...prev, { sender: "You", text: input }]);
    console.log(`game message is ${gameId} before sending request`);

    const response = await sendMessage(gameId, input);

    SetTrustLevel(response.trustLevel);
    SetParanoiaLevel(response.paranoiaLevel);

    setMessages((prev) => [
      ...prev,
      { sender: "AI", text: response.aiMessage },
    ]);
  };

  const handleReset = () => {
    setGameId(null);
    setWonGame(false);
    SetTrustLevel(5);
    SetParanoiaLevel(0);
    // localStorage.removeItem("gameId");
    setMessages([]);
  };

  return (
    <div className="bg-black text-green-500 px-0 pb-12 h-full w-full font-mono flex flex-col">
      {wonGame ? (
        <>
          <button
            onClick={handleReset}
            className="bg-red-600/30 hover:bg-red-600/80 text-white p-4 w-1/2 self-center"
          >
            Reset
          </button>
          <WonGameScreen />
        </>
      ) : !gameId ? (
        <button
          onClick={handleStart}
          className="bg-green-600 text-white px-4 py-2 self-start"
        >
          Start Game
        </button>
      ) : (
        <>
          <div className="flex flex-row space-x-8 self-start w-full lg:w-2/3">
            <ProgressBar label="Trust" value={trustLevel} />
            <ProgressBar label="Paranoia" value={paranoiaLevel} />
          </div>
          <div className="w-full lg:w-1/3 flex flex-col">
            <div className="w-full flex flex-row space-x-4">
              <CodeInputBar
                input={codeInput}
                onChange={(val) => setCodeInput(val)}
                onSend={handleEnterCode}
                placeholder="Enter The Code.."
              />

              <button
                onClick={() => handleEnterCode(codeInput)}
                className="border-2 border-green-600 hover:bg-green-600/80 hover:text-white text-sm w-2/3 lg:w-1/3 lg:text-medium h-[80%] self-center"
              >
                Enter Code
              </button>
            </div>
            <button
              onClick={handleReset}
              className="bg-red-600/30 hover:bg-red-600/80 text-white px-4 py-2 lg:py-4 mt-4  w-full lg:w-1/2"
            >
              Reset
            </button>
          </div>

          <div className="flex-1 overflow-y-auto mb-2 pr-1 flex flex-col-reverse">
            {messages
              .slice()
              .reverse()
              .map((msg, idx) => (
                <MessageLine key={idx} sender={msg.sender} text={msg.text} />
              ))}
          </div>

          <InputBar
            input={input}
            onChange={(val) => setInput(val)}
            onSend={handleSendMessage}
            placeholder="Type your message then press ↵"
          />
        </>
      )}
    </div>
  );
}
