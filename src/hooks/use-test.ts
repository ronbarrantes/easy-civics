import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Answer, Question } from "@/lib/types";

type TestState = {
  questions: Question[];
  userAnswers: Array<Set<string>>;
  currentQuestionIndex: number; // maybe remove
  isStarted: boolean;
  selectedAnswers: Set<string>;
  answers: Answer[];
  timeStarted: Date;
  timeEnded?: Date;
  // isComplete: boolean;
};

type TestActions = {
  setQuestions: (questions: Question[]) => void;
  setUserAnswer: (userAnswer: Set<string>) => void;
  increaseQuestionIndex: () => void; // maybe remove
  decreaseQuestionIndex: () => void; // maybe remove
  startTest: () => void;
  stopTest: () => void;
  toggleAnswer: (selectedAnswer: string) => void;
  singleChoiceAnswer: (selectedAnswer: string) => void;
  setTimeStarted: (timeStarted: Date) => void;
  setTimeEnded: (timeEnded: Date) => void;
};

export type TestStore = TestActions & TestState;

export const useTestStore = create<TestStore>()(
  devtools(
    // persist

    (set) => ({
      isStarted: false,
      timeStarted: new Date(),
      timeEnded: undefined,
      currentQuestionIndex: 0,
      questions: [],
      answers: [],
      userAnswers: [],
      selectedAnswers: new Set(),
      toggleAnswer: (selectedAnswers) =>
        set((state) => {
          const newSelectedAnswers = new Set(state.selectedAnswers);
          if (newSelectedAnswers.has(selectedAnswers)) {
            newSelectedAnswers.delete(selectedAnswers);
          } else {
            newSelectedAnswers.add(selectedAnswers);
          }
          return { selectedAnswers: newSelectedAnswers };
        }),
      singleChoiceAnswer: (selectedAnswer) =>
        set((state) => {
          const newSelectedAnswers = new Set(state.selectedAnswers);
          newSelectedAnswers.clear();
          newSelectedAnswers.add(selectedAnswer);
          return { selectedAnswers: newSelectedAnswers };
        }),

      setUserAnswer: (userAnswer) =>
        set((state) => {
          const newUserAnswers = [...state.userAnswers];
          newUserAnswers[state.currentQuestionIndex] = userAnswer;
          return { userAnswers: newUserAnswers };
        }),
      setQuestions: (questions) =>
        set(() => {
          return { questions };
        }),
      increaseQuestionIndex: () =>
        set((state) => {
          if (state.currentQuestionIndex >= state.questions.length - 1)
            return state;
          return {
            currentQuestionIndex: state.currentQuestionIndex + 1,
          };
        }),
      decreaseQuestionIndex: () =>
        set((state) => {
          if (state.currentQuestionIndex <= 0) return state;
          return {
            currentQuestionIndex: state.currentQuestionIndex - 1,
          };
        }),
      startTest: () =>
        set({
          isStarted: true,
          timeEnded: undefined,
          userAnswers: [],
          currentQuestionIndex: 0,
          timeStarted: new Date(),
          selectedAnswers: new Set(),
        }),
      stopTest: () =>
        set({
          isStarted: false,
          timeEnded: new Date(),
        }),
    }),
    { name: "TEST_STORE" }
  )
  // )
);

export function useIsComplete() {
  return useTestStore(
    (state) => state.userAnswers.length >= state.questions.length - 1
  );
}

// TODO get the isCompleted from this using derrived statek
// userAnswers.length >= questions.length - 1
