import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import List from "@mui/joy/List"
import { ROUTES } from "@/app/routes"
import { SidebarItem } from "../SidebarItem"

// icons
import BubbleChartIcon from '@mui/icons-material/BubbleChart'
import InsertChartIcon from '@mui/icons-material/InsertChart'
import StarsIcon from '@mui/icons-material/Stars'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

export const sidebarNavigationOptions = [
  {
    name: "Overview",
    icon: <InsertChartIcon />,
    route: ROUTES.DASHBOARD
  }, {
    name: "Clients",
    icon: <BubbleChartIcon />,
    route: ROUTES.CLIENTS
  }, {
    name: "Services",
    icon: <StarsIcon />,
    route: ROUTES.SERVICES
  }, {
    name: "Billing",
    icon: <ShoppingCartIcon />,
    route: ROUTES.BILLING
  }
]

export const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="flex flex-col w-52 min-h-screen bg-slate-200 justify-between">
      <div className="flex flex-col justify-between flex-grow m-5">
        <List
          size="sm"
          sx={{
            '--ListItem-radius': '6px',
            '--List-gap': '6px',
          }}
        >
          {sidebarNavigationOptions.map(option => (
            <SidebarItem
              key={option.name}
              icon={option.icon}
              name={option.name}
              onClick={() => router.push(option.route)}
              selected={pathname === option.route}
            />
          ))}
        </List>
        <Image alt="Logo" src="/logo-clientx.png" width={60} height={38.4} priority />
      </div>
    </div>
  )
}
