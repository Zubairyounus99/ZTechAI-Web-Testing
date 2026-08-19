"use client";

import React, { useEffect, useState } from "react";

interface AudioWaveformProps {
  isActive?: boolean;
  barCount?: number;
  className?: string;
  variant?: "teal" | "blue" | "emerald";
}

export function AudioWaveform({
  isActive = true,
  barCount = 18,
  className = "",
  variant = "teal",
}: AudioWaveformProps) {
  const [heights, setHeights] = useState<number[]>([]);

  useEffect(() => {
    // Generate initial varied heights
    const initial = Array.from({ length: barCount }, () => Math.floor(Math.random() * 60) + 20);
    setHeights(initial);

    if (!isActive) return;

    const interval = setInterval(() => {
      setHeights(
        Array.from({ length: barCount }, () => Math.floor(Math.random() * 75) + 15)
      );
    }, 180);

    return () => clearInterval(interval);
  }, [isActive, barCount]);

  const colorVariants = {
    teal: "bg-brand-400 shadow-brand-500/50",
    blue: "bg-accent-400 shadow-accent-500/50",
    emerald: "bg-emerald-400 shadow-emerald-500/50",
  };

  return (
    <div className={`flex items-center justify-center gap-1 sm:gap-1.5 h-10 ${className}`}>
      {heights.map((height, idx) => (
        <span
          key={idx}
          className={`w-1 sm:w-1.5 rounded-full transition-all duration-200 ${colorVariants[variant]}`}
          style={{
            height: isActive ? `${height}%` : "15%",
            opacity: isActive ? 0.9 : 0.3,
          }}
        />
      ))}
    </div>
  );
}
