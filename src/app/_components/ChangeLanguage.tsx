"use client";

import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ChangeLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English"); // State to track the selected language

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language); // Update the state with the selected language
    // Optionally, you can store the language in a cookie or localStorage
    document.cookie = `language=${language}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{selectedLanguage}</DropdownMenuTrigger>{" "}
      {/* Display the selected language */}
      <DropdownMenuContent>
        <DropdownMenuLabel>Change Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleLanguageChange("English")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("Spanish")}>
          Spanish
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("French")}>
          French
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("German")}>
          German
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
