import { Language } from "@/lib/types";

type Section = {
  from: number;
  to: number;
  name: Record<Language, string>;
  part: Record<Language, string>;
};

// Section ranges from the USCIS 2025 civics test (M-1778)
const SECTIONS: Section[] = [
  {
    from: 1,
    to: 15,
    name: { en: "American Government", es: "Gobierno estadounidense" },
    part: {
      en: "Principles of American government",
      es: "Principios del gobierno estadounidense",
    },
  },
  {
    from: 16,
    to: 62,
    name: { en: "American Government", es: "Gobierno estadounidense" },
    part: { en: "System of government", es: "Sistema de gobierno" },
  },
  {
    from: 63,
    to: 72,
    name: { en: "American Government", es: "Gobierno estadounidense" },
    part: {
      en: "Rights and responsibilities",
      es: "Derechos y responsabilidades",
    },
  },
  {
    from: 73,
    to: 89,
    name: { en: "American History", es: "Historia estadounidense" },
    part: {
      en: "Colonial period and independence",
      es: "Período colonial e independencia",
    },
  },
  {
    from: 90,
    to: 99,
    name: { en: "American History", es: "Historia estadounidense" },
    part: { en: "1800s", es: "Siglo XIX (los años 1800)" },
  },
  {
    from: 100,
    to: 118,
    name: { en: "American History", es: "Historia estadounidense" },
    part: {
      en: "Recent American history",
      es: "Historia estadounidense reciente",
    },
  },
  {
    from: 119,
    to: 124,
    name: { en: "Symbols and Holidays", es: "Símbolos y días feriados" },
    part: { en: "Symbols", es: "Símbolos" },
  },
  {
    from: 125,
    to: 128,
    name: { en: "Symbols and Holidays", es: "Símbolos y días feriados" },
    part: { en: "Holidays", es: "Días feriados" },
  },
];

export const getSection = (questionNumber: number, language: Language) => {
  const section = SECTIONS.find(
    (s) => questionNumber >= s.from && questionNumber <= s.to
  );
  return section ? `${section.name[language]}: ${section.part[language]}` : "";
};

// Questions marked with an asterisk for the 65/20 special consideration
export const SENIOR_QUESTION_NUMBERS = new Set([
  2, 7, 12, 20, 30, 36, 38, 39, 44, 52, 61, 66, 74, 78, 86, 94, 113, 115, 121,
  126,
]);
