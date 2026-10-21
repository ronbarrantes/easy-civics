"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  ALargeSmall,
  BookOpen,
  ClipboardCheck,
  Languages,
  Moon,
  Palette,
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
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-4 py-4">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <Link
            href="/"
            className="font-display inline-flex items-center gap-2 text-xl font-extrabold tracking-tight [font-stretch:115%] no-underline"
          >
            <Star aria-hidden className="text-flag size-6 fill-current" />
            {copy.appName}
          </Link>
          <nav aria-label={copy.nav.label}>
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {navItems.map((item) => {
                const current = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      className={cn(
                        "inline-flex items-center gap-2 py-2 font-bold underline-offset-[0.35em] hover:underline",
                        current && "decoration-flag underline decoration-4"
                      )}
                    >
                      <item.Icon aria-hidden className="text-accent size-5" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <button
            type="button"
            onClick={switchLanguage}
            lang={language === "en" ? "es" : "en"}
            aria-label={copy.settings.switchLanguageLabel}
            className="border-ink hover:bg-wash inline-flex min-h-[2.5rem] items-center gap-2 border-2 px-3 font-bold"
          >
            <Languages aria-hidden className="size-5" />
            {copy.settings.switchLanguage}
          </button>
          <div
            role="group"
            aria-label={copy.settings.textSize}
            className="flex items-center gap-3"
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
            className="flex items-center gap-3"
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
