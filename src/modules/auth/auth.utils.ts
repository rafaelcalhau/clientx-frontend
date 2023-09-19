import { cookies } from "next/headers";
import { AUTH_SESSION_NAME } from "./auth.constants";
import type { UserSession } from "./auth.interfaces";

export const getServerAuthSession = (): UserSession | null => {
  const sessionCookie = cookies().get(AUTH_SESSION_NAME)
  return sessionCookie ? JSON.parse(sessionCookie.value) : null;
};
