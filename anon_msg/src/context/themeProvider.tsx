"use client";

import React, { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "anonmsg-theme";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }
  return null;
}

// Custom hook to detect if component is mounted (client-side)
function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isMounted = useIsMounted();
  
  // Use lazy initialization for theme state
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system";
    return getStoredTheme() ?? "system";
  });
  
  // Compute resolved theme directly (no separate state needed)
  const resolvedTheme: "light" | "dark" = isMounted 
    ? (theme === "system" ? getSystemTheme() : theme)
    : "light";

  // Apply theme to document
  useEffect(() => {
    if (!isMounted) return;
    
    const root = document.documentElement;
    root.setAttribute("data-theme", resolvedTheme);
    
    // Also update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        resolvedTheme === "dark" ? "#18181b" : "#ffffff"
      );
    }
  }, [resolvedTheme, isMounted]);

  // Listen for system theme changes when using system theme
  useEffect(() => {
    if (!isMounted || theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      // Force re-render by updating theme state (which will recompute resolvedTheme)
      setThemeState("system");
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [theme, isMounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Prevent flash of incorrect theme by not rendering until mounted
  // The initial HTML will use the script below to set the correct theme
  if (!isMounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

/**
 * Inline script to prevent flash of wrong theme.
 * Add this in your root layout's <head> or before the closing </head> tag.
 * 
 * Usage in layout.tsx:
 * <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
 */
export const themeInitScript = `
(function() {
  const STORAGE_KEY = 'anonmsg-theme';
  let theme = 'light';
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') {
      theme = stored;
    } else if (stored === 'system' || !stored) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
  } catch (e) {}
  
  document.documentElement.setAttribute('data-theme', theme);
})();
`;
