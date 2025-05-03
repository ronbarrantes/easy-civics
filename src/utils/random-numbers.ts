export function pickUniqueRandomNumbers(
  count: number,
  min: number,
  max: number
) {
  const nums = new Set<number>();
  while (nums.size < count) {
    nums.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(nums);
}
