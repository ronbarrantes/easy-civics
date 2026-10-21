"use client";

import { Button, ButtonLink } from "@/components/button";
import { getCopy } from "@/lib/copy";
import { Language } from "@/lib/types";

export default function Error({ reset }: { reset: () => void }) {
  const language: Language =
    typeof document !== "undefined" && document.documentElement.lang === "es"
      ? "es"
      : "en";
  const copy = getCopy(language);

  return (
    <div className="max-w-[40rem] space-y-4">
      <h1 className="font-display text-[2.2rem] font-extrabold [font-stretch:112%]">
        {copy.error.title}
      </h1>
      <p>{copy.error.body}</p>
      <div className="flex flex-wrap gap-3">
        <Button onClick={reset}>{copy.error.retry}</Button>
        <ButtonLink href="/" variant="secondary">
          {copy.notFound.home}
        </ButtonLink>
      </div>
    </div>
  );
}
