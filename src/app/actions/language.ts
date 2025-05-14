"use server";

import { defaultSettings } from "@/config/settings";
import { Language } from "@/lib/types";
import { APP_DEFAULTS } from "@/utils/constants";
import { setCookie } from "@/utils/cookies";

export async function setLanguageServerAction(language: Language) {
  const updatedSettings = {
    ...defaultSettings,
    language,
  };

  await setCookie(APP_DEFAULTS, JSON.stringify(updatedSettings));
}
