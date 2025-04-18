"use client";

import { useEffect, useRef, useState } from "react";

interface CountdownTimerProps {
  seconds: number;
  onExpire?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  seconds,
  onExpire,
}) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const endTimeRef = useRef<number>(Date.now() + seconds * 1000);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const remaining = Math.max(
        0,
        Math.floor((endTimeRef.current - now) / 1000)
      );
      setTimeLeft(remaining);
      if (remaining === 0 && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        onExpire?.();
      }
    };

    intervalRef.current = setInterval(updateTimer, 1000);
    updateTimer(); // Initial call to set the correct time immediately

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [onExpire]);

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
