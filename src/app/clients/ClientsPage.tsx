"use client"

import React, { FC } from "react"
import { HeaderBreadcrumbs } from "@/components/HeaderBreadcrumbs"
import { PrivatePageContainer } from "@/components/PrivatePageContainer"
import { PrivatePageProps } from "@/modules/auth/withAuthorization"
import { ClientListItem } from "./clients.interfaces"

interface ClientsPageProps extends PrivatePageProps {
  data: ClientListItem[]
}
export const ClientsPage: FC<ClientsPageProps> = ({ data, session }) => {
  return (
    <PrivatePageContainer
      breadcrumbs={<HeaderBreadcrumbs text="Clients" />}
      heading="My Clients"
      session={session}
    >
      <div>
        {data && JSON.stringify(data)}
      </div>
    </PrivatePageContainer>
  )
}
