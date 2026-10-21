"use client";

import { useSyncExternalStore } from "react";

import { STUDY_STORAGE_KEY } from "@/utils/constants";

export type StudyStatus = "known" | "learning";

// Question number -> status. Shared by both languages.
type Progress = Record<number, StudyStatus>;

const EMPTY: Progress = {};
let cache: Progress | null = null;
const listeners = new Set<() => void>();

const read = (): Progress => {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(STUDY_STORAGE_KEY);
    cache = raw ? (JSON.parse(raw) as Progress) : {};
  } catch {
    cache = {};
  }
  return cache;
};

const write = (next: Progress) => {
  cache = next;
  try {
    localStorage.setItem(STUDY_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be blocked; progress still works until the page closes
  }
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const setStatus = (questionNumber: number, status: StudyStatus) =>
  write({ ...read(), [questionNumber]: status });

export const markLearning = (questionNumbers: number[]) => {
  const next = { ...read() };
  questionNumbers.forEach((n) => (next[n] = "learning"));
  write(next);
};

export const clearProgress = () => write({});

export const useStudyProgress = (): Progress =>
  useSyncExternalStore(subscribe, read, () => EMPTY);
