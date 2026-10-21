"use client";

import { House, RotateCcw, TriangleAlert } from "lucide-react";

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
      <h1 className="font-display flex items-center gap-3 text-[2.2rem] font-extrabold [font-stretch:112%]">
        <TriangleAlert aria-hidden className="text-bad size-10 shrink-0" />
        {copy.error.title}
      </h1>
      <p>{copy.error.body}</p>
      <div className="flex flex-wrap gap-3">
        <Button onClick={reset}>
          <RotateCcw aria-hidden className="size-6 shrink-0" />
          {copy.error.retry}
        </Button>
        <ButtonLink href="/" variant="secondary">
          <House aria-hidden className="size-6 shrink-0" />
          {copy.notFound.home}
        </ButtonLink>
      </div>
    </div>
  );
}
