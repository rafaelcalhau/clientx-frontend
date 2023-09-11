import Head from "next/head"
import { FC, PropsWithChildren } from "react"

interface PageContainerProps {
  title: string
}
export const PageContainer: FC<PropsWithChildren<PageContainerProps>> = ({ children, title }) => (
  <div className="flex min-h-screen flex-col items-center justify-center">
    <Head>
      <title>ClientX - {title}</title>
    </Head>

    {children}
  </div>
)
