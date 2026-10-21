import { cookies } from "next/headers";

import { Language } from "@/lib/types";
import { LANGUAGE_COOKIE } from "@/utils/constants";

export const getLanguage = async (): Promise<Language> => {
  const cookieStore = await cookies();
  return cookieStore.get(LANGUAGE_COOKIE)?.value === "es" ? "es" : "en";
};
