"use server";

import Link from "next/link";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { Flag } from "lucide-react";

import { SyncUser } from "@/app/_components/SyncUser";
import { defaultSettings } from "@/config/settings";
import { Language } from "@/lib/types";
import { APP_DEFAULTS } from "@/utils/constants";
import { getCookie, setCookie } from "@/utils/cookies";
import { LanguageToggle } from "./LanguageToggle";
import { ModeToggle } from "./ModeToggle";

const getLanguage = () => {};

const setLanguage = () => {};

export async function Header() {
  const handleLanguageAction = async (language: Language) => {
    // setLanguage(newLanguage);
    // localStorage.setItem("language", newLanguage);

    //     const updatedDefaultSettings = {
    //       ...defaultSettings,
    //       // ...currentSettigns,
    //       language,
    //     };

    // await setCookie(APP_DEFAULTS, JSON.stringify(updatedDefaultSettings));

    // Reload the page to update all content
    // window.location.reload();
    //
    console.log("Language", language);
  };

  return (
    <header className="bg-background/80 sticky top-0 z-10 w-full backdrop-blur">
      <div className="container m-auto flex h-14 items-center justify-between border-b">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Flag className="text-primary h-5 w-5" />
          <span>US Citizenship Test</span>
        </Link>
        <nav className="flex items-center gap-4">
          <LanguageToggle
            handleLanguageAction={(language) => handleLanguageAction(language)}
          />
          <ModeToggle />
          <SignedIn>
            <SyncUser />
            <Link href="/">Stats</Link>
            <ul className="flex items-center">
              <li>
                <UserButton />
              </li>
            </ul>
          </SignedIn>
        </nav>
      </div>
    </header>
  );
}
