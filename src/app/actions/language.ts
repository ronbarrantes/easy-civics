"use server";
import { revalidatePath } from "next/cache";

import { defaultSettings } from "@/config/settings";
import { Language } from "@/lib/types";
import { APP_DEFAULTS } from "@/utils/constants";
import { getCookie, setCookie } from "@/utils/cookies";
import { tryCatch } from "@/utils/try-catch";

export async function setLanguageServerAction(language: Language) {
  const updatedSettings = {
    ...defaultSettings,
    language,
  };

  await setCookie(APP_DEFAULTS, JSON.stringify(updatedSettings));
  revalidatePath("/");
}

export async function getLanguageServerAction(): Promise<Language> {
  const { data, error } = await tryCatch(getCookie(APP_DEFAULTS));

  if (error) return "en";
  if (!data) return "en";
  const cookies = JSON.parse(data.value);

  return cookies.language;
}
