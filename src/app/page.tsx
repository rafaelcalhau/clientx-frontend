import { getServerAuthSession } from "@/modules/auth/auth.utils"
import { redirect } from "next/navigation"

export default async function Home () {
  const session = getServerAuthSession()
  if (!session) return redirect('/signin')

  return redirect('/dashboard')
}
