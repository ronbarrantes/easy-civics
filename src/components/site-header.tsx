"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { getCopy } from "@/lib/copy";
import { Language, TextSize } from "@/lib/types";
import { cn } from "@/lib/utils";
import { LANGUAGE_COOKIE, TEXT_SIZE_STORAGE_KEY } from "@/utils/constants";

export function SiteHeader({ language }: { language: Language }) {
  const copy = getCopy(language);
  const router = useRouter();
  const pathname = usePathname();
  const [textSize, setTextSize] = useState<TextSize>("large");

  useEffect(() => {
    if (document.documentElement.dataset.textSize === "larger") {
      setTextSize("larger");
    }
  }, []);

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
    { href: "/test", label: copy.nav.test },
    { href: "/study", label: copy.nav.study },
  ];

  return (
    <header className="border-rule border-b-2">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-4 py-4">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <Link
            href="/"
            className="font-display text-xl font-extrabold tracking-tight [font-stretch:115%] no-underline"
          >
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
                        "inline-block py-2 font-bold underline-offset-[0.35em] hover:underline",
                        current && "decoration-accent underline decoration-4"
                      )}
                    >
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
            className="border-ink hover:bg-wash min-h-[2.5rem] border-2 px-3 font-bold"
          >
            {copy.settings.switchLanguage}
          </button>
          <div
            role="group"
            aria-label={copy.settings.textSize}
            className="flex items-center gap-3"
          >
            <span className="text-quiet" aria-hidden>
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
                    textSize === size ? "bg-ink text-paper" : "hover:bg-wash"
                  )}
                >
                  {size === "large"
                    ? copy.settings.large
                    : copy.settings.larger}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
