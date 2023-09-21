import { FC, PropsWithChildren } from "react"
import Button from "@mui/joy/Button"
import Table from "@mui/joy/Table"
import { ListingColumns } from "./interfaces"

interface ListingProps {
  columns: ListingColumns[]
  loading?: boolean
}
export const Listing: FC<PropsWithChildren<ListingProps>> = ({
  children,
  columns,
  loading,
}) => (
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

    {loading
      ? (
        <tbody>
          <tr>
            <td colSpan={columns.length}>
              <div className="py-12 text-center">
                <Button
                  loading
                  color="neutral"
                  data-testid="listing-loader"
                  sx={{ px: 0, py: 2, boxShadow: 'none' }}
                  variant="plain"
                >
                  Loading
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      )
      : (
        <tbody>
          {children}
        </tbody>
      )
    }
  </Table>
)
