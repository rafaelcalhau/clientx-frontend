import { CSSProperties, ReactNode } from "react"

export interface ListingColumns {
  component?: () => ReactNode
  label?: string
  style?: CSSProperties
}