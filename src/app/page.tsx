import { redirect } from "next/navigation"
import { getAuthSession } from "./signin/signin.utils"

export default async function Home () {
  const session = getAuthSession()
  if (!session) return redirect('/signin')

  return redirect('/dashboard')
}
