export const parseValue = <TValue extends number | boolean | string>(
  value: TValue
): TValue | number | boolean => {
  if (typeof value === "number") return value;
  if (typeof value === "boolean") return value;
  if (value === "") return value as unknown as TValue;
  if (value === "true") return true as unknown as TValue;
  if (value === "false") return false as unknown as TValue;
  if (typeof value === "string" && !isNaN(Number(value))) {
    return (value.includes(".")
      ? parseFloat(value)
      : parseInt(value, 10)) as unknown as TValue;
  }
  return value;
};

export const parseEditedData = <
  TData extends Record<string, number | boolean | string>,
>(
  data: TData
): { [Key in keyof TData]: ReturnType<typeof parseValue> } => {
  const parsedData: { [Key in keyof TData]?: ReturnType<typeof parseValue> } =
    {};
  for (const [key, value] of Object.entries(data)) {
    parsedData[key as keyof TData] = parseValue(value);
  }
  return parsedData as { [Key in keyof TData]: ReturnType<typeof parseValue> };
};
