import { Language } from "@/lib/types";

const en = {
  appName: "Easy Civics",
  nav: {
    label: "Main",
    test: "Practice test",
    study: "Study",
  },
  settings: {
    switchLanguage: "Español",
    switchLanguageLabel: "Cambiar a español",
    textSize: "Text size",
    large: "Large",
    larger: "Larger",
    theme: "Colors",
    light: "Light",
    dark: "Dark",
  },
  readAloud: "Read aloud",
  stopReading: "Stop reading",
  showAnswer: "Show answer",
  hideAnswer: "Hide answer",
  answer: "Answer",
  answers: "Answers",
  questionOf: (n: number, total: number) => `Question ${n} of ${total}`,
  home: {
    title: "Practice for the U.S. citizenship civics test",
    intro:
      "All 128 official questions from the 2025 test, in English and Spanish. Free, with no account.",
    demoLabel: "Try one",
    testTitle: "Practice test",
    testBody:
      "20 random questions, like the interview. You need 12 right to pass.",
    testButton: "Start a practice test",
    studyTitle: "Study",
    studyBody:
      "Go through all 128 questions and answers at your own pace. Mark the ones you know.",
    studyButton: "Start studying",
    aboutTitle: "About the 2025 civics test",
    aboutAsked:
      "At your interview, the officer asks up to 20 of the 128 questions out loud. You need to answer 12 correctly.",
    aboutChanges:
      "Some answers change after elections. Check the latest answers before your interview.",
    aboutChangesLink: "See the latest answers on uscis.gov",
    aboutState:
      "Questions about your state use North Carolina answers. Your U.S. representative depends on where you live.",
    aboutStateLink: "Find your representative on house.gov",
    seniorTitle: "65 or older?",
    seniorBody:
      "If you are 65 or older and have been a permanent resident for 20 years or more, you only need to study 20 questions. You can also take the test in your language.",
    seniorLink: "Study the 20 questions",
    officialLink: "Read the official list of 128 questions (PDF, English)",
  },
  test: {
    title: "Practice test",
    chooseTest: "Choose a test",
    standardName: "Standard test",
    standardBody: "20 questions. You need 12 right to pass.",
    seniorName: "65/20 test",
    seniorBody: "10 questions from the 65/20 list. You need 6 right to pass.",
    tips: [
      "There is no time limit.",
      "After each answer, you will see if you were right.",
    ],
    start: "Start the test",
    chooseOne: "Choose one answer.",
    chooseMany: (n: number) => `Choose ${n} answers.`,
    limitReached: (n: number) =>
      `You already chose ${n}. Tap a chosen answer to unselect it.`,
    check: "Check answer",
    correct: "Correct.",
    incorrect: "Not quite.",
    rightAnswerLabel: "Right answer",
    yourAnswerLabel: "Your answer",
    next: "Next question",
    finish: "See my results",
    soFar: (n: number) => `${n} right so far`,
    passed: "You passed.",
    notYet: "Not yet.",
    score: (right: number, total: number, needed: number) =>
      `You got ${right} of ${total} right. You needed ${needed}.`,
    missedSaved:
      "The questions you missed were added to your study list as “Still learning.”",
    again: "Take another test",
    studyMissed: "Study the questions you missed",
    yourAnswers: "Your answers",
    right: "Right",
    wrong: "Wrong",
    youAnswered: "You answered:",
    rightAnswer: "Right answer:",
    rightAnswers: "Right answers:",
  },
  study: {
    title: "Study",
    progress: (known: number, total: number) =>
      `You know ${known} of ${total} questions.`,
    listLabel: "Show",
    all: "All questions",
    learning: "Still learning",
    senior: "65/20 questions",
    knewIt: "I knew it",
    stillLearning: "Still learning",
    markedKnown: "You marked this: I knew it.",
    markedLearning: "You marked this: Still learning.",
    previous: "Previous",
    next: "Next",
    emptyTitle: "Nothing here yet",
    emptyBody:
      "Questions you mark “Still learning” or miss on a practice test show up here.",
    emptyButton: "Study all questions",
    reset: "Clear my progress",
    resetConfirm: "Clear everything you marked? This can’t be undone.",
  },
  footer: {
    notOfficial:
      "Easy Civics is a free study tool. It is not run by or connected to USCIS or the U.S. government.",
    privacy:
      "Your study progress is saved only in this browser. Nothing is sent to a server.",
    source: "Questions come from the USCIS 2025 civics test (form M-1778).",
    madeBy: "Made by Ron Barrantes",
  },
  notFound: {
    title: "Page not found",
    body: "This page does not exist.",
    home: "Go to the home page",
  },
  error: {
    title: "Something went wrong",
    body: "The page did not load. Try again, or go back to the home page.",
    retry: "Try again",
  },
};

export type Copy = typeof en;

