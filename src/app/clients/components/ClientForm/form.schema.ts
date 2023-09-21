import { z } from "zod"

export const clientFormSchema = z.object({
  name: z.string().min(1, "Please enter a name.").max(45, "Limit of characters is 45."),
  email: z.string().email("Please enter a valid email address.").max(45, "Limit of characters is 45."),
})
