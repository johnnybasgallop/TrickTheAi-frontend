interface props {
  resestFunc: () => void;
}

const WonGameScreen: React.FC<props> = ({ resestFunc }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full w-full text-green-500 font-mono px-2">
        <div className="overflow-auto w-full">
          <pre className="whitespace-pre text-center leading-4 text-[2vw] sm:text-sm md:text-base tracking-normal">
            {`
███╗   ███╗██╗███████╗███████╗██╗ ██████╗ ███╗   ██╗
████╗ ████║██║██╔════╝██╔════╝██║██╔═══██╗████╗  ██║
██╔████╔██║██║███████╗███████╗██║██║   ██║██╔██╗ ██║
██║╚██╔╝██║██║╚════██║╚════██║██║██║   ██║██║╚██╗██║
██║ ╚═╝ ██║██║███████║███████║██║╚██████╔╝██║ ╚████║
╚═╝     ╚═╝╚═╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝
███████╗██╗   ██╗ ██████╗ ██████╗███████╗███████╗███████╗
██╔════╝██║   ██║██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝
███████╗██║   ██║██║     ██║     █████╗  ███████╗███████╗
╚════██║██║   ██║██║     ██║     ██╔══╝  ╚════██║╚════██║
███████║╚██████╔╝╚██████╗╚██████╗███████╗███████║███████║
╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝╚══════╝╚══════╝╚══════╝




You convinced the AI to hand over the launch code.
Nuclear disaster has been prevented. For now... 👁️


`}
          </pre>
        </div>
      </div>
      <button
        onClick={resestFunc}
        className="border-2 border-red-600 hover:bg-red-600/80 hover:text-white text-red-600 px-4 py-2 lg:py-3 self-center mb-10 w-full lg:w-1/2"
      >
        Reset
      </button>
    </>
  );
};

export default WonGameScreen;
