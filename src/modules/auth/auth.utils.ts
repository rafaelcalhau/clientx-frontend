import { cookies } from "next/headers"
import { NextRequest } from "next/server"
import { AUTH_SESSION_NAME } from "./auth.constants"
import type { UserSession } from "./auth.interfaces"

export const getServerAuthSession = (): UserSession | null => {
  const sessionCookie = cookies().get(AUTH_SESSION_NAME)
  return sessionCookie ? JSON.parse(sessionCookie.value) : null;
};

export const getCookieSessionToken = (req: NextRequest): string | null => {
  const session = req.cookies.get(AUTH_SESSION_NAME)
    const accessToken =  session?.value
      ? JSON.parse(session?.value).accessToken
      : null
  return accessToken
}
