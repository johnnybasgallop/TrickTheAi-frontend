import React from "react";

interface ProgressBarProps {
  label: string;
  value: number; // 0 to 10
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value }) => {
  const percent = Math.min(100, Math.max(0, (value / 10) * 100));

  return (
    <div className="mb-2">
      <div className="text-sm mb-1">{label}</div>
      <div className="w-full h-4 border border-green-500">
        <div
          className="h-full bg-green-500"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
