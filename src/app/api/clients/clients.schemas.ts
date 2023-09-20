import { z } from "zod"

export const newClientSchema = z.object({
  name: z.string(),
  email: z.string().email('Invalid email address.'),
})
