import { SERVICE_PAYMENT_CYCLE_OPTIONS_KEYS } from "./services.constants"

export interface ServiceItem {
  _id: string
  name: string
  description: string
  basePrice: number
  paymentCycle: keyof (typeof SERVICE_PAYMENT_CYCLE_OPTIONS_KEYS)
  createdAt: string
}
