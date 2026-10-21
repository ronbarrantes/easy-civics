import { ButtonLink } from "@/components/button";
import { getCopy } from "@/lib/copy";
import { getLanguage } from "@/lib/language";

export default async function NotFound() {
  const copy = getCopy(await getLanguage());

  return (
    <div className="max-w-[40rem] space-y-4">
      <h1 className="font-display text-[2.2rem] font-extrabold [font-stretch:112%]">
        {copy.notFound.title}
      </h1>
      <p>{copy.notFound.body}</p>
      <ButtonLink href="/">{copy.notFound.home}</ButtonLink>
    </div>
  );
}
