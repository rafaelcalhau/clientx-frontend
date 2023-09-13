import { FC, PropsWithChildren, ReactNode } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { CssBaseline, CssVarsProvider } from "@mui/joy"
import Button from "@mui/joy/Button"
import { logout } from "@/app/actions"
import List from "@mui/joy/List"
import ListItem from "@mui/joy/ListItem"
import ListItemButton from "@mui/joy/ListItemButton"
import ListItemContent from "@mui/joy/ListItemContent"
import ListItemDecorator from "@mui/joy/ListItemDecorator"
import { theme } from "@/theme/default"
import { NavigationMenuItem } from "./components/NavigationMenuItem"

// icons
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import StarsIcon from '@mui/icons-material/Stars';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

interface PrivatePageContainerProps {
  breadcrumbs: ReactNode
  heading: string
}
export const PrivatePageContainer: FC<PropsWithChildren<PrivatePageContainerProps>> = ({
  breadcrumbs,
  children,
  heading,
}) => {
  const router = useRouter()

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <div className="flex min-h-screen">
        <div className="flex flex-col w-52 min-h-screen bg-slate-200 justify-between">
          <div className="flex flex-col justify-between flex-grow m-5">
            <List
              size="sm"
              sx={{
                '--ListItem-radius': '6px',
                '--List-gap': '6px',
              }}
            >
              <NavigationMenuItem
                selected
                name="Overview"
                icon={<BubbleChartIcon />}
                onClick={() => router.push('/dashboard')}
              />
              <NavigationMenuItem
                name="Analytics"
                icon={<InsertChartIcon />}
                onClick={() => router.push('/dashboard')}
              />
              <NavigationMenuItem
                name="Orders"
                icon={<ShoppingCartIcon />}
                onClick={() => router.push('/dashboard')}
              />
              <NavigationMenuItem
                name="Reports"
                icon={<StarsIcon />}
                onClick={() => router.push('/dashboard')}
              />
              <NavigationMenuItem
                name="Settings"
                icon={<AccountBoxIcon />}
                onClick={() => router.push('/dashboard')}
              />
            </List>

            <Image alt="Logo" src="/logo-clientx.png" width={60} height={38.4} priority />
          </div>
        </div>

        <div className="flex flex-col flex-grow min-h-screen">
          <div className="flex border-solid border-0 border-b border-slate-200 p-4 items-center justify-between">
            {breadcrumbs}
            <form action={logout}>
              <Button variant="plain" type="submit" size="sm">Logout</Button>
            </form>
          </div>

          <div className="container mx-auto">
            <div className="flex flex-col m-5">
              <h2 data-testid="page-heading" className="my-3">{heading}</h2>

              {children}
            </div>
          </div>
        </div>
      </div>
    </CssVarsProvider>
    
  )
}
