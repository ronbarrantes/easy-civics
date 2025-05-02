import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container m-auto min-h-fit border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
        <p className="text-muted-foreground text-center text-sm leading-loose md:text-left">
          © {currentYear} US Citizenship Test Practice. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/about" className="text-muted-foreground hover:underline">
            About
          </Link>
          <Link
            href="/privacy"
            className="text-muted-foreground hover:underline"
          >
            Privacy
          </Link>
          <Link href="/terms" className="text-muted-foreground hover:underline">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
