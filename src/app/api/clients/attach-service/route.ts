import { NextRequest, NextResponse } from "next/server"
import { clientAPI } from "@/modules/api"
import { getCookieSessionToken } from "@/modules/auth/auth.utils"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { clientId, serviceId }  = await req.json()
    const accessToken = getCookieSessionToken(req)
    if (accessToken) {
      const data = await clientAPI.post(
        `/v1/clients/${clientId}/attach-service`,
        { serviceId },
        { accessToken }
      )
      return NextResponse.json(data)
    } else {
      return redirect('/login')
    }
  } catch (error) {
    return NextResponse.json({ message: error })
  }
}
