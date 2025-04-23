import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

import { api } from "@/trpc/server";
import { tryCatch } from "@/utils/try-catch";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code)
    return NextResponse.json({ error: "Invalid request: Missing code" });

  const { data, error } = await tryCatch(api.youtube.handleRedirect({ code }));
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

  // TODO: handle the errors a little better, maybe with a toast

  console.info("Redirect handled successfully");

  // Redirect to the dashboard after successful processing
  return redirect("/connect");
}
