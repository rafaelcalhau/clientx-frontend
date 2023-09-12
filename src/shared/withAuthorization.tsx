import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { getServerAuthSession } from "@/modules/auth/auth.utils"

export async function withAuthorization (Page: () => ReactNode) {
  const session = getServerAuthSession()
  const accessToken = session?.accessToken

  if (!session || !accessToken) {
    return redirect('/signin')
  }

  return <Page />
}