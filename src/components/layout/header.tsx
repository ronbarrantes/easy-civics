"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Flag } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Language } from "@/lib/types";
import { ModeToggle } from "./ModeToggle";

export function Header() {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") as Language;
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    // Reload the page to update all content
    window.location.reload();
  };

  return (
    <header className="bg-background/80 sticky top-0 z-10 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Flag className="text-primary h-5 w-5" />
          <span>US Citizenship Test</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Select
            value={language}
            onValueChange={(value) => handleLanguageChange(value as Language)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              {/* <SelectItem value="fr">Français</SelectItem> */}
            </SelectContent>
          </Select>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
