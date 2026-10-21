import { Question } from "@/lib/types";
import { filterAndRandomizeAnswers } from "@/utils/filter-and-randomize-answers";
import { randomizeArray } from "@/utils/randomize-array";

// Picks `count` random questions and a shuffled set of answer choices for each
export const buildTest = (pool: Question[], count: number): Question[] =>
  filterAndRandomizeAnswers(randomizeArray(pool).slice(0, count));
