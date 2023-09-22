import { z } from "zod"

export const attachServiceFormSchema = z.object({
  serviceId: z.string().min(1, "Please select one service."),
})
