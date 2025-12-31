"use client";

import { useTheme } from "@/context/themeProvider";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors hover:bg-surface-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${className}`}
      aria-label={`Switch to ${resolvedTheme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${resolvedTheme === "light" ? "dark" : "light"} mode`}
    >
      {resolvedTheme === "light" ? (
        <Moon className="h-5 w-5 text-text-secondary hover:text-text-primary transition-colors" />
      ) : (
        <Sun className="h-5 w-5 text-text-secondary hover:text-text-primary transition-colors" />
      )}
    </button>
  );
}
