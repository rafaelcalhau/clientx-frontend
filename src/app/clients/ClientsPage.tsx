"use client"

import React, { FC } from "react"
import { format } from "date-fns"
import IconButton from "@mui/joy/IconButton"
import Badgecon from "@mui/icons-material/Badge"
import { HeaderBreadcrumbs } from "@/components/HeaderBreadcrumbs"
import { Listing } from "@/components/Listing"
import { ListingColumns } from "@/components/Listing/interfaces"
import { PrivatePageContainer } from "@/components/PrivatePageContainer"
import { PrivatePageProps } from "@/modules/auth/withAuthorization"
import { ClientListItem } from "./clients.interfaces"

interface ClientsPageProps extends PrivatePageProps {
  data: ClientListItem[]
}
export const ClientsPage: FC<ClientsPageProps> = ({ data, session }) => {
  const columns: ListingColumns[] = [
    { label: 'Name', style: { width: '25%' } },
    { label: 'Email' },
    { label: 'Registered at', style: { width: 160 }  },
    { label: '', style: { width: 60 } },
  ]

  return (
    <PrivatePageContainer
      breadcrumbs={<HeaderBreadcrumbs text="Clients" />}
      heading="My Clients"
      session={session}
    >
      <div>
        {Array.isArray(data) && (
          <Listing columns={columns}>
            <tbody>
              {data.map(client => (
                <tr key={client._id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{format(new Date(client.createdAt), "dd/MM/yyyy, HH'h'mm")}</td>
                  <td>
                    <IconButton onClick={() => console.log('Clicked...')}>
                      <Badgecon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Listing>
        )}
      </div>
    </PrivatePageContainer>
  )
}
