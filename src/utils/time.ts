/**
 * Formats a number of seconds into a string in the format "MM:SS".
 * @param seconds - The number of seconds to format
 * @returns
 */
export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

/*
 * Formats a number of seconds into a human-readable string in the format "Xm Ys".
 * @param seconds - The number of seconds to format
 * */
export function formatTimeHumanReadable(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
}
