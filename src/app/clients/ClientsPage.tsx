"use client"

import React, { FC, useEffect, useState } from "react"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import useSWR from "swr"
import Alert from "@mui/joy/Alert"
import Button from "@mui/joy/Button"
import IconButton from "@mui/joy/IconButton"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import BadgeIcon from "@mui/icons-material/Badge"

import { Dialog } from "@/components/Dialog"
import { HeaderBreadcrumbs } from "@/components/HeaderBreadcrumbs"
import { Listing } from "@/components/Listing"
import { ListingColumns } from "@/components/Listing/interfaces"
import { PageError } from "@/components/PageError"
import { PrivatePageContainer } from "@/components/PrivatePageContainer"
import { clientAPI } from "@/modules/api"
import { PrivatePageProps } from "@/modules/auth/withAuthorization"
import { DataListResponse } from "@/shared/interfaces"
import { formatListingResponse } from "@/shared/utils/formatListingResponse"
import { ClientListItem, ClientProfile } from "./clients.interfaces"
import { ClientForm, ClientFormValues } from "./components/ClientForm"
import { clientDto } from "./components/ClientForm/form.dtos"

interface ClientsPageProps extends PrivatePageProps {
  data: DataListResponse<ClientListItem>
}
export const ClientsPage: FC<ClientsPageProps> = ({
  data: response,
  session,
}) => {
  const router = useRouter()
  const [selectedClient, setSelectedClient] = useState<ClientProfile>()
  const [isRequesting, setIsRequesting] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [pageError, setPageError] = useState<string>()
  const {
    data: clients = response,
    isLoading,
    error,
    mutate: refetchClients,
  } = useSWR(
    `/api/clients?page=${page}`,
    url => clientAPI
      .get<DataListResponse<ClientListItem>>(url, { isLocal: true })
      .then(result => formatListingResponse(result)),
    {
      revalidateOnFocus: false,
      revalidateOnMount: false
    }
  )

  const columns: ListingColumns[] = [
    { label: 'Name', style: { width: '25%' } },
    { label: 'Email' },
    { label: 'Registered at', style: { width: 160 }  },
    { label: '', style: { width: 90 } },
  ]

  const hasClients = Array.isArray(clients?.data) && clients.data.length > 0

  const handleEditClient = async (clientid: string) => {
    setIsRequesting(true)
    
    try {
      await clientAPI
        .get<ClientProfile>(
          `/v1/clients/${clientid}`,
          { accessToken: session.accessToken }
        )
        .then(result => {
          if (result._id) {
            setSelectedClient(result)
            setModalOpen(true)
          } else {
            setPageError("Client's data is not available.")
          }
        })
    } catch (error) {
      console.error(error)
      setPageError("Client's data is not available.")
      setModalOpen(false)
    } finally {
      setIsRequesting(false)
    }
  }

  const handleModalClose = () => {
    setSelectedClient(undefined)
    setModalOpen(false)
  }

  const handleSaveClient = async (data: ClientFormValues, clientId?: string) => {
    setIsRequesting(true)
    const fetcherOptions = { accessToken: session.accessToken }

    try {
      const parsedData = clientDto.parse(data)
      if (!clientId) { // new client
        await clientAPI
          .post('/v1/clients', parsedData, fetcherOptions)
          .then(result => {
            if (result._id) refetchClients()
            handleModalClose()
          })
      } else { // update selected service
        await clientAPI
          .put(`/v1/clients/${clientId}`, parsedData, fetcherOptions)
          .then(result => {
            if (result._id) refetchClients()
            handleModalClose()
          })
      }
      
    } catch (error) {
      console.error(error)
    } finally {
      setIsRequesting(false)
    }
  }

  useEffect(() => {
    if (error) {
      setPageError("We are sorry! Something wrong just happened.")
    }
  }, [error])

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
      {pageError && (
        <PageError
          message={pageError}
          onClose={() => setPageError(undefined)}
        />
      )}

      <Listing columns={columns} loading={isLoading}>
        {hasClients
          ? clients.data.map((client: ClientListItem) => (
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
                <IconButton
                  disabled={isRequesting}
                  onClick={() => handleEditClient(client._id)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  onClick={() => router.push(`/clients/${client._id}`)}
                >
                  <BadgeIcon />
                </IconButton>
              </td>
            </tr>
          ))
        : (
          <tr>
            <td colSpan={columns.length}>
              <Alert>No data available.</Alert>
            </td>
          </tr>
        )}
      </Listing>
      
      <Dialog
        disableEscapeKeyDown
        onClose={handleModalClose}
        open={modalOpen}
        title={!selectedClient
          ? "New Client"
          : "Edit Client"
      }
      subtitle={!selectedClient
        ? "Register a new client."
        : "Update the information of the selected client."
      }
      >
        <ClientForm
          data={selectedClient}
          loading={isRequesting}
          onSubmit={handleSaveClient}
          onCancel={handleModalClose}
        />
      </Dialog>
    </PrivatePageContainer>
  )
}
