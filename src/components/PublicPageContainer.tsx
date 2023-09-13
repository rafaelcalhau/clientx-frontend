import { FC, PropsWithChildren } from "react"
import { CssBaseline, CssVarsProvider } from "@mui/joy"
import { theme } from "@/theme/default"

interface PublicPageContainerProps {
  title: string
}
export const PublicPageContainer: FC<PropsWithChildren<PublicPageContainerProps>> = ({ children, title }) => (
  <CssVarsProvider theme={theme}>
    <CssBaseline />
    <div className="flex min-h-screen flex-col items-center justify-center">
      {children}
    </div>
  </CssVarsProvider>
)
