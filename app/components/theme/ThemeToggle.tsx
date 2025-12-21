"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";

// Inline SVG icons to avoid lucide-react bundle
function SunIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="theme-icon theme-icon--sun">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="theme-icon theme-icon--moon">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

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
        <SunIcon size={18} />
        <MoonIcon size={18} />
      </span>
    </button>
  );
}
