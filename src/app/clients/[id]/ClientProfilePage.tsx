"use client"

import { FC } from "react"
import Avatar from "@mui/joy/Avatar"
import BubbleChartIcon from '@mui/icons-material/BubbleChart'
import EmailIcon from '@mui/icons-material/Email'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote'
import StarsIcon from '@mui/icons-material/Stars'
import { BreadcrumbItem, HeaderBreadcrumbs } from "@/components/HeaderBreadcrumbs"
import { PrivatePageContainer } from "@/components/PrivatePageContainer"
import { PrivatePageProps } from "@/modules/auth/withAuthorization"
import { ClientProfile } from "../clients.interfaces"

const breadcrumbExtraPaths: BreadcrumbItem[] = [
  {
    href: "/clients",
    icon: () => <BubbleChartIcon />,
    label: "Clients"
  },
]

interface ClientProfilePageProps extends PrivatePageProps {
  data: ClientProfile
}
export const ClientProfilePage: FC<ClientProfilePageProps> = ({ data, session }) => {
  return (
    <PrivatePageContainer
      breadcrumbs={
        <HeaderBreadcrumbs
          extraPaths={breadcrumbExtraPaths}
          text={data.name}
        />
      }
      heading={data.name}
      userName={session.name}
    >
      <div className="flex justify-between">
        <div className="flex flex-col flex-grow mr-6 gap-3">
          <div className="flex items-center">
            <EmailIcon />
            <span className="text-sm ml-3">{data.email}</span>
          </div>

          <div className="flex items-center">
            <StarsIcon />
            <span className="text-sm ml-3">
              Active Services: {data.activeServices.length}
            </span>
          </div>

          <div className="flex items-center">
            <RequestQuoteIcon />
            <span className="text-sm ml-3">
              Pending invoices: {data.pendingInvoices.length}
            </span>
          </div>
        </div>

        <Avatar sx={{ width: 120, height: 120 }} />
      </div>
    </PrivatePageContainer>
  )
}
