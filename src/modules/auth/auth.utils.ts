import type { NextApiRequest } from "next";
import { cookies } from "next/headers";
import { AUTH_SESSION_NAME } from "./auth.constants";
import type { AuthCookieSession } from "./auth.interfaces";

export const getServerAuthSession = (): AuthCookieSession | null => {
  const sessionCookie = cookies().get(AUTH_SESSION_NAME)
  return sessionCookie ? JSON.parse(sessionCookie.value) : null;
};

export const getRequestAuthSession = async (req: NextApiRequest): Promise<AuthCookieSession | null> => {
  const sessionCookie = req.cookies[AUTH_SESSION_NAME] ?? null
  return sessionCookie ? JSON.parse(sessionCookie) : null;
};

