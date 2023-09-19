import { FC, PropsWithChildren } from "react"
import Table from "@mui/joy/Table"
import { ListingColumns } from "./interfaces"

interface ListingProps {
  columns: ListingColumns[]
}
export const Listing: FC<PropsWithChildren<ListingProps>> = ({ children, columns }) => (
  <Table aria-label="basic table">
    <thead>
      <tr>
        {columns.map(({ component: Component, style, label }, index) => (
          <th key={`header-${index}`} style={{ ...style }} data-testid={`header-item-${index}`}>
            {Component ? <Component /> : <span aria-label={label}>{label}</span>}
          </th>
        ))}
      </tr>
    </thead>

    {children}
  </Table>
)
