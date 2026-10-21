export const LANGUAGE_COOKIE = "language";
export const TEXT_SIZE_STORAGE_KEY = "easy-civics:text-size";
export const STUDY_STORAGE_KEY = "easy-civics:study";

export const TOTAL_QUESTIONS = 128;

// 2025 civics test: up to 20 questions asked, 12 correct to pass
export const STANDARD_TEST = { questions: 20, toPass: 12 } as const;
// 65/20 special consideration: 10 questions from the starred 20, 6 to pass
export const SENIOR_TEST = { questions: 10, toPass: 6 } as const;

export const MAX_NUMBER_OF_ANSWERS = 5;
export const MIN_NUMBER_OF_INCORRECT_ANSWERS = 2;
