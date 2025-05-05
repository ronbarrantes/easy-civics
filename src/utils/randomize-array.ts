import { pickUniqueRandomNumbers } from "./random-numbers";

export const randomizeArray = <TItem>(items: TItem[]): TItem[] => {
  if (items.length <= 1) {
    return items; // No need to randomize if the array is empty or has one element
  }

  const randomIndexes = pickUniqueRandomNumbers(
    items.length, // total
    0, // min
    items.length - 1 // max
  );

  return randomIndexes.map((idx) => items[idx]);
};
