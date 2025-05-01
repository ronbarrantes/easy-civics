import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { Question, UserAnswer } from "@/lib/types";

type TestState = {
  questions: Question[];
  userAnswers: UserAnswer[];
  currentQuestionIndex: number;
  isCompleted: boolean;
};

type TestActions = {
  setQuestions: (questions: Question[]) => void;
  setUserAnswer: (userAnswer: UserAnswer) => void;
  increaseQuestionIndex: () => void;
  resetIndex: () => void;
};

export type TestStore = TestActions & TestState;

export const useTestStore = create<TestStore>()(
  devtools(
    persist(
      (set, getState) => ({
        currentQuestionIndex: 1,
        questions: [],
        userAnswers: [],
        get isCompleted() {
          return getState().userAnswers.length >= getState().questions.length;
        },
        setUserAnswer: (userAnswer) =>
          set((state) => ({
            userAnswers: [...state.userAnswers, userAnswer],
          })),
        setQuestions: (questions) => set(() => ({ questions })),

        increaseQuestionIndex: () =>
          set((state) => ({
            currentQuestionIndex: state.currentQuestionIndex + 1,
          })),
        resetIndex: () => set({ currentQuestionIndex: 1 }),
      }),
      { name: "bearStore" }
    )
  )
);
