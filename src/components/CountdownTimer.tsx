// src/components/CountdownTimer.tsx
"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  seconds: number;
  onExpire?: any;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  seconds,
  onExpire,
}) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="font-mono text-green-500 border-2 border-green-500 px-4 py-2 animate-pulse self-end">
      <span className="text-xs block mb-1">MISSION TIME REMAINING</span>
      <span className="text-2xl tracking-widest text-red-400">
        {formatTime(timeLeft)}
      </span>
    </div>
  );
};

export default CountdownTimer;
