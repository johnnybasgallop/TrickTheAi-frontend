import explosionGif from "../../../public/explosion-gif";

const GameOverScreen = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <p className="text-red-400/40 animate-pulse text-[100px] md:text-[180px] text-center self-center">
        GAME OVER
      </p>
      <img className="w-full h-full" src={explosionGif} alt="explosion gif" />
    </div>
  );
};

export default GameOverScreen;
