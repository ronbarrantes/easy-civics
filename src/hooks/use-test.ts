import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { Question, UserAnswer } from "@/lib/types";

type TestState = {
  questions: Question[];
  userAnswers: UserAnswer[];
};

type TestActions = {
  setQuestions: (questions: Question[]) => void;
  setUserAnswer: (userAnswer: UserAnswer) => void;
};

type TestStore = TestActions & TestState;

export const useTestStore = create<TestStore>()(
  devtools(
    persist(
      (set) => ({
        questions: [],
        userAnswers: [],
        setUserAnswer: (userAnswer) =>
          set((state) => ({
            userAnswers: [...state.userAnswers, userAnswer],
          })),
        setQuestions: (questions) => set(() => ({ questions })),
      }),
      { name: "bearStore" }
    )
  )
);
