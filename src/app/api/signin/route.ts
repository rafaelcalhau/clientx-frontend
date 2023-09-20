import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { clientAPI } from "@/modules/api"
import { AUTH_SESSION_NAME } from "@/modules/auth/auth.constants"
import { APIRoutes } from "@/shared/api.routes"
import { signInCredentialSchema } from "./signin.schemas"

const isProd = process.env.NODE_ENV === 'production'
export async function POST(req: NextRequest) {
  const body = await req.json()

  try {
    const data = signInCredentialSchema.parse(body)
    const signin = await clientAPI.post(APIRoutes.signin, data)

    if (signin?.message) {
      return NextResponse.json(signin, { status: 401 })
    } else if (signin?.id) {
      cookies().set({
        name: AUTH_SESSION_NAME,
        value: JSON.stringify(signin),
        maxAge: 86400,
        httpOnly: true,
        secure: isProd,
        path: '/'
      })
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Sign In is unavailable at this moment.'
      }, { status: 503 })
    }
  } catch (error) {
    console.log({ error });
    return NextResponse.json({
      message: error instanceof Error ? error.message : error
    }, { status: 500 })
  }
}
