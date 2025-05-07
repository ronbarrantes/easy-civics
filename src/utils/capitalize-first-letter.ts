export const capitalizeFirstLetter = (s: string): string => {
  const hasParenAtBeginnin = s[0] === "("; // s.indexOf("(");

  if (hasParenAtBeginnin) {
    const firstLetter = s.charAt(1).toUpperCase();
    return s.charAt(0) + firstLetter + s.slice(2);
  }

  const res = s.charAt(0).toUpperCase() + s.slice(1);
  return res;
};
