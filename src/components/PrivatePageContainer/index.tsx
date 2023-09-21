import { FC, PropsWithChildren, ReactNode } from "react"
import { CssBaseline, CssVarsProvider } from "@mui/joy"
import GitHubIcon from "@mui/icons-material/GitHub"
import { getFirstName } from "@/shared/utils/getFirstName"
import { theme } from "@/theme/default"
import { Sidebar } from "./components/Sidebar"
import { UserMenu } from "./components/UserMenu"

interface PrivatePageContainerProps {
  breadcrumbs: ReactNode
  heading: string
  headingExtra?: ReactNode
  userName: string
}
export const PrivatePageContainer: FC<PropsWithChildren<PrivatePageContainerProps>> = ({
  breadcrumbs,
  children,
  heading,
  headingExtra,
  userName,
}) => {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />

      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex flex-col flex-grow min-h-screen">
          <div className="flex border-solid border-0 border-b border-slate-200 p-4 items-center justify-between">
            {breadcrumbs}
            <UserMenu userName={getFirstName(userName)} />
          </div>

          <div className="container flex flex-grow mx-auto">
            <div className="flex flex-col m-5">
              <div className="flex items-center justify-between">
                <h2 data-testid="page-heading" className="my-3">{heading}</h2>
                {headingExtra}
              </div>

              {children}
            </div>
          </div>

          <div className="flex items-center justify-end p-3 text-sm">
            <GitHubIcon sx={{ mr: 1 }} />
            <a href="https://github.com/rafaelcalhau" target="_blank" className="hover:text-blue-900">
              github.com/rafaelcalhau
            </a>
          </div>
        </div>
      </div>
    </CssVarsProvider>
  )
}
