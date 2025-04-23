import { redirect } from "next/navigation";

import { randomBytes } from "crypto";

import { facebookAuthState } from "@/utils/constants";
import { setCookie } from "@/utils/cookies";
import { getFacebookAuthUrl } from "@/utils/facebook-oauth";

export async function GET() {
  const state = randomBytes(16).toString("hex");

  await setCookie(facebookAuthState, state, {
    maxAge: 60 * 15, // 15 mins
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  const url = getFacebookAuthUrl(state);
  redirect(url.toString());
}
