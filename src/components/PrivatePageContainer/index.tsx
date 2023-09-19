import { FC, PropsWithChildren, ReactNode } from "react"
import { CssBaseline, CssVarsProvider } from "@mui/joy"
import { UserSession } from "@/modules/auth/auth.interfaces"
import { getFirstName } from "@/shared/utils/getFirstName"
import { theme } from "@/theme/default"
import { Sidebar } from "./components/Sidebar"
import { UserMenu } from "./components/UserMenu"

interface PrivatePageContainerProps {
  breadcrumbs: ReactNode
  heading: string
  session: UserSession
}
export const PrivatePageContainer: FC<PropsWithChildren<PrivatePageContainerProps>> = ({
  breadcrumbs,
  children,
  heading,
  session,
}) => {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />

      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex flex-col flex-grow min-h-screen">
          <div className="flex border-solid border-0 border-b border-slate-200 p-4 items-center justify-between">
            {breadcrumbs}
            <UserMenu userName={getFirstName(session.name)} />
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
