import { z } from "zod"

export const clientDto = z.object({
  name: z.coerce.string(),
  email: z.coerce.string(),
})
