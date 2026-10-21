"use client";

import { useEffect, useRef, useState } from "react";

import {
  ArrowRight,
  Award,
  BookOpen,
  Check,
  Flag,
  Play,
  RotateCcw,
  Target,
  X,
} from "lucide-react";

import { Button, ButtonLink } from "@/components/button";
import { ReadAloud } from "@/components/read-aloud";
import { buildTest } from "@/lib/build-test";
import { getCopy } from "@/lib/copy";
import { SENIOR_QUESTION_NUMBERS } from "@/lib/sections";
import { markLearning } from "@/lib/study-progress";
import { Answer, Language, Question } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SENIOR_TEST, STANDARD_TEST } from "@/utils/constants";

type TestKind = "standard" | "senior";

type Result = {
  question: Question;
  selected: Set<string>;
  isCorrect: boolean;
};

const TESTS = { standard: STANDARD_TEST, senior: SENIOR_TEST };

const isAnswerCorrect = (question: Question, selected: Set<string>) =>
  selected.size === question.expectedNumAnswers &&
  question.answers.every((a) => !selected.has(a.id) || a.isCorrect);

const answerTexts = (answers: Answer[]) =>
  answers.map((a) => a.text).join("; ");

export function PracticeTest({
  language,
  questions: allQuestions,
}: {
  language: Language;
  questions: Question[];
}) {
  const copy = getCopy(language);
  const [kind, setKind] = useState<TestKind>("standard");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [checked, setChecked] = useState(false);
  const [limitHint, setLimitHint] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [finished, setFinished] = useState(false);
  const nextButton = useRef<HTMLButtonElement>(null);
  const questionHeading = useRef<HTMLHeadingElement>(null);
  const resultsHeading = useRef<HTMLHeadingElement>(null);

  const test = TESTS[kind];
  const question = questions[index];

  useEffect(() => {
    if (checked) nextButton.current?.focus();
  }, [checked]);

  useEffect(() => {
    if (questions.length && !checked) questionHeading.current?.focus();
  }, [questions.length, index, checked]);

  useEffect(() => {
    if (finished) resultsHeading.current?.focus();
  }, [finished]);

  const start = () => {
    const pool =
      kind === "senior"
        ? allQuestions.filter((q) =>
            SENIOR_QUESTION_NUMBERS.has(q.questionNumber)
          )
        : allQuestions;
    setQuestions(buildTest(pool, test.questions));
    setIndex(0);
    setSelected(new Set());
    setChecked(false);
    setResults([]);
    setFinished(false);
  };

  const toggle = (answerId: string) => {
    if (checked) return;
    if (question.expectedNumAnswers === 1) {
      setSelected(new Set([answerId]));
      return;
    }
    const next = new Set(selected);
    if (next.has(answerId)) {
      next.delete(answerId);
    } else if (next.size >= question.expectedNumAnswers) {
      setLimitHint(true);
      return;
    } else {
      next.add(answerId);
    }
    setLimitHint(false);
    setSelected(next);
  };

  const check = () => {
    setResults([
      ...results,
      { question, selected, isCorrect: isAnswerCorrect(question, selected) },
    ]);
    setChecked(true);
    setLimitHint(false);
  };

  const next = () => {
    if (index === questions.length - 1) {
      markLearning(
        results
          .filter((r) => !r.isCorrect)
          .map((r) => r.question.questionNumber)
      );
      setFinished(true);
      window.scrollTo(0, 0);
      return;
    }
    setIndex(index + 1);
    setSelected(new Set());
    setChecked(false);
    window.scrollTo(0, 0);
  };

  if (!questions.length) {
    return (
      <div className="max-w-[40rem] space-y-8">
        <h1 className="font-display text-[2.2rem] leading-tight font-extrabold [font-stretch:112%]">
          {copy.test.title}
        </h1>
        <fieldset className="space-y-3">
          <legend className="mb-3 text-[1.3rem] font-bold">
            {copy.test.chooseTest}
          </legend>
          {(
            [
              ["standard", copy.test.standardName, copy.test.standardBody],
              ["senior", copy.test.seniorName, copy.test.seniorBody],
            ] as const
          ).map(([value, name, body]) => (
            <Choice
              key={value}
              type="radio"
              name="test-kind"
              checked={kind === value}
              onChange={() => setKind(value)}
            >
              <span className="block font-bold">{name}</span>
              <span className="text-quiet block">{body}</span>
            </Choice>
          ))}
        </fieldset>
        <ul className="list-disc space-y-1 pl-6">
          {copy.test.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
        <Button onClick={start}>
          <Play aria-hidden className="size-6 shrink-0" />
          {copy.test.start}
        </Button>
      </div>
    );
  }

  if (finished) {
    const right = results.filter((r) => r.isCorrect).length;
    const passed = right >= test.toPass;
    const missed = results.length - right;

    return (
      <div className="space-y-10">
        <div
          className={cn(
            "border-l-[10px] px-5 py-6",
            passed ? "border-ok bg-ok-wash" : "border-bad bg-bad-wash"
          )}
        >
          <h1
            ref={resultsHeading}
            tabIndex={-1}
            className="font-display flex items-center gap-3 text-[2.8rem] leading-none font-extrabold [font-stretch:112%] focus:outline-none"
          >
            {passed ? (
              <Award aria-hidden className="text-ok size-12 shrink-0" />
            ) : (
              <Target aria-hidden className="text-bad size-12 shrink-0" />
            )}
            {passed ? copy.test.passed : copy.test.notYet}
          </h1>
          <p className="mt-3 text-[1.3rem] font-bold">
            {copy.test.score(right, results.length, test.toPass)}
          </p>
          {missed > 0 && <p className="mt-2">{copy.test.missedSaved}</p>}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={start}>
            <RotateCcw aria-hidden className="size-6 shrink-0" />
            {copy.test.again}
          </Button>
          {missed > 0 && (
            <ButtonLink href="/study?list=learning" variant="secondary">
              <BookOpen aria-hidden className="size-6 shrink-0" />
              {copy.test.studyMissed}
            </ButtonLink>
          )}
        </div>

        <section className="max-w-[44rem]">
          <h2 className="font-display mb-2 text-[1.6rem] font-extrabold [font-stretch:112%]">
            {copy.test.yourAnswers}
          </h2>
          <ol>
            {results.map((result) => {
              const chosen = result.question.answers.filter((a) =>
                result.selected.has(a.id)
              );
              const correct = result.question.answers.filter(
                (a) => a.isCorrect
              );
              return (
                <li
                  key={result.question.id}
                  className="border-rule border-b-2 py-5"
                >
                  <p
                    className={cn(
                      "flex items-center gap-2 font-bold",
                      result.isCorrect ? "text-ok" : "text-bad"
                    )}
                  >
                    {result.isCorrect ? (
                      <Check aria-hidden className="size-6" />
                    ) : (
                      <X aria-hidden className="size-6" />
                    )}
                    {result.isCorrect ? copy.test.right : copy.test.wrong}
                  </p>
                  <p className="mt-1 text-[1.15rem] font-bold">
                    {result.question.questionNumber}. {result.question.prompt}
                  </p>
                  <p className="mt-2">
                    <span className="text-quiet">{copy.test.youAnswered}</span>{" "}
                    {answerTexts(chosen)}
                  </p>
                  {!result.isCorrect && (
                    <p>
                      <span className="text-quiet">
                        {correct.length > 1
                          ? copy.test.rightAnswers
                          : copy.test.rightAnswer}
                      </span>{" "}
                      {answerTexts(correct)}
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      </div>
    );
  }

  const multi = question.expectedNumAnswers > 1;
  const rightSoFar = results.filter((r) => r.isCorrect).length;
  const lastResult = checked ? results[results.length - 1] : null;

  return (
    <div className="max-w-[44rem]">
      <div className="mb-6">
        <div className="flex flex-wrap justify-between gap-x-6 font-bold">
          <p>{copy.questionOf(index + 1, questions.length)}</p>
          <p className="text-quiet">{copy.test.soFar(rightSoFar)}</p>
        </div>
        <ol
          aria-hidden
          className="mt-3 grid gap-1"
          style={{ gridTemplateColumns: `repeat(${questions.length}, 1fr)` }}
        >
          {questions.map((q, i) => (
            <li
              key={q.id}
              className={cn(
                "h-3",
                i < results.length
                  ? results[i].isCorrect
                    ? "bg-ok"
                    : "bg-bad"
                  : i === index
                    ? "bg-accent"
                    : "bg-wash"
              )}
            />
          ))}
        </ol>
      </div>

      <h1
        ref={questionHeading}
        tabIndex={-1}
        className="font-display text-[2rem] leading-[1.15] font-extrabold tracking-tight [font-stretch:110%] focus:outline-none sm:text-[2.4rem]"
      >
        {question.prompt}
      </h1>

      <div className="mt-5">
        <ReadAloud language={language} text={question.prompt} />
      </div>

      <fieldset className="mt-8" disabled={checked}>
        <legend className="mb-3 font-bold">
          {multi
            ? copy.test.chooseMany(question.expectedNumAnswers)
            : copy.test.chooseOne}
        </legend>
        <div className="space-y-3">
          {question.answers.map((answer) => {
            const isSelected = selected.has(answer.id);
            const state = !checked
              ? undefined
              : answer.isCorrect
                ? "right"
                : isSelected
                  ? "wrong"
                  : "muted";
            return (
              <Choice
                key={answer.id}
                type={multi ? "checkbox" : "radio"}
                name={question.id}
                checked={isSelected}
                onChange={() => toggle(answer.id)}
                state={state}
              >
                <span className="block">{answer.text}</span>
                {state === "right" && (
                  <span className="text-ok block font-bold">
                    {copy.test.rightAnswerLabel}
                    {isSelected &&
                      ` (${copy.test.yourAnswerLabel.toLowerCase()})`}
                  </span>
                )}
                {state === "wrong" && (
                  <span className="text-bad block font-bold">
                    {copy.test.yourAnswerLabel}
                  </span>
                )}
              </Choice>
            );
          })}
        </div>
      </fieldset>

      <p aria-live="polite" className="mt-3 min-h-[1.5em] font-bold">
        {limitHint && copy.test.limitReached(question.expectedNumAnswers)}
      </p>

      <div aria-live="polite">
        {lastResult && (
          <div
            className={cn(
              "mt-4 border-l-[8px] px-5 py-4",
              lastResult.isCorrect
                ? "border-ok bg-ok-wash"
                : "border-bad bg-bad-wash"
            )}
          >
            <p className="text-[1.4rem] font-bold">
              {lastResult.isCorrect ? copy.test.correct : copy.test.incorrect}
            </p>
            {question.explanation && (
              <p className="mt-2">{question.explanation}</p>
            )}
          </div>
        )}
      </div>

      <div className="mt-6">
        {checked ? (
          <Button ref={nextButton} onClick={next}>
            {index === questions.length - 1 ? copy.test.finish : copy.test.next}
            {index === questions.length - 1 ? (
              <Flag aria-hidden className="size-6 shrink-0" />
            ) : (
              <ArrowRight aria-hidden className="size-6 shrink-0" />
            )}
          </Button>
        ) : (
          <Button
            onClick={check}
            disabled={selected.size !== question.expectedNumAnswers}
          >
            <Check aria-hidden className="size-6 shrink-0" />
            {copy.test.check}
          </Button>
        )}
      </div>
    </div>
  );
}

type ChoiceState = "right" | "wrong" | "muted";

function Choice({
  type,
  name,
  checked,
  onChange,
  state,
  children,
}: {
  type: "radio" | "checkbox";
  name: string;
  checked: boolean;
  onChange: () => void;
  state?: ChoiceState;
  children: React.ReactNode;
}) {
  return (
    <label
      className={cn(
        "flex min-h-[3.5rem] cursor-pointer items-start gap-4 border-2 px-4 py-3 has-[:disabled]:cursor-default has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-[var(--accent)]",
        !state &&
          (checked
            ? "border-accent bg-accent-wash"
            : "border-ink hover:bg-wash"),
        state === "right" && "border-ok bg-ok-wash",
        state === "wrong" && "border-bad bg-bad-wash",
        state === "muted" && "border-quiet text-quiet"
      )}
    >
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        aria-hidden
        className={cn(
          "mt-0.5 flex size-7 shrink-0 items-center justify-center border-2",
          checked ? "border-accent bg-accent text-accent-ink" : "border-ink",
          state === "right" && "border-ok",
          state === "wrong" && "border-bad",
          state === "right" && checked && "bg-ok text-paper",
          state === "wrong" && checked && "bg-bad text-paper"
        )}
      >
        {checked && <Check className="size-5" strokeWidth={3} />}
      </span>
      <span className="flex-1 text-[1.1rem] leading-snug">{children}</span>
    </label>
  );
}
