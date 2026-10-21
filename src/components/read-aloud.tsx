"use client";

import { useEffect, useState } from "react";

import { Volume2 } from "lucide-react";

import { Button } from "@/components/button";
import { getCopy } from "@/lib/copy";
import { Language } from "@/lib/types";

const VOICE_LANG: Record<Language, string> = { en: "en-US", es: "es-US" };

export function ReadAloud({
  text,
  language,
}: {
  text: string;
  language: Language;
}) {
  const copy = getCopy(language);
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setSupported("speechSynthesis" in window);
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  // Stop when the text changes (next question, answer revealed)
  useEffect(() => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [text]);

  if (!supported) return null;

  const toggle = () => {
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = VOICE_LANG[language];
    utterance.rate = 0.85;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    synth.cancel();
    synth.speak(utterance);
    setSpeaking(true);
  };

  return (
    <Button variant="secondary" onClick={toggle} aria-pressed={speaking}>
      <Volume2 aria-hidden className="size-6 shrink-0" />
      {speaking ? copy.stopReading : copy.readAloud}
    </Button>
  );
}
