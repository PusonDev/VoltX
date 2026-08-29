"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 p-1 bg-surface rounded-xl border border-border">
      {/* Light Button */}
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={`
          flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg transition-all
          ${
            theme === "light"
              ? "bg-white text-text-primary shadow-sm border border-border font-semibold"
              : "text-text-muted hover:text-text-primary"
          }
        `}
        title="Light Mode"
        aria-label="Light Theme"
      >
        <span>☀️</span>
        <span className="hidden sm:inline">Light</span>
      </button>

      {/* Purple (Light Beguni) Button */}
      <button
        type="button"
        onClick={() => setTheme("purple")}
        className={`
          flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg transition-all
          ${
            theme === "purple"
              ? "bg-[#EDE9FE] text-[#6D28D9] shadow-sm border border-[#DDD6FE] font-semibold"
              : "text-text-muted hover:text-text-primary"
          }
        `}
        title="Light Purple Mode"
        aria-label="Purple Theme"
      >
        <span>🔮</span>
        <span className="hidden sm:inline">Purple</span>
      </button>

      {/* Dark (Full Black) Button */}
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={`
          flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg transition-all
          ${
            theme === "dark"
              ? "bg-[#18181B] text-white shadow-sm border border-[#27272A] font-semibold"
              : "text-text-muted hover:text-text-primary"
          }
        `}
        title="Dark Black Mode"
        aria-label="Dark Theme"
      >
        <span>🌙</span>
        <span className="hidden sm:inline">Dark</span>
      </button>
    </div>
  );
}
