"use server"

import { AUTH_SESSION_NAME } from "@/modules/auth/auth.constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  cookies().delete(AUTH_SESSION_NAME)
  redirect('/signin')
}
