"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/button";
import { ReadAloud } from "@/components/read-aloud";
import { getCopy } from "@/lib/copy";
import { getSection, SENIOR_QUESTION_NUMBERS } from "@/lib/sections";
import {
  clearProgress,
  setStatus,
  StudyStatus,
  useStudyProgress,
} from "@/lib/study-progress";
import { Language, Question } from "@/lib/types";
import { cn } from "@/lib/utils";

export type StudyList = "all" | "learning" | "senior";

export function StudyDeck({
  language,
  questions,
  initialList,
}: {
  language: Language;
  questions: Question[];
  initialList: StudyList;
}) {
  const copy = getCopy(language);
  const progress = useStudyProgress();
  const [list, setList] = useState<StudyList>(initialList);
  const [current, setCurrent] = useState(questions[0].questionNumber);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (moved.current) heading.current?.focus();
  }, [current]);

  const lists: Record<StudyList, Question[]> = {
    all: questions,
    learning: questions.filter(
      (q) => progress[q.questionNumber] === "learning"
    ),
    senior: questions.filter((q) =>
      SENIOR_QUESTION_NUMBERS.has(q.questionNumber)
    ),
  };
  const items = lists[list];
  const found = items.findIndex((q) => q.questionNumber === current);
  const position = found === -1 ? 0 : found;
  const question = items[position];
  const known = Object.values(progress).filter((s) => s === "known").length;

  const goTo = (questionNumber: number) => {
    moved.current = true;
    setCurrent(questionNumber);
    setOpen(false);
  };

  const changeList = (next: StudyList) => {
    setList(next);
    setOpen(false);
    moved.current = false;
    const first = lists[next][0];
    if (first) setCurrent(first.questionNumber);
    window.history.replaceState(
      null,
      "",
      next === "all" ? "/study" : `/study?list=${next}`
    );
  };

  const mark = (status: StudyStatus) => {
    const after = items[position + 1] ?? items[position - 1];
    setStatus(question.questionNumber, status);
    // In "Still learning", a known question leaves the list, so move on either way
    if (items[position + 1] || (list === "learning" && status === "known")) {
      if (after) goTo(after.questionNumber);
    } else {
      setOpen(false);
    }
  };

  const reset = () => {
    if (window.confirm(copy.study.resetConfirm)) clearProgress();
  };

  const correct = question?.answers.filter((a) => a.isCorrect) ?? [];
  const status = question ? progress[question.questionNumber] : undefined;

  return (
    <div className="max-w-[44rem]">
      <h1 className="font-display text-[2.2rem] leading-tight font-extrabold [font-stretch:112%]">
        {copy.study.title}
      </h1>

      <div className="mt-4">
        <p className="font-bold">
          {copy.study.progress(known, questions.length)}
        </p>
        <div aria-hidden className="bg-wash mt-2 h-3">
          <div
            className="bg-ok h-full"
            style={{ width: `${(known / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <fieldset className="mt-8">
        <legend className="mb-2 font-bold">{copy.study.listLabel}</legend>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["all", copy.study.all],
              ["learning", copy.study.learning],
              ["senior", copy.study.senior],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className={cn(
                "min-h-[2.75rem] cursor-pointer border-2 px-4 py-2 font-bold has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-[var(--accent)]",
                list === value
                  ? "border-ink bg-ink text-paper"
                  : "border-ink hover:bg-wash"
              )}
            >
              <input
                type="radio"
                name="study-list"
                className="sr-only"
                checked={list === value}
                onChange={() => changeList(value)}
              />
              {label} (
              {mounted || value !== "learning" ? lists[value].length : "…"})
            </label>
          ))}
        </div>
      </fieldset>

      {!mounted && list === "learning" ? null : !question ? (
        <div className="border-ink mt-10 border-2 p-6">
          <h2 className="text-[1.4rem] font-bold">{copy.study.emptyTitle}</h2>
          <p className="mt-2 mb-5">{copy.study.emptyBody}</p>
          <Button variant="secondary" onClick={() => changeList("all")}>
            {copy.study.emptyButton}
          </Button>
        </div>
      ) : (
        <article className="border-ink mt-10 border-t-[6px] pt-5">
          <p className="text-quiet font-bold">
            {copy.questionOf(position + 1, items.length)}
          </p>
          <p className="text-quiet">
            {getSection(question.questionNumber, language)}
          </p>

          <h2
            ref={heading}
            tabIndex={-1}
            className="font-display mt-4 text-[2rem] leading-[1.15] font-extrabold tracking-tight [font-stretch:110%] focus:outline-none sm:text-[2.4rem]"
          >
            <span className="text-quiet">{question.questionNumber}.</span>{" "}
            {question.prompt}
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="study-answer"
            >
              {open ? copy.hideAnswer : copy.showAnswer}
            </Button>
            <ReadAloud
              language={language}
              text={
                open
                  ? `${question.prompt} ${correct.map((a) => a.text).join(". ")}`
                  : question.prompt
              }
            />
          </div>

          <div
            id="study-answer"
            hidden={!open}
            className="border-accent mt-6 border-l-[6px] pl-5"
          >
            <p className="text-quiet font-bold">
              {correct.length > 1 ? copy.answers : copy.answer}
            </p>
            <ul
              className={cn(
                "mt-1 space-y-1",
                correct.length > 1 && "list-disc pl-6"
              )}
            >
              {correct.map((a) => (
                <li key={a.id} className="text-[1.3rem] leading-snug font-bold">
                  {a.text}
                </li>
              ))}
            </ul>
            {question.explanation && (
              <p className="mt-4">{question.explanation}</p>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              variant="secondary"
              onClick={() => mark("known")}
              aria-pressed={status === "known"}
              className={cn(status === "known" && "border-ok bg-ok-wash")}
            >
              {copy.study.knewIt}
            </Button>
            <Button
              variant="secondary"
              onClick={() => mark("learning")}
              aria-pressed={status === "learning"}
              className={cn(status === "learning" && "border-bad bg-bad-wash")}
            >
              {copy.study.stillLearning}
            </Button>
          </div>
          <p className="text-quiet mt-3 min-h-[1.5em]" aria-live="polite">
            {status === "known" && copy.study.markedKnown}
            {status === "learning" && copy.study.markedLearning}
          </p>

          <nav className="border-rule mt-8 flex justify-between gap-3 border-t-2 pt-6">
            <Button
              variant="secondary"
              disabled={position === 0}
              onClick={() => goTo(items[position - 1].questionNumber)}
            >
              {copy.study.previous}
            </Button>
            <Button
              variant="secondary"
              disabled={position === items.length - 1}
              onClick={() => goTo(items[position + 1].questionNumber)}
            >
              {copy.study.next}
            </Button>
          </nav>
        </article>
      )}

      {mounted && Object.keys(progress).length > 0 && (
        <button
          type="button"
          onClick={reset}
          className="text-quiet mt-12 font-bold underline"
        >
          {copy.study.reset}
        </button>
      )}
    </div>
  );
}
