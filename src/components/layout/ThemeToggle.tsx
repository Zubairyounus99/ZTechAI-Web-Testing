"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Monitor } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const cycleTheme = () => {
    if (theme === "dark") setTheme("light");
    else if (theme === "light") setTheme("system");
    else setTheme("dark");
  };

  return (
    <button
      onClick={cycleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-darkBorder bg-surface-muted text-text-muted transition-colors hover:text-foreground focus:outline-none"
      title={`Current theme: ${theme} (Click to switch)`}
      aria-label="Toggle theme mode"
    >
      {theme === "dark" && <Moon className="h-4 w-4 text-brand-400" />}
      {theme === "light" && <Sun className="h-4 w-4 text-amber-500" />}
      {theme === "system" && <Monitor className="h-4 w-4 text-accent-400" />}
    </button>
  );
}
