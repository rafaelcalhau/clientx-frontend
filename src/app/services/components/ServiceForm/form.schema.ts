import { z } from "zod"

export const serviceFormSchema = z.object({
  name: z.string().min(1, "Please enter a name.").max(45, "Limit of characters is 45."),
  description: z.string().min(1, "Please enter a description.").max(150, "Limit of characters is 150."),
  basePrice: z.string({ required_error: "Please enter the base price." }).min(1, "Please enter the base price."),
  paymentCycle: z.string().min(1, "Please select one payment cycle."),
})
