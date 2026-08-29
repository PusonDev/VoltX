"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    // Replace the locale segment in the current path
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  const otherLocale = locales.find((l) => l !== locale) as Locale;

  return (
    <button
      onClick={() => switchLocale(otherLocale)}
      className="
        inline-flex items-center gap-1.5 px-3 py-1.5
        text-sm font-medium rounded-lg
        border border-border bg-card-bg
        text-text-secondary hover:text-primary hover:border-primary/30
        transition-colors duration-200
      "
      aria-label={`Switch to ${localeNames[otherLocale]}`}
    >
      <span className="text-base" aria-hidden="true">
        🌐
      </span>
      {localeNames[otherLocale]}
    </button>
  );
}
