// src/components/Terminal.tsx
"use client";

import { useEffect, useState } from "react";
import {
  changeDifficulty,
  deleteGame,
  sendMessage,
  startGame,
} from "../../lib/api";
import ActiveGameScreen from "./ActiveGameScreen";
import GameOverScreen from "./GameOverScreen";
import SelectGameMode from "./SelectGameMode";
import StartGameScreen from "./StartGameScreen";
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
  const [isInvalid, setIsInvalid] = useState(false);

  const [isGameOver, setIsGameOver] = useState(false);
  const [isSelectingGameMode, setIsSelectingGameMode] = useState(false);
  const [gameMode, setGameMode] = useState("Easy");

  useEffect(() => {
    if (isGameOver) {
      const timeout = setTimeout(async () => {
        // setIsGameOver(false);

        // SetParanoiaLevel(0);
        // SetTrustLevel(5);
        await handleReset();
      }, 5500); // 5 seconds

      return () => clearTimeout(timeout); // Cleanup
    }
  }, [isGameOver]);

  //   useEffect(() => {
  //     const storedId = localStorage.getItem("gameId");
  //     if (storedId) {
  //       setGameId(storedId);
  //     }
  //   }, []);

  const handleDeleteCurrentGame = async () => {
    if (gameId) {
      const response = await deleteGame(gameId);
    } else {
      console.log("no active gameid state to delete with");
    }
  };

  const handleStart = async () => {
    const response = await startGame();
    console.log(`response to start game call: ${response.gameId}`);
    setGameId(response.gameId);
    // localStorage.setItem("gameId", response.gameId);
    setMessages([]);
    setIsSelectingGameMode(true);
  };

  const handleChangeDifficulty = async () => {
    if (gameMode && gameId) {
      const response = await changeDifficulty(gameId, gameMode);
      console.log(`response to game mode change ${response}`);
      setGameMode(response.gameMode);
      setIsSelectingGameMode(false);
    }
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

  const handleReset = async () => {
    await handleDeleteCurrentGame();
    setGameId(null);
    setWonGame(false);
    SetTrustLevel(5);
    SetParanoiaLevel(0);
    setIsGameOver(false);
    // localStorage.removeItem("gameId");
    setMessages([]);
  };

  return (
    <div className="bg-black text-green-500 px-0 pb-2 h-full w-full font-mono flex flex-col">
      {/* Show game over screen */}
      {isGameOver && <GameOverScreen />}

      {/* Show Starting screen to start the game */}
      {!gameId && !isGameOver && <StartGameScreen onStart={handleStart} />}

      {/* Show the game mode select */}
      {isSelectingGameMode && !isGameOver && gameId && (
        <SelectGameMode
          onSubmit={handleChangeDifficulty}
          onSelect={(val: string) => setGameMode(val)}
          gameMode={gameMode}
        />
      )}

      {/* Show the won game screen */}
      {wonGame && !isGameOver && <WonGameScreen resestFunc={handleReset} />}

      {/* Show the play screen */}
      {gameId && !isGameOver && !isSelectingGameMode && !wonGame && (
        <ActiveGameScreen
          trustLevel={trustLevel}
          paranoiaLevel={paranoiaLevel}
          codeInput={codeInput}
          input={input}
          messages={messages}
          isInvalid={isInvalid}
          onCodeChange={setCodeInput}
          onCodeSubmit={handleEnterCode}
          onInputChange={setInput}
          onSendMessage={handleSendMessage}
          onAbort={handleReset}
          onExpire={() => setIsGameOver(true)}
        />
      )}
    </div>
  );
}
