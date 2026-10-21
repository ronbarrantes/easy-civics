import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  ExternalLink,
  Star,
} from "lucide-react";

import { ButtonLink } from "@/components/button";
import { SampleQuestion } from "@/components/home/sample-question";
import { getCopy, LINKS } from "@/lib/copy";
import { getLanguage } from "@/lib/language";
import { getAllQuestions } from "@/lib/questions";

const SAMPLE_QUESTION_NUMBER = 2;

export default async function Home() {
  const language = await getLanguage();
  const copy = getCopy(language);
  const sample = getAllQuestions(language).find(
    (q) => q.questionNumber === SAMPLE_QUESTION_NUMBER
  )!;
  const sampleAnswer = sample.answers.find((a) => a.isCorrect)!.text;

  return (
    <div className="space-y-14">
      <div className="max-w-[40rem] space-y-4">
        <h1 className="font-display text-[1.75rem] leading-tight font-extrabold tracking-tight [font-stretch:112%] sm:text-[2rem]">
          {copy.home.title}
        </h1>
        <p className="text-quiet text-[1.15rem]">{copy.home.intro}</p>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <section className="border-accent flex flex-col items-start border-t-[6px] pt-5">
          <h2 className="font-display flex items-center gap-3 text-[1.6rem] font-extrabold [font-stretch:112%]">
            <ClipboardCheck
              aria-hidden
              className="text-accent size-8 shrink-0"
            />
            {copy.home.testTitle}
          </h2>
          <p className="mt-2 mb-6 max-w-[30rem] flex-1">{copy.home.testBody}</p>
          <ButtonLink href="/test">
            {copy.home.testButton}
            <ArrowRight aria-hidden className="size-6 shrink-0" />
          </ButtonLink>
        </section>
        <section className="border-flag flex flex-col items-start border-t-[6px] pt-5">
          <h2 className="font-display flex items-center gap-3 text-[1.6rem] font-extrabold [font-stretch:112%]">
            <BookOpen aria-hidden className="text-flag size-8 shrink-0" />
            {copy.home.studyTitle}
          </h2>
          <p className="mt-2 mb-6 max-w-[30rem] flex-1">
            {copy.home.studyBody}
          </p>
          <ButtonLink href="/study">
            {copy.home.studyButton}
            <ArrowRight aria-hidden className="size-6 shrink-0" />
          </ButtonLink>
        </section>
      </div>

      <SampleQuestion
        language={language}
        prompt={sample.prompt}
        answer={sampleAnswer}
      />

      <section className="max-w-[40rem] space-y-4">
        <h2 className="font-display text-[1.6rem] font-extrabold [font-stretch:112%]">
          {copy.home.aboutTitle}
        </h2>
        <p>{copy.home.aboutAsked}</p>
        <p>
          {copy.home.aboutChanges}{" "}
          <a
            href={LINKS.testUpdates}
            className="text-accent font-bold underline"
          >
            {copy.home.aboutChangesLink}{" "}
            <ExternalLink
              aria-hidden
              className="inline size-[1em] align-[-0.1em]"
            />
          </a>
        </p>
        <p>
          {copy.home.aboutState}{" "}
          <a
            href={LINKS.findRepresentative}
            className="text-accent font-bold underline"
          >
            {copy.home.aboutStateLink}{" "}
            <ExternalLink
              aria-hidden
              className="inline size-[1em] align-[-0.1em]"
            />
          </a>
        </p>
        <p>
          <a
            href={LINKS.officialList}
            className="text-accent font-bold underline"
          >
            {copy.home.officialLink}{" "}
            <ExternalLink
              aria-hidden
              className="inline size-[1em] align-[-0.1em]"
            />
          </a>
        </p>
      </section>

      <section className="border-accent bg-accent-wash max-w-[40rem] border-l-[6px] p-5">
        <h2 className="flex items-center gap-2 text-[1.3rem] font-bold">
          <Star
            aria-hidden
            className="text-flag size-6 shrink-0 fill-current"
          />
          {copy.home.seniorTitle}
        </h2>
        <p className="mt-2 mb-5">{copy.home.seniorBody}</p>
        <ButtonLink href="/study?list=senior" variant="secondary">
          {copy.home.seniorLink}
        </ButtonLink>
      </section>
    </div>
  );
}
