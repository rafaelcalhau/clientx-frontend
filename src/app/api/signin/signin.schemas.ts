import { z } from "zod"

export const signInCredentialSchema = z.object({
  username: z.string(),
  password: z.string(),
})