const es: Copy = {
  appName: "Easy Civics",
  nav: {
    label: "Principal",
    test: "Examen de práctica",
    study: "Estudiar",
  },
  settings: {
    switchLanguage: "English",
    switchLanguageLabel: "Switch to English",
    textSize: "Tamaño del texto",
    large: "Grande",
    larger: "Más grande",
    theme: "Colores",
    light: "Claro",
    dark: "Oscuro",
  },
  readAloud: "Leer en voz alta",
  stopReading: "Dejar de leer",
  showAnswer: "Ver respuesta",
  hideAnswer: "Ocultar respuesta",
  answer: "Respuesta",
  answers: "Respuestas",
  questionOf: (n, total) => `Pregunta ${n} de ${total}`,
  home: {
    title: "Practique para el examen de educación cívica de ciudadanía",
    intro:
      "Las 128 preguntas oficiales del examen de 2025, en inglés y en español. Gratis y sin crear una cuenta.",
    demoLabel: "Pruebe una",
    testTitle: "Examen de práctica",
    testBody:
      "20 preguntas al azar, como en la entrevista. Necesita 12 correctas para aprobar.",
    testButton: "Comenzar un examen de práctica",
    studyTitle: "Estudiar",
    studyBody:
      "Repase las 128 preguntas y respuestas a su propio ritmo. Marque las que ya sabe.",
    studyButton: "Comenzar a estudiar",
    aboutTitle: "Sobre el examen de educación cívica de 2025",
    aboutAsked:
      "En su entrevista, el oficial le hace en voz alta hasta 20 de las 128 preguntas. Necesita contestar 12 correctamente.",
    aboutChanges:
      "Algunas respuestas cambian después de las elecciones. Verifique las respuestas más recientes antes de su entrevista.",
    aboutChangesLink: "Ver las respuestas más recientes en uscis.gov",
    aboutState:
      "Las preguntas sobre su estado usan respuestas de Carolina del Norte. Su representante depende de dónde vive.",
    aboutStateLink: "Busque a su representante en house.gov",
    seniorTitle: "¿Tiene 65 años o más?",
    seniorBody:
      "Si tiene 65 años o más y ha sido residente permanente por 20 años o más, solo necesita estudiar 20 preguntas. También puede tomar el examen en su idioma.",
    seniorLink: "Estudiar las 20 preguntas",
    officialLink: "Leer la lista oficial de 128 preguntas (PDF, en inglés)",
  },
  test: {
    title: "Examen de práctica",
    chooseTest: "Elija un examen",
    standardName: "Examen normal",
    standardBody: "20 preguntas. Necesita 12 correctas para aprobar.",
    seniorName: "Examen 65/20",
    seniorBody:
      "10 preguntas de la lista 65/20. Necesita 6 correctas para aprobar.",
    tips: [
      "No hay límite de tiempo.",
      "Después de cada respuesta, verá si acertó.",
    ],
    start: "Comenzar el examen",
    chooseOne: "Elija una respuesta.",
    chooseMany: (n) => `Elija ${n} respuestas.`,
    limitReached: (n) =>
      `Ya eligió ${n}. Toque una respuesta elegida para quitarla.`,
    check: "Revisar respuesta",
    correct: "Correcto.",
    incorrect: "No es correcto.",
    rightAnswerLabel: "Respuesta correcta",
    yourAnswerLabel: "Su respuesta",
    next: "Siguiente pregunta",
    finish: "Ver mis resultados",
    soFar: (n) => `${n} correctas hasta ahora`,
    passed: "Aprobó.",
    notYet: "Todavía no.",
    score: (right, total, needed) =>
      `Contestó ${right} de ${total} correctamente. Necesitaba ${needed}.`,
    missedSaved:
      "Las preguntas que falló se agregaron a su lista de estudio como “Todavía aprendiendo”.",
    again: "Tomar otro examen",
    studyMissed: "Estudiar las preguntas que falló",
    yourAnswers: "Sus respuestas",
    right: "Correcta",
    wrong: "Incorrecta",
    youAnswered: "Usted contestó:",
    rightAnswer: "Respuesta correcta:",
    rightAnswers: "Respuestas correctas:",
  },
  study: {
    title: "Estudiar",
    progress: (known, total) => `Sabe ${known} de ${total} preguntas.`,
    listLabel: "Mostrar",
    all: "Todas las preguntas",
    learning: "Todavía aprendiendo",
    senior: "Preguntas 65/20",
    knewIt: "Ya la sabía",
    stillLearning: "Todavía aprendiendo",
    markedKnown: "Usted marcó: Ya la sabía.",
    markedLearning: "Usted marcó: Todavía aprendiendo.",
    previous: "Anterior",
    next: "Siguiente",
    emptyTitle: "Todavía no hay nada aquí",
    emptyBody:
      "Aquí aparecen las preguntas que marque “Todavía aprendiendo” o que falle en un examen de práctica.",
    emptyButton: "Estudiar todas las preguntas",
    reset: "Borrar mi progreso",
    resetConfirm: "¿Borrar todo lo que marcó? No se puede deshacer.",
  },
  footer: {
    notOfficial:
      "Easy Civics es una herramienta de estudio gratuita. No la administra USCIS ni el gobierno de los Estados Unidos, y no tiene relación con ellos.",
    privacy:
      "Su progreso se guarda solo en este navegador. No se envía nada a un servidor.",
    source:
      "Las preguntas vienen del examen de educación cívica de 2025 de USCIS (formulario M-1778).",
    madeBy: "Hecho por Ron Barrantes",
  },
  notFound: {
    title: "No se encontró la página",
    body: "Esta página no existe.",
    home: "Ir a la página principal",
  },
  error: {
    title: "Algo salió mal",
    body: "La página no cargó. Inténtelo de nuevo o vuelva a la página principal.",
    retry: "Intentar de nuevo",
  },
};

const copyByLanguage: Record<Language, Copy> = { en, es };

export const getCopy = (language: Language): Copy => copyByLanguage[language];

export const LINKS = {
  testUpdates: "https://www.uscis.gov/citizenship/testupdates",
  officialList:
    "https://www.uscis.gov/sites/default/files/document/questions-and-answers/2025-Civics-Test-128-Questions-and-Answers.pdf",
  findRepresentative:
    "https://www.house.gov/representatives/find-your-representative",
  author: "https://ronb.co",
};
