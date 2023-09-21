import { NextRequest, NextResponse } from "next/server"
import { clientAPI } from "@/modules/api"
import { getCookieSessionToken } from "@/modules/auth/auth.utils"
import { DEFAULT_LISTING_ITEMS_LENGTH } from "@/shared/constants"

export async function GET(req: NextRequest) {
  try {
    const accessToken = getCookieSessionToken(req)
    const { searchParams } = new URL(req.url)
    const limit = Number(searchParams.get('limit') ?? DEFAULT_LISTING_ITEMS_LENGTH)
    const page = Number(searchParams.get('page') ?? 1)

    if (accessToken) {
      const data = await clientAPI.get(
        `/v1/clients/?page=${page}&limit=${limit}`,
        { accessToken }
      )
      return NextResponse.json(data)
    } else {
      return NextResponse.json({ status: false, data: [] })
    }
  } catch (error) {
    return NextResponse.json({ message: error })
  }
}
