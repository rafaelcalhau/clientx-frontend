"use client"

import React, { FC } from "react"
import { PrivatePageContainer } from "@/components/PrivatePageContainer"
import { PrivatePageProps } from "@/modules/auth/withAuthorization"
import { HeaderBreadcrumbs } from "@/components/HeaderBreadcrumbs"

export const DashboardPage: FC<PrivatePageProps> = ({ session }) => {
  return (
    <PrivatePageContainer
      breadcrumbs={<HeaderBreadcrumbs text="Overview" />}
      heading="Dashboard Page"
      userName={session.name}
    >
      <div />
    </PrivatePageContainer>
  )
}
