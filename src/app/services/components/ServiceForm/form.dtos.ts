import { z } from "zod"

export const serviceRequestDto = z.object({
  name: z.coerce.string(),
  description: z.coerce.string(),
  basePrice: z.coerce.number(),
  paymentCycle: z.coerce.string(),
})

export const serviceFormDto = z.object({
  name: z.coerce.string(),
  description: z.coerce.string(),
  basePrice: z.coerce.string(),
  paymentCycle: z.coerce.string(),
})
