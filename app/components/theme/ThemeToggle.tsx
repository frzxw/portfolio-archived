"use client";

import { useMemo } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";

  const nextTheme = useMemo(() => (theme === "dark" ? "light" : "dark"), [theme]);

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(nextTheme)}
      className="inline-flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-full border border-(--color-border-subtle) bg-(--color-card) text-(--color-text-primary) transition-colors duration-200 ease-out hover:bg-(--color-card-hover) active:bg-(--color-card-hover)"
    >
      <span className="relative block h-4.5 w-4.5">
        <Sun size={18} className="theme-icon theme-icon--sun" />
        <Moon size={18} className="theme-icon theme-icon--moon" />
      </span>
    </button>
  );
}
