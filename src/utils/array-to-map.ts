export function arrayToMap<T extends { id: string }>(
  items: T[]
): Map<string, T> {
  const map = new Map<string, T>();
  items.forEach((item) => {
    map.set(item.id, item);
  });
  return map;
}

export function mapToArray<T>(map: Map<string, T>): T[] {
  return Array.from(map.values());
}
