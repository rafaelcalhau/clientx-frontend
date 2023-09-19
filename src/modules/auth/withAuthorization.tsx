import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { getServerAuthSession } from "@/modules/auth/auth.utils"
import { FetcherOptions } from "@/shared/interfaces"
import { UserSession } from "./auth.interfaces"

export interface PrivatePageProps {
  data: any
  session: UserSession
}
export async function withAuthorization (
  Page: (props: PrivatePageProps) => ReactNode,
  fetcher?: (options: FetcherOptions) => Promise<unknown>
) {
  let data = null
  const session = getServerAuthSession()
  const accessToken = session?.accessToken

  if (!session || !accessToken) {
    return redirect('/signin')
  }

  if (fetcher) {
    data = await fetcher({ accessToken })
  }

  return <Page data={data} session={session} />
}