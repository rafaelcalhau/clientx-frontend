"use client"

import { FC } from "react"
import { HeaderBreadcrumbs } from "@/components/HeaderBreadcrumbs"
import { PrivatePageContainer } from "@/components/PrivatePageContainer"
import { PrivatePageProps } from "@/modules/auth/withAuthorization"

export const BillingPage: FC<PrivatePageProps> = ({ session }) => {
  return (
    <PrivatePageContainer
      breadcrumbs={
        <HeaderBreadcrumbs text="Billing" />
      }
      heading="Billing"
      userName={session.name}
    >
      <div />
    </PrivatePageContainer>
  )
}
