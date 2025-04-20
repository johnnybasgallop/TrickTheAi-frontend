// src/components/Terminal.tsx
"use client";

import useGame from "@/hooks/useGame";
import ActiveGameScreen from "./ActiveGameScreen";
import GameOverScreen from "./GameOverScreen";
import SelectGameMode from "./SelectGameMode";
import StartGameScreen from "./StartGameScreen";
import WonGameScreen from "./WonGameScreen";

export default function Terminal() {
  const {
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
  } = useGame();

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
