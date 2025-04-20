import { useEffect, useRef, useState } from "react";

const useTypewriter = (text: string, speed = 50) => {
  const [displayText, setDisplayText] = useState("");
  const indexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    indexRef.current = 0;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      indexRef.current += 1;
      const next = text.slice(0, indexRef.current);
      setDisplayText(next);

      if (indexRef.current >= text.length) {
        clearInterval(intervalRef.current!);
      }
    }, speed);

    return () => clearInterval(intervalRef.current!);
  }, [text, speed]);

  return displayText;
};

export default useTypewriter;
