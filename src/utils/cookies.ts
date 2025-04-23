import { cookies } from "next/headers";

type CookieOptions = {
  maxAge?: number;
  path?: string;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
};

const defaultOptions: CookieOptions = {
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

export const setCookie = async (
  name: string,
  value: string,
  options: CookieOptions = {}
) => {
  const cookieStore = await cookies();
  cookieStore.set(name, value, { ...defaultOptions, ...options });
};

export const deleteCookie = async (name: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(name);
};

export const getCookie = async (name: string) => {
  const cookieStore = await cookies();
  const value = cookieStore.get(name);
  return value;
};
