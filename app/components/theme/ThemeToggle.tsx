"use client";

import { useMemo } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = resolvedTheme !== undefined;

  const theme = resolvedTheme === "dark" ? "dark" : "light";

  const label = useMemo(
    () => (theme === "dark" ? "Switch to light" : "Switch to dark"),
    [theme],
  );

  return (
    <button
      type="button"
      aria-label={label}
      suppressHydrationWarning
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--color-border-subtle) bg-(--color-card) text-(--color-text-primary) transition-transform duration-150 ease-out hover:scale-[1.03]"
    >
      <span suppressHydrationWarning>
        {mounted && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </span>
    </button>
  );
}
