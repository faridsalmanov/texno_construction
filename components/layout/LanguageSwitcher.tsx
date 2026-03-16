"use client";

import { useRef, useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { type Locale } from "@/i18n/routing";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

const localeLabels: Record<Locale, string> = {
  az: "AZ",
  en: "EN",
  ru: "RUS",
};

const locales = Object.keys(localeLabels) as Locale[];

type LanguageSwitcherProps = {
  isLight?: boolean;
  variant?: "dropdown" | "compact";
};

export function LanguageSwitcher({
  isLight = false,
  variant = "dropdown",
}: LanguageSwitcherProps): ReactNode {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLocaleChange = (newLocale: Locale): void => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Compact variant: horizontal segmented control for mobile */
  if (variant === "compact") {
    return (
      <div
        className="flex rounded-lg overflow-hidden border border-white/40 bg-white/5 backdrop-blur-sm"
        role="group"
        aria-label="Select language"
      >
        {locales.map((loc) => {
          const isActive = locale === loc;
          return (
            <button
              key={loc}
              type="button"
              onClick={() => handleLocaleChange(loc)}
              className={`flex-1 min-w-0 py-2.5 px-3 text-sm font-semibold transition-all ${
                isActive
                  ? "bg-secondary text-white"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
              aria-pressed={isActive}
            >
              {localeLabels[loc]}
            </button>
          );
        })}
      </div>
    );
  }

  /* Dropdown variant: desktop */
  const buttonClass = isLight
    ? "text-white border-white/60 hover:bg-white/10 hover:border-white"
    : "text-foreground border-border hover:bg-card hover:border-primary/30";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-all ${buttonClass}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <span>{localeLabels[locale]}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-2 min-w-[70px] bg-white rounded-lg shadow-lg border border-border py-1 z-50"
        >
          {locales.map((loc) => (
            <li key={loc} role="option" aria-selected={locale === loc}>
              <button
                type="button"
                onClick={() => handleLocaleChange(loc)}
                className={`w-full text-left px-3 py-2 text-sm font-medium transition-colors ${
                  locale === loc
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-card"
                }`}
              >
                {localeLabels[loc]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
