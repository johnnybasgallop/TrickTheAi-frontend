// src/components/Terminal.tsx
"use client";

import { useEffect, useState } from "react";
import { sendMessage, startGame } from "../lib/api";
import CodeInputBar from "./CodeInput";
import CountdownTimer from "./CountdownTimer";
import InputBar from "./InputBar";
import MessageLine from "./MessageLine";
import ProgressBar from "./ProgressBar";
import StartGameScreen from "./StartGameScreen";
import WonGameScreen from "./WonGameScreen";
import explosionGif from "./explosion-gif";
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
  const [isInvalid, setIsInvalid] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (isModalVisible) {
      const timeout = setTimeout(() => {
        setIsModalVisible(false);
        setGameId(null);
        SetParanoiaLevel(0);
        SetTrustLevel(5);
      }, 5500); // 5 seconds

      return () => clearTimeout(timeout); // Cleanup
    }
  }, [isModalVisible]);

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
      setIsInvalid(false);
      setWonGame(true);
      SetTrustLevel(5);
      SetParanoiaLevel(0);
      setCodeInput("");
    } else {
      setIsInvalid(true);
      setTimeout(() => {
        setCodeInput("");
        setIsInvalid(false);
      }, 500);
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

  const introLines =
    "Despite your efforts, the AI remained unconvinced. The trust never reached high enough, and paranoia consumed the system. The launch codes remain hidden… for now. But the window has closed — the world wasn’t saved. Better luck next time, Commander.";

  return (
    <div className="bg-black text-green-500 px-0 pb-12 h-full w-full font-mono flex flex-col">
      {isModalVisible && (
        <div className="flex flex-col w-full h-full">
          <p className="text-red-400/40 animate-pulse text-[180px] text-center self-center">
            GAME OVER
          </p>
          <img
            className="w-full h-full"
            src={explosionGif}
            alt="explosion gif"
          />
        </div>
      )}

      {wonGame ? (
        <>
          <WonGameScreen />

          <button
            onClick={handleReset}
            className="border-2 border-red-600 hover:bg-red-600/80 hover:text-white text-red-600 px-4 py-2 lg:py-3 self-center mb-10 w-full lg:w-1/2"
          >
            Reset
          </button>
        </>
      ) : !gameId ? (
        <StartGameScreen onStart={handleStart} />
      ) : (
        gameId &&
        !isModalVisible && (
          <>
            <div className="w-full flex flex-row justify-between items-center">
              <h1 className="text-lg mb-4">TRICK THE AI - TERMINAL</h1>
              <CountdownTimer
                seconds={180}
                onExpire={() => {
                  setIsModalVisible(true);
                }}
              />
            </div>
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
                  gameId={codeInput}
                  isInvalid={isInvalid}
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
                className="border-2 border-red-600 hover:bg-red-600/80 hover:text-white text-red-600 px-4 py-2 lg:py-3 mt-4  w-full lg:w-1/2"
              >
                Abort Mission
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
        )
      )}
    </div>
  );
}
