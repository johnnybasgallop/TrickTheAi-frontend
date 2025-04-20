// src/components/ActiveGameScreen.tsx
"use client";

import CodeInputBar from "../ui/CodeInput";
import CountdownTimer from "../ui/CountdownTimer";
import InputBar from "../ui/InputBar";
import MessageLine from "../ui/MessageLine";
import ProgressBar from "../ui/ProgressBar";

interface Props {
  trustLevel: number;
  paranoiaLevel: number;
  codeInput: string;
  input: string;
  messages: { sender: string; text: string }[];
  isInvalid: boolean;
  onCodeChange: (val: string) => void;
  onCodeSubmit: (val: string) => void;
  onInputChange: (val: string) => void;
  onSendMessage: () => Promise<void>;
  onAbort: () => void;
  onExpire: () => void;
}

const ActiveGameScreen: React.FC<Props> = ({
  trustLevel,
  paranoiaLevel,
  codeInput,
  input,
  messages,
  isInvalid,
  onCodeChange,
  onCodeSubmit,
  onInputChange,
  onSendMessage,
  onAbort,
  onExpire,
}) => {
  return (
    <>
      <h1 className="text-lg mb-4">TRICK THE AI - TERMINAL</h1>

      <div className="w-full flex flex-row justify-between items-center">
        <CountdownTimer seconds={100} onExpire={onExpire} />
      </div>

      <div className="flex flex-row space-x-8 self-start w-full lg:w-2/3">
        <ProgressBar label="Trust" value={trustLevel} />
        <ProgressBar label="Paranoia" value={paranoiaLevel} />
      </div>

      <div className="w-full lg:w-1/3 flex flex-col">
        <div className="w-full flex flex-row space-x-4">
          <CodeInputBar
            input={codeInput}
            onChange={onCodeChange}
            onSend={onCodeSubmit}
            gameId={codeInput}
            isInvalid={isInvalid}
            placeholder="Enter The Code.."
          />
          <button
            onClick={() => onCodeSubmit(codeInput)}
            className="border-2 border-green-600 hover:bg-green-600/80 hover:text-white text-sm w-2/3 lg:w-1/3 lg:text-medium h-[80%] self-center"
          >
            Enter Code
          </button>
        </div>

        <button
          onClick={onAbort}
          className="border-2 border-red-600 hover:bg-red-600/80 hover:text-white text-red-600 px-4 py-2 lg:py-3 mt-4 w-full lg:w-1/2"
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
        onChange={onInputChange}
        onSend={onSendMessage}
        placeholder="Type your message then press ↵"
      />
    </>
  );
};

export default ActiveGameScreen;
