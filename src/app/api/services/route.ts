import { NextRequest, NextResponse } from "next/server"
import { clientAPI } from "@/modules/api"
import { getCookieSessionToken } from "@/modules/auth/auth.utils"

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const accessToken = getCookieSessionToken(req)

    if (accessToken) {
      const data = await clientAPI.get('/v1/services', { accessToken })
      return NextResponse.json(data)
    } else {
      return NextResponse.json([])
    }
  } catch (error) {
    return NextResponse.json({ message: error })
  }
}
