// hooks/useGame.ts
import { useEffect, useState } from "react";
import {
  changeDifficulty,
  deleteGame,
  sendMessage,
  startGame,
} from "../lib/api";

export default function useGame() {
  const [gameId, setGameId] = useState<string | null>(null);
  const [trustLevel, setTrustLevel] = useState(5);
  const [paranoiaLevel, setParanoiaLevel] = useState(0);
  const [wonGame, setWonGame] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [isInvalid, setIsInvalid] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [input, setInput] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [isSelectingGameMode, setIsSelectingGameMode] = useState(false);
  const [gameMode, setGameMode] = useState("Easy");

  useEffect(() => {
    if (isGameOver) {
      const timeout = setTimeout(() => handleReset(), 5500);
      return () => clearTimeout(timeout);
    }
  }, [isGameOver]);

  const handleStart = async () => {
    const response = await startGame();
    setGameId(response.gameId);
    setMessages([]);
    setIsSelectingGameMode(true);
  };

  const handleChangeDifficulty = async () => {
    if (gameMode && gameId) {
      const response = await changeDifficulty(gameId, gameMode);
      setGameMode(response.gameMode);
      setIsSelectingGameMode(false);
    }
  };

  const handleEnterCode = (code: string) => {
    if (code === gameId) {
      setWonGame(true);
      setTrustLevel(5);
      setParanoiaLevel(0);
      setCodeInput("");
    } else {
      setIsInvalid(true);
      setTimeout(() => {
        setCodeInput("");
        setIsInvalid(false);
      }, 500);
    }
  };

  const handleSendMessage = async () => {
    if (!gameId) return;
    setInput("");
    setMessages((prev) => [...prev, { sender: "You", text: input }]);
    const response = await sendMessage(gameId, input);
    setTrustLevel(response.trustLevel);
    setParanoiaLevel(response.paranoiaLevel);
    setMessages((prev) => [
      ...prev,
      { sender: "AI", text: response.aiMessage },
    ]);
  };

  const handleDeleteCurrentGame = async () => {
    if (gameId) await deleteGame(gameId);
  };

  const handleReset = async () => {
    await handleDeleteCurrentGame();
    setGameId(null);
    setWonGame(false);
    setTrustLevel(5);
    setParanoiaLevel(0);
    setIsGameOver(false);
    setIsSelectingGameMode(false);
    setMessages([]);
  };

  return {
    gameId,
    trustLevel,
    paranoiaLevel,
    wonGame,
    messages,
    input,
    codeInput,
    isInvalid,
    isGameOver,
    isSelectingGameMode,
    gameMode,
    setInput,
    setCodeInput,
    setGameMode,
    setIsGameOver,
    handleStart,
    handleChangeDifficulty,
    handleEnterCode,
    handleSendMessage,
    handleReset,
  };
}
