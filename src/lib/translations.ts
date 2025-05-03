import { Language } from "./types";

type TranslationKey = 
  | "appName"
  | "startTest"
  | "studyMode"
  | "categories"
  | "results"
  | "correct"
  | "incorrect"
  | "next"
  | "previous"
  | "submit"
  | "showAnswer"
  | "hideAnswer"
  | "passed"
  | "failed"
  | "tryAgain"
  | "reviewAnswers"
  | "home";

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    appName: "US Citizenship Test Practice",
    startTest: "Start Test",
    studyMode: "Study Mode",
    categories: "Categories",
    results: "Results",
    correct: "Correct",
    incorrect: "Incorrect",
    next: "Next",
    previous: "Previous",
    submit: "Submit",
    showAnswer: "Show Answer",
    hideAnswer: "Hide Answer",
    passed: "Congratulations! You Passed",
    failed: "Keep Practicing",
    tryAgain: "Try Again",
    reviewAnswers: "Review Answers",
    home: "Home"
  },
  es: {
    appName: "Práctica del Examen de Ciudadanía",
    startTest: "Comenzar Examen",
    studyMode: "Modo Estudio",
    categories: "Categorías",
    results: "Resultados",
    correct: "Correcto",
    incorrect: "Incorrecto",
    next: "Siguiente",
    previous: "Anterior",
    submit: "Enviar",
    showAnswer: "Mostrar Respuesta",
    hideAnswer: "Ocultar Respuesta",
    passed: "¡Felicitaciones! Aprobaste",
    failed: "Sigue Practicando",
    tryAgain: "Intentar de Nuevo",
    reviewAnswers: "Revisar Respuestas",
    home: "Inicio"
  }
};

export function getTranslation(key: TranslationKey, language: Language = 'en'): string {
  return translations[language][key];
}

export function getCurrentLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  return (localStorage.getItem('language') as Language) || 'en';
}