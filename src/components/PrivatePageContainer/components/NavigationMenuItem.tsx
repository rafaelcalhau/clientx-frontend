import ListItem from "@mui/joy/ListItem"
import ListItemButton from "@mui/joy/ListItemButton"
import ListItemContent from "@mui/joy/ListItemContent"
import ListItemDecorator from "@mui/joy/ListItemDecorator"
import { FC, ReactNode } from "react"

interface NavigationMenuItemProps {
  icon?: ReactNode
  name: string
  onClick?: () => void
  selected?: boolean
}
export const NavigationMenuItem: FC<NavigationMenuItemProps> = ({
  icon,
  name,
  onClick,
  selected,
}) => (
  <ListItem>
    <ListItemButton onClick={onClick} selected={selected}>
      {icon && (
        <ListItemDecorator>
          {icon}
        </ListItemDecorator>
      )}
      <ListItemContent>{name}</ListItemContent>
    </ListItemButton>
  </ListItem>
)