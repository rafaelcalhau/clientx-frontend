export interface Invoice {
  _id: string
  clientId: string
  serviceId: string
  description: string
  value: number
  discount: number
  expiresAt: string
  createdAt: string
}
