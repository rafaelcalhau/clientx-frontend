"use client"

import React, { FC, useState } from "react"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import useSWR from "swr"
import Alert from "@mui/joy/Alert"
import Button from "@mui/joy/Button"
import IconButton from "@mui/joy/IconButton"
import AddIcon from "@mui/icons-material/Add"
import BadgeIcon from "@mui/icons-material/Badge"
import { Dialog } from "@/components/Dialog"
import { HeaderBreadcrumbs } from "@/components/HeaderBreadcrumbs"
import { Listing } from "@/components/Listing"
import { ListingColumns } from "@/components/Listing/interfaces"
import { PrivatePageContainer } from "@/components/PrivatePageContainer"
import { PrivatePageProps } from "@/modules/auth/withAuthorization"
import { ClientListItem } from "./clients.interfaces"
import { NewClientForm, NewClientFormValues } from "./components/NewClientForm"
import { clientAPI } from "@/modules/api"

export const ClientsPage: FC<PrivatePageProps> = ({ session }) => {
  const router = useRouter()
  const [isRequesting, setIsRequesting] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const { data, isLoading, error, mutate: refetchClients } = useSWR(
    `/api/clients?page=${page}`,
    url => clientAPI.get<ClientListItem[]>(url, { isLocal: true })
  )

  const columns: ListingColumns[] = [
    { label: 'Name', style: { width: '25%' } },
    { label: 'Email' },
    { label: 'Registered at', style: { width: 160 }  },
    { label: '', style: { width: 60 } },
  ]

  const handleModalClose = () => setModalOpen(false)

  const handleNewClient = async (data: NewClientFormValues) => {
    setIsRequesting(true)
    return await clientAPI
      .post('/api/clients', data, { isLocal: true })
      .then(result => {
        if (result._id) refetchClients()
        setModalOpen(false)
      })
      .catch(err => console.error(err))
      .finally(() => setIsRequesting(false))
  }

  return (
    <PrivatePageContainer
      breadcrumbs={<HeaderBreadcrumbs text="Clients" />}
      heading="My Clients"
      headingExtra={
        <Button
          disabled={modalOpen}
          onClick={() => setModalOpen(true)}
          startDecorator={<AddIcon />}
        >
          New Client
        </Button>
      }
      userName={session.name}
    >
      {error && (
        <Alert color="danger" variant="outlined">
          We are sorry! Something wrong just happened.
        </Alert>
      )}

      <Listing columns={columns} loading={isLoading}>
        <tbody>
          {data?.map(client => (
            <tr key={client._id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>
                {client.createdAt
                  ? format(new Date(client.createdAt), "dd/MM/yyyy, HH'h'mm")
                  : '-'
                }
              </td>
              <td>
                <IconButton onClick={() => router.push(`/client-profile/${client._id}`)}>
                  <BadgeIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Listing>
      
      <Dialog
        disableEscapeKeyDown
        onClose={handleModalClose}
        open={modalOpen}
        title="Add new Client"
      >
        <NewClientForm
          loading={isRequesting}
          onSubmit={handleNewClient}
          onCancel={handleModalClose}
        />
      </Dialog>
    </PrivatePageContainer>
  )
}
