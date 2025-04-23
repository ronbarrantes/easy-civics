import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

import { api } from "@/trpc/server";
import { facebookAuthState } from "@/utils/constants";
import { deleteCookie, getCookie } from "@/utils/cookies";
import { tryCatch } from "@/utils/try-catch";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const facebookCookie = await getCookie(facebookAuthState);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code)
    return NextResponse.json({ error: "Invalid request: Missing code" });

  if (!facebookCookie?.value)
    return NextResponse.json({
      error: "Invalid request: Missing cookie state",
    });

  if (state !== facebookCookie.value)
    return NextResponse.json({
      error: "Invalid request: cookie does not match",
    });

  deleteCookie(facebookAuthState);

  const { data, error } = await tryCatch(api.facebook.handleRedirect({ code }));

  if (error) {
    console.error("Error during handleRedirect:", error);
    return NextResponse.json({
      error: `Failed to handle redirect: ${error.message}`,
    });
  }
  if (!data) {
    console.error("No data returned from handleRedirect");
    return NextResponse.json({ error: "Failed to process redirect" });
  }

  // Redirect to the dashboard after successful processing
  return redirect("/connect");
}
