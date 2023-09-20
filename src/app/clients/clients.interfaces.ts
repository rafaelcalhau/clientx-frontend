import { Invoice } from "../billing/billing.interface"
import { ServiceItem } from "../services/services.interface"

export interface ClientListItem {
  _id: string
  name: string
  email: string
  createdAt: string
}

export interface ClientProfile {
  _id: string
  name: string
  email: string
  activeServices: ServiceItem[]
  pendingInvoices: Invoice[]
  createdAt: string
}
