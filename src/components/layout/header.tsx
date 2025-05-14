"use client";

import Link from "next/link";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { Flag } from "lucide-react";

import { SyncUser } from "@/app/_components/SyncUser";
import { LanguageToggle } from "./LanguageToggle";
import { ModeToggle } from "./ModeToggle";

export function Header() {
  return (
    <header className="bg-background/80 sticky top-0 z-10 w-full backdrop-blur">
      <div className="container m-auto flex h-14 items-center justify-between border-b">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Flag className="text-primary h-5 w-5" />
          <span>US Citizenship Test</span>
        </Link>
        <nav className="flex items-center gap-4">
          <LanguageToggle />
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
