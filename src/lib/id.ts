import { customAlphabet } from "nanoid";
const cleanAlphabet = "abcdefghjkmnpqrtuvwxyABCDEFGHJKMNPQRTUVWXY0123456789";

export const generateId = (length: number = 6) => {
  const nanoid = customAlphabet(cleanAlphabet, length);
  return nanoid();
};
