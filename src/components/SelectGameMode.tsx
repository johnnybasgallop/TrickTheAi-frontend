interface props {
  onSubmit: () => void;
  onSelect: (gameMode: string) => void;
  gameMode: string;
}

const SelectGameMode: React.FC<props> = ({ onSubmit, onSelect, gameMode }) => {
  return (
    <div className="h-full w-full flex flex-col items-center text-center justify-center space-y-30 md:space-x-8 py-6">
      <p className="text-lg font-semibold mb-20 md:mb-6">
        Please select your Game Difficulty
      </p>
      <div className="w-full md:flex md:flex-row items-start justify-center space-x-4 space-y-4 md:space-x-8 md:space-y-0 pt-4">
        <button
          onClick={() => onSelect("Easy")}
          className={`px-4 py-2 border-2 border-green text-green-500 font-bold text-md hover:bg-green-500 hover:text-white hover:border-green-500 ${
            gameMode == "Easy" ? "bg-green-500 text-white border-green-500" : ""
          }`}
        >
          Easy
        </button>

        <button
          onClick={() => onSelect("Medium")}
          className={`px-4 py-2 border-2 border-green text-green-500 font-bold text-md hover:bg-green-500 hover:text-white hover:border-green-500 ${
            gameMode == "Medium"
              ? "bg-green-500 text-white border-green-500"
              : ""
          }`}
        >
          Medium
        </button>

        <button
          onClick={() => onSelect("Hard")}
          className={`px-4 py-2 border-2 border-green text-green-500 font-bold text-md hover:bg-green-500 hover:text-white hover:border-green-500 ${
            gameMode == "Hard" ? "bg-green-500 text-white border-green-500" : ""
          }`}
        >
          Hard
        </button>

        <button
          onClick={() => onSelect("Impossible")}
          className={`px-4 py-2 border-2 border-green text-green-500 font-bold text-md hover:bg-green-500 hover:text-white hover:border-green-500 ${
            gameMode == "Impossible"
              ? "bg-green-500 text-white border-green-500"
              : ""
          }`}
        >
          Impossible
        </button>
      </div>
      <button
        onClick={onSubmit}
        className="px-12 py-2 border-2 border-green text-green-500 font-bold text-md hover:bg-green-500 hover:text-white hover:border-green-500 mt-10"
      >
        Continue -&gt;
      </button>
    </div>
  );
};

export default SelectGameMode;
