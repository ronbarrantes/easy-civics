"use client";

import { useState } from "react";

import { Eye, EyeOff, MessageCircleQuestion } from "lucide-react";

import { Button } from "@/components/button";
import { ReadAloud } from "@/components/read-aloud";
import { getCopy } from "@/lib/copy";
import { Language } from "@/lib/types";

export function SampleQuestion({
  language,
  prompt,
  answer,
}: {
  language: Language;
  prompt: string;
  answer: string;
}) {
  const copy = getCopy(language);
  const [open, setOpen] = useState(false);

  return (
    <section
      aria-labelledby="sample-question"
      className="bg-wash border-accent border-t-[6px] px-5 py-6 sm:px-8 sm:py-8"
    >
      <p className="text-quiet flex items-center gap-2 font-bold">
        <MessageCircleQuestion aria-hidden className="size-6 shrink-0" />
        {copy.home.demoLabel}
      </p>
      <h2
        id="sample-question"
        className="font-display mt-2 max-w-[22ch] text-[2.2rem] leading-[1.1] font-extrabold tracking-tight [font-stretch:112%] sm:text-[2.8rem]"
      >
        {prompt}
      </h2>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="sample-answer"
        >
          {open ? (
            <EyeOff aria-hidden className="size-6 shrink-0" />
          ) : (
            <Eye aria-hidden className="size-6 shrink-0" />
          )}
          {open ? copy.hideAnswer : copy.showAnswer}
        </Button>
        <ReadAloud
          language={language}
          text={open ? `${prompt} ${answer}` : prompt}
        />
      </div>
      <div
        id="sample-answer"
        hidden={!open}
        className="border-flag mt-6 border-l-[6px] pl-4"
      >
        <p className="text-quiet">{copy.answer}</p>
        <p className="text-[1.6rem] leading-snug font-bold">{answer}</p>
      </div>
    </section>
  );
}
