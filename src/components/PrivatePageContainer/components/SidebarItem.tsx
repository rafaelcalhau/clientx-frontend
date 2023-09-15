import { FC, ReactNode } from "react"
import ListItem from "@mui/joy/ListItem"
import ListItemButton from "@mui/joy/ListItemButton"
import ListItemContent from "@mui/joy/ListItemContent"
import ListItemDecorator from "@mui/joy/ListItemDecorator"

interface SidebarItemProps {
  icon: ReactNode
  name: string
  onClick: () => void
  selected?: boolean
}
export const SidebarItem: FC<SidebarItemProps> = ({
  icon,
  name,
  onClick,
  selected
}) => (
  <ListItem data-testid={`sidebar-item-${name.toLowerCase()}`}>
    <ListItemButton
      onClick={onClick}
      selected={selected}
    >
      <ListItemDecorator>
        {icon}
      </ListItemDecorator>
      <ListItemContent data-testid="sidebar-item-name">
        {name}
      </ListItemContent>
    </ListItemButton>
  </ListItem>
)
