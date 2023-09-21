"use client"

import React, { FC, useEffect, useState } from "react"
import { format } from "date-fns"
import useSWR from "swr"
import Button from "@mui/joy/Button"
import IconButton from "@mui/joy/IconButton"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"

import { Dialog } from "@/components/Dialog"
import { HeaderBreadcrumbs } from "@/components/HeaderBreadcrumbs"
import { Listing } from "@/components/Listing"
import { ListingColumns } from "@/components/Listing/interfaces"
import { PageError } from "@/components/PageError"
import { PrivatePageContainer } from "@/components/PrivatePageContainer"
import { PrivatePageProps } from "@/modules/auth/withAuthorization"
import { clientAPI } from "@/modules/api"
import { ServiceForm, ServiceFormValues } from "./components/ServiceForm"
import { serviceRequestDto } from "./components/ServiceForm/form.dtos"
import { ServiceItem } from "./services.interface"

export const ServicesPage: FC<PrivatePageProps> = ({ session }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem>()
  const [isRequesting, setIsRequesting] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [pageError, setPageError] = useState<string>()
  const { data, isLoading, error, mutate: refetchServices } = useSWR(
    `/v1/services?page=${page}`,
    url => clientAPI.get<ServiceItem[]>(url, { accessToken: session.accessToken })
  )

  const columns: ListingColumns[] = [
    { label: 'Name', style: { width: '20%' } },
    { label: 'Description', style: { width: '30%' } },
    { label: 'Base Price' },
    { label: 'Payment Cycle' },
    { label: 'Registered at', style: { width: 160 }  },
    { label: '', style: { width: 60 } },
  ]

  const handleModalClose = () => {
    setSelectedService(undefined)
    setModalOpen(false)
  }

  const handleSaveService = async (data: ServiceFormValues, serviceId?: string) => {
    setIsRequesting(true)
    const fetcherOptions = { accessToken: session.accessToken }
    console.log({ data, serviceId })

    try {
      const parsedData = serviceRequestDto.parse(data)
      if (!serviceId) { // new service
        await clientAPI
          .post('/v1/services', parsedData, fetcherOptions)
          .then(result => {
            if (result._id) refetchServices()
            setModalOpen(false)
          })
      } else { // update selected service
        await clientAPI
          .put(`/v1/services/${serviceId}`, parsedData, fetcherOptions)
          .then(result => {
            if (result._id) refetchServices()
            setModalOpen(false)
          })
      }
      
    } catch (error) {
      console.error(error)
    } finally {
      setIsRequesting(false)
    }
  }

  const handleEditService = async (serviceId: string) => {
    setIsRequesting(true)
    
    try {
      await clientAPI
        .get<ServiceItem>(
          `/v1/services/${serviceId}`,
          { accessToken: session.accessToken }
        )
        .then(result => {
          if (result._id) {
            setSelectedService(result)
            setModalOpen(true)
          } else {
            setPageError("Service's data is not available.")
          }
        })
    } catch (error) {
      console.error(error)
      setPageError("Service's data is not available.")
      setModalOpen(false)
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
      breadcrumbs={<HeaderBreadcrumbs text="Services" />}
      heading="My Services"
      headingExtra={
        <Button
          disabled={modalOpen}
          onClick={() => setModalOpen(true)}
          startDecorator={<AddIcon />}
        >
          New Service
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
        <tbody>
          {data?.map(service => (
            <tr key={service._id}>
              <td>{service.name}</td>
              <td>{service.description}</td>
              <td>$ {service.basePrice}</td>
              <td>{service.paymentCycle}</td>
              <td>
                {service.createdAt
                  ? format(new Date(service.createdAt), "dd/MM/yyyy, HH'h'mm")
                  : '-'
                }
              </td>
              <td>
                <IconButton
                  disabled={isRequesting}
                  onClick={() => handleEditService(service._id)}
                >
                  <EditIcon />
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
        title={!selectedService
            ? "New Service"
            : "Edit Service"
        }
        subtitle={!selectedService
          ? "Register a new service to offer your clients."
          : "Update the selected service's information."
        }
      >
        <ServiceForm
          data={selectedService}
          loading={isRequesting}
          onSubmit={handleSaveService}
          onCancel={handleModalClose}
        />
      </Dialog>
    </PrivatePageContainer>
  )
}
