"use client"

import { FC } from "react"
import { useParams } from "next/navigation"
import useSWR from "swr"
import Alert from "@mui/joy/Alert"
import BubbleChartIcon from '@mui/icons-material/BubbleChart'
import { BreadcrumbItem, HeaderBreadcrumbs } from "@/components/HeaderBreadcrumbs"
import { PrivatePageContainer } from "@/components/PrivatePageContainer"
import { PrivatePageProps } from "@/modules/auth/withAuthorization"
import { clientAPI } from "@/modules/api"
import { ClientProfile } from "../clients.interfaces"

const breadcrumbExtraPaths: BreadcrumbItem[] = [
  {
    href: "/clients",
    icon: () => <BubbleChartIcon />,
    label: "Clients"
  },
]
export const ClientProfilePage: FC<PrivatePageProps> = ({ session }) => {
  const params = useParams()
  const clientId = params?.id ?? '0'
  const { data, isLoading, error } = useSWR(
    `/v1/clients/${clientId}`,
    url => clientAPI.get<ClientProfile>(url, { accessToken: session.accessToken })
  )

  return (
    <PrivatePageContainer
      breadcrumbs={
        <HeaderBreadcrumbs
          extraPaths={breadcrumbExtraPaths}
          text={!data ? 'Loading' : data.name}
        />
      }
      heading="Client Profile"
      userName={session.name}
    >
      <div>
        {error && (
          <Alert color="danger" variant="outlined">
            Whoops! It seems the profile requested is not available.
          </Alert>
        )}
        {isLoading && <span>Loading...</span>}
        {data && JSON.stringify(data)}
      </div>
    </PrivatePageContainer>
  )
}
