"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { type Locale } from "@/i18n/config";

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  
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

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setIsOpen(false);
  };

  const getLabel = (l: Locale) => (l === "en" ? "EN" : "AR");
  const getFullName = (l: Locale) => (l === "en" ? "English" : "العربية");

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface border border-border text-text-primary hover:border-primary font-bold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
        aria-label="Toggle Language"
        aria-expanded={isOpen}
      >
        {getLabel(locale)}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-card-bg border border-border rounded-lg shadow-lg overflow-hidden z-50">
          <button
            onClick={() => switchLocale("en")}
            className={`w-full px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface text-left ${
              locale === "en" ? "text-primary bg-primary-tint/30" : "text-text-primary"
            }`}
          >
            {getFullName("en")}
          </button>
          <button
            onClick={() => switchLocale("ar")}
            className={`w-full px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface text-left ${
              locale === "ar" ? "text-primary bg-primary-tint/30" : "text-text-primary"
            }`}
          >
            {getFullName("ar")}
          </button>
        </div>
      )}
    </div>
  );
}
