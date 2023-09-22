"use client"

import { FC } from "react"
import BubbleChartIcon from '@mui/icons-material/BubbleChart'
import { BreadcrumbItem, HeaderBreadcrumbs } from "@/components/HeaderBreadcrumbs"
import { PrivatePageContainer } from "@/components/PrivatePageContainer"
import { PrivatePageProps } from "@/modules/auth/withAuthorization"

const breadcrumbExtraPaths: BreadcrumbItem[] = [
  {
    href: "/clients",
    icon: () => <BubbleChartIcon />,
    label: "Clients"
  },
]
export const ClientProfilePage: FC<PrivatePageProps> = ({ data, session }) => {
  return (
    <PrivatePageContainer
      breadcrumbs={
        <HeaderBreadcrumbs
          extraPaths={breadcrumbExtraPaths}
          text={data.name}
        />
      }
      heading="Client Profile"
      userName={session.name}
    >
      <div>
        {data && JSON.stringify(data)}
      </div>
    </PrivatePageContainer>
  )
}
