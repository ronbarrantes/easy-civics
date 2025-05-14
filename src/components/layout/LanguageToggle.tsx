"use client";

import { useState } from "react";

import {
  getLanguageServerAction,
  setLanguageServerAction,
} from "@/app/actions/language";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Language } from "@/lib/types";

export const LanguageToggle = () => {
  const [language, setLanguage] = useState<Language>("en");

  const handleLanguageChange = async (newLanguage: Language) => {
    setLanguage(newLanguage);

    // Call the server action
    await setLanguageServerAction(newLanguage);

    const theCookie = await getLanguageServerAction();
    console.log("THE COOKIE", theCookie);

    // Optionally reload to reflect updated settings
    // window.location.reload();
  };

  return (
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
      </SelectContent>
    </Select>
  );
};
