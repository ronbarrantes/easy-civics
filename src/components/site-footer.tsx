import { getCopy, LINKS } from "@/lib/copy";
import { Language } from "@/lib/types";

export function SiteFooter({ language }: { language: Language }) {
  const copy = getCopy(language);

  return (
    <footer className="border-rule mt-16 border-t-2">
      <div className="text-quiet mx-auto max-w-5xl space-y-2 px-4 py-8">
        <p className="max-w-[38rem]">{copy.footer.notOfficial}</p>
        <p className="max-w-[38rem]">{copy.footer.privacy}</p>
        <p className="max-w-[38rem]">
          <a href={LINKS.officialList} className="text-ink underline">
            {copy.footer.source}
          </a>
        </p>
        <p>
          <a href={LINKS.author} className="text-ink underline">
            {copy.footer.madeBy}
          </a>
        </p>
      </div>
    </footer>
  );
}
