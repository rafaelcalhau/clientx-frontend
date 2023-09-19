"use client"

import React, { FC } from "react"
import { HeaderBreadcrumbs } from "@/components/HeaderBreadcrumbs"
import { PrivatePageContainer } from "@/components/PrivatePageContainer"
import { PrivatePageProps } from "@/modules/auth/withAuthorization"

export const ClientsPage: FC<PrivatePageProps> = ({ session }) => {
  return (
    <PrivatePageContainer
      breadcrumbs={<HeaderBreadcrumbs text="Clients" />}
      heading="My Clients"
      session={session}
    >
      <div />
    </PrivatePageContainer>
  )
}
