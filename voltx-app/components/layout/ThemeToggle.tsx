"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isDark = theme === "dark";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface border border-border text-text-primary hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
        aria-label="Toggle Theme"
        aria-expanded={isOpen}
      >
        <span className="text-lg leading-none">{isDark ? "🌙" : "☀️"}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-card-bg border border-border rounded-lg shadow-lg overflow-hidden z-50">
          <button
            onClick={() => {
              setTheme("purple"); // We keep "purple" as the light default theme token for continuity
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface text-left ${
              !isDark ? "text-primary bg-primary-tint/30" : "text-text-primary"
            }`}
          >
            <span>☀️</span> Light
          </button>
          <button
            onClick={() => {
              setTheme("dark");
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface text-left ${
              isDark ? "text-primary bg-primary-tint/30" : "text-text-primary"
            }`}
          >
            <span>🌙</span> Dark
          </button>
        </div>
      )}
    </div>
  );
}
