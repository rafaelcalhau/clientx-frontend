import { cookies } from "next/headers";
import { AUTH_SESSION_NAME } from "./signin.constants";
import type { AuthCookieSession } from "./signin.interfaces";

export const getAuthSession = (): AuthCookieSession | null => {
  const sessionCookie = cookies().get(AUTH_SESSION_NAME)
  return sessionCookie ? JSON.parse(sessionCookie.value) : null;
};
