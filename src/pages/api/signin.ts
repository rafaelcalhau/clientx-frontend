import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"

import { clientAPI } from "@/modules/api"
import { AUTH_SESSION_NAME } from "@/modules/auth/auth.constants"
import { APIRoutes } from "@/shared/api.routes"

const signInCredentialsValidator = z.object({
  username: z.string(),
  password: z.string(),
})

const isProd = process.env.NODE_ENV === 'production'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const data = signInCredentialsValidator.parse(JSON.parse(req.body))
      const signin = await clientAPI.post(APIRoutes.signin, data)

      if (signin?.message) {
        return res.status(401).json(signin)
      }

      return res
        .status(200)
        .setHeader(
          "Set-Cookie",
          `${AUTH_SESSION_NAME}=${JSON.stringify(signin)}; httpOnly=true; secure=${isProd}; maxAge=86400; path=/`
        )
        .json({ ...signin, success: true })
    } catch (error) {
      console.log({ error });
      return res.status(500).json({ message: error instanceof Error ? error.message : error })
    }
  } else {
    return res.status(405)
  }
}