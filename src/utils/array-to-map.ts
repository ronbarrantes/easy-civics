/**
 * Converts an array of objects with string `id` properties into a map keyed by those `id` values.
 *
 * @param items - Array of objects, each containing a unique string `id` property.
 * @returns A map where each key is the `id` from an object in {@link items}, and each value is the corresponding object.
 */
export function arrayToMap<T extends { id: string }>(
  items: T[]
): Map<string, T> {
  const map = new Map<string, T>();
  items.forEach((item) => {
    map.set(item.id, item);
  });
  return map;
}

/**
 * Converts a map's values into an array.
 *
 * @returns An array containing all values from the input map.
 */
export function mapToArray<T>(map: Map<string, T>): T[] {
  return Array.from(map.values());
}
