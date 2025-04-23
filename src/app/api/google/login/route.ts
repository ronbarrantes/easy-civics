import { redirect } from "next/navigation";

import { getGoogleAuthUrl } from "@/utils/google-oauth";

export async function GET() {
  const url = getGoogleAuthUrl();
  redirect(url);
}
