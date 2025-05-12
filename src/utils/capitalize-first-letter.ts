export const capitalizeFirstLetter = (s: string): string => {
  // Optionally guard empty string: if (s.length === 0) return s;
  const hasParenAtBeginning = s[0] === "(";

  if (hasParenAtBeginning) {
    const firstLetter = s.charAt(1).toUpperCase();
    return s.charAt(0) + firstLetter + s.slice(2);
  }

  const res = s.charAt(0).toUpperCase() + s.slice(1);
  return res;
};
