import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"
import { clientAPI } from "@/modules/api"
import { AUTH_SESSION_NAME } from "@/modules/auth/auth.constants"
import { getCookieSessionToken } from "@/modules/auth/auth.utils"
import { DEFAULT_LISTING_ITEMS_LENGTH } from "@/shared/constants"
import { newClientDto } from "./dto/newClientDto"

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

export async function POST(req: NextRequest) {
  try {
    const accessToken = getCookieSessionToken(req)

    if (accessToken) {
      const requestBody = await req.json()
      const body = newClientDto.parse(requestBody)
      const data = await clientAPI.post('/v1/clients', body, { accessToken })
      return NextResponse.json(data)
    } else {
      return NextResponse.json({ error: true, message: 'Access token not found' })
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.issues.map(issue => issue.message).join('; ') })
    }

    return NextResponse.json({ message: error })
  }
}