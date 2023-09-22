import { z } from "zod"

export const attachServiceDto = z.object({
  clientId: z.coerce.string(),
  serviceId: z.coerce.string(),
})
