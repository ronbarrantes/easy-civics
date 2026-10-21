import { ComponentProps } from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

const base =
  "inline-flex min-h-[3rem] items-center justify-center gap-3 px-5 py-2 text-left font-bold leading-tight disabled:cursor-not-allowed disabled:border-quiet disabled:bg-paper disabled:text-quiet";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink border-2 border-accent hover:bg-ink hover:border-ink hover:text-paper",
  secondary: "border-2 border-ink text-ink hover:bg-wash",
};

export const buttonClass = (variant: Variant = "primary", className?: string) =>
  cn(base, variants[variant], className);

export function Button({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button
      type="button"
      className={buttonClass(variant, className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}
