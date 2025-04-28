import { parseEditedData } from "@/utils/parse";

export const getLocalStorageItem = <TData>(
  localStorageKey: string,
  defaultValue: TData
): TData => {
  const saved = localStorage.getItem(localStorageKey);
  const initial = saved && (JSON.parse(saved) as TData);

  return initial || defaultValue;
};

export const getLocalStorageItemWithFallback = <TData>(
  localStorageKey: string,
  defaultValue: TData
) => {
  const saved = localStorage.getItem(localStorageKey);
  const live = saved && JSON.parse(saved);

  if (!live) {
    return defaultValue;
  }

  for (const key in defaultValue) {
    if (live[key] === undefined) {
      live[key as keyof TData] = defaultValue[key as keyof TData];
    }
  }
  return live;
};

export const setLocalStorageItem = <
  TData extends Record<string, number | boolean | string>,
>(
  localStorageKey: string,
  data: TData
) => {
  const parsedData = parseEditedData(data);
  const stringParsedData = JSON.stringify(parsedData);

  localStorage.setItem(localStorageKey, stringParsedData);
};

export const removeLocalStorageItem = (localStorageKey: string) => {
  localStorage.removeItem(localStorageKey);
};
