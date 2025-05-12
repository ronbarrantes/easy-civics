"use client";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Language } from "@/lib/types";

export const LanguageToggle = ({
  handleLanguageAction,
}: {
  handleLanguageAction: (language: Language) => void;
}) => {
  const [language, setLanguage] = useState<Language>("en");

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    handleLanguageAction(language);
  };

  // useEffect(() => {
  //   const storedLanguage = localStorage.getItem("language") as Language;
  //   if (storedLanguage) {
  //     setLanguage(storedLanguage);
  //   }
  // }, []);

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
