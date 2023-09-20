import { z } from "zod"

export const newClientDto = z.object({
  name: z.string(),
  email: z.string().email('Invalid email address.'),
})
