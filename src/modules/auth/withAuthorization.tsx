import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { getServerAuthSession } from "@/modules/auth/auth.utils"
import { UserSession } from "./auth.interfaces"

export interface PrivatePageProps {
  session: UserSession
}
export async function withAuthorization (Page: (props: PrivatePageProps) => ReactNode) {
  const session = getServerAuthSession()
  const accessToken = session?.accessToken

  if (!session || !accessToken) {
    return redirect('/signin')
  }

  return <Page session={session} />
}