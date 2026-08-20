import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 font-display font-bold tracking-tight text-foreground transition-opacity hover:opacity-90 ${sizeClasses[size]} ${className}`}
      aria-label="ZTechAI Homepage"
    >
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-accent-500 p-0.5 shadow-lg shadow-brand-500/20 ${iconSizes[size]}`}>
        <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-surface-dark">
          {/* Futuristic geometric Z & soundwave motif */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-brand-400"
          >
            <path d="M4 6h16l-10 12h10" />
            <path d="M12 2v2" className="stroke-accent-400" />
            <path d="M12 20v2" className="stroke-accent-400" />
          </svg>
        </div>
      </div>
      <span className="flex items-center">
        <span>ZTech</span>
        <span className="text-brand-400">AI</span>
      </span>
    </Link>
  );
}
