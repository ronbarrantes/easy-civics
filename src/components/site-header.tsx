"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  ALargeSmall,
  BookOpen,
  ClipboardCheck,
  Languages,
  Moon,
  Palette,
  Settings2,
  Star,
  Sun,
} from "lucide-react";

import { getCopy } from "@/lib/copy";
import { Language, TextSize, Theme } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  LANGUAGE_COOKIE,
  TEXT_SIZE_STORAGE_KEY,
  THEME_STORAGE_KEY,
} from "@/utils/constants";

export function SiteHeader({ language }: { language: Language }) {
  const copy = getCopy(language);
  const router = useRouter();
  const pathname = usePathname();
  const [textSize, setTextSize] = useState<TextSize>("large");
  const [theme, setTheme] = useState<Theme>("light");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (document.documentElement.dataset.textSize === "larger") {
      setTextSize("larger");
    }
    // Without a saved choice the colors follow the device setting
    const saved = document.documentElement.dataset.theme;
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  const changeTheme = (next: Theme) => {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be blocked; the colors still apply for this visit
    }
  };

  const changeTextSize = (size: TextSize) => {
    setTextSize(size);
    document.documentElement.dataset.textSize = size;
    try {
      localStorage.setItem(TEXT_SIZE_STORAGE_KEY, size);
    } catch {
      // Storage can be blocked; the size still applies for this visit
    }
  };

  const switchLanguage = () => {
    const next: Language = language === "en" ? "es" : "en";
    document.cookie = `${LANGUAGE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  };

  const navItems = [
    { href: "/test", label: copy.nav.test, Icon: ClipboardCheck },
    { href: "/study", label: copy.nav.study, Icon: BookOpen },
  ];

  return (
    <header className="border-t-flag border-b-rule border-t-4 border-b-2">
      <div
        onKeyDown={(event) => {
          if (event.key === "Escape" && settingsOpen) {
            setSettingsOpen(false);
            settingsButton.current?.focus();
          }
        }}
        className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2 lg:gap-x-8 lg:py-4"
      >
        <Link
          href="/"
          className="font-display mr-auto inline-flex min-h-[2.75rem] items-center gap-2 text-lg font-extrabold tracking-tight [font-stretch:115%] no-underline sm:text-xl lg:mr-0"
        >
          <Star aria-hidden className="text-flag size-6 fill-current" />
          {copy.appName}
        </Link>

        {/* Phones get a short language switch; the other settings fold into a panel */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={switchLanguage}
            lang={language === "en" ? "es" : "en"}
            className="border-ink hover:bg-wash inline-flex min-h-[2.75rem] items-center gap-1.5 border-2 px-2.5 font-bold"
          >
            <Languages aria-hidden className="size-5" />
            {copy.settings.switchLanguageShort}
            <span className="sr-only">
              {" "}
              {copy.settings.switchLanguageLabel}
            </span>
          </button>
          <button
            ref={settingsButton}
            type="button"
            aria-expanded={settingsOpen}
            aria-controls="site-settings"
            aria-label={copy.settings.label}
            onClick={() => setSettingsOpen((open) => !open)}
            className={cn(
              "inline-flex min-h-[2.75rem] min-w-[2.75rem] items-center justify-center border-2",
              settingsOpen
                ? "border-accent bg-accent text-accent-ink"
                : "border-ink hover:bg-wash"
            )}
          >
            <Settings2 aria-hidden className="size-6" />
          </button>
        </div>

        <nav aria-label={copy.nav.label} className="w-full lg:w-auto">
          <ul className="flex flex-wrap gap-x-5 gap-y-1 sm:gap-x-6">
            {navItems.map((item) => {
              const current = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "inline-flex min-h-[2.75rem] items-center gap-2 font-bold underline-offset-[0.35em] hover:underline",
                      current && "decoration-flag underline decoration-4"
                    )}
                  >
                    <item.Icon
                      aria-hidden
                      className="text-accent hidden size-5 sm:block"
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          id="site-settings"
          className={cn(
            "border-rule w-full flex-col gap-3 border-t-2 pt-3 pb-1 lg:ml-auto lg:flex lg:w-auto lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-6 lg:border-0 lg:p-0",
            settingsOpen ? "flex" : "hidden"
          )}
        >
          <button
            type="button"
            onClick={switchLanguage}
            lang={language === "en" ? "es" : "en"}
            aria-label={copy.settings.switchLanguageLabel}
            className="border-ink hover:bg-wash hidden min-h-[2.5rem] items-center gap-2 border-2 px-3 font-bold lg:inline-flex"
          >
            <Languages aria-hidden className="size-5" />
            {copy.settings.switchLanguage}
          </button>
          <div
            role="group"
            aria-label={copy.settings.textSize}
            className="flex flex-col items-start gap-1 lg:flex-row lg:items-center lg:gap-3"
          >
            <span
              className="text-quiet inline-flex items-center gap-2"
              aria-hidden
            >
              <ALargeSmall className="size-5" />
              {copy.settings.textSize}
            </span>
            <div className="border-ink flex border-2">
              {(["large", "larger"] as const).map((size) => (
                <button
                  key={size}
                  type="button"
                  aria-pressed={textSize === size}
                  onClick={() => changeTextSize(size)}
                  className={cn(
                    "min-h-[2.25rem] px-3 font-bold",
                    textSize === size
                      ? "bg-accent text-accent-ink"
                      : "hover:bg-wash"
                  )}
                >
                  {size === "large"
                    ? copy.settings.large
                    : copy.settings.larger}
                </button>
              ))}
            </div>
          </div>
          <div
            role="group"
            aria-label={copy.settings.theme}
            className="flex flex-col items-start gap-1 lg:flex-row lg:items-center lg:gap-3"
          >
            <span
              className="text-quiet inline-flex items-center gap-2"
              aria-hidden
            >
              <Palette className="size-5" />
              {copy.settings.theme}
            </span>
            <div className="border-ink flex border-2">
              {(
                [
                  ["light", copy.settings.light, Sun],
                  ["dark", copy.settings.dark, Moon],
                ] as const
              ).map(([value, label, Icon]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={theme === value}
                  onClick={() => changeTheme(value)}
                  className={cn(
                    "inline-flex min-h-[2.25rem] items-center gap-2 px-3 font-bold",
                    theme === value
                      ? "bg-accent text-accent-ink"
                      : "hover:bg-wash"
                  )}
                >
                  <Icon aria-hidden className="size-5" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
