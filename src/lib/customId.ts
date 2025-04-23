import { customAlphabet } from "nanoid";
const cleanAlphabet = "abcdefghjkmnpqrtuvwxyABCDEFGHJKMNPQRTUVWXY0123456789";
export const generateId = customAlphabet(cleanAlphabet, 6);
