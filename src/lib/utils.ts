import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/****
 * Combines and merges class names, resolving Tailwind CSS conflicts.
 *
 * Accepts any number of class values, conditionally joins them using {@link clsx}, and merges them with {@link twMerge} to optimize Tailwind CSS class strings.
 *
 * @returns A merged string of class names with Tailwind CSS conflicts resolved.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
