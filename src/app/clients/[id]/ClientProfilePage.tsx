"use client"

import { FC, useState } from "react"
import { useRouter } from "next/navigation"
import Avatar from "@mui/joy/Avatar"
import Button from "@mui/joy/Button"
import BubbleChartIcon from '@mui/icons-material/BubbleChart'
import EmailIcon from '@mui/icons-material/Email'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote'
import StarsIcon from '@mui/icons-material/Stars'
import { BreadcrumbItem, HeaderBreadcrumbs } from "@/components/HeaderBreadcrumbs"
import { PrivatePageContainer } from "@/components/PrivatePageContainer"
import { Dialog } from "@/components/Dialog"
import { clientAPI } from "@/modules/api"
import { PrivatePageProps } from "@/modules/auth/withAuthorization"
import { ClientProfile } from "../clients.interfaces"
import { AttachServiceForm, AttachServiceFormValues } from "./components/AttachServiceForm"
import { attachServiceDto } from "./components/AttachServiceForm/form.dtos"

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
  const router = useRouter()
  const [isRequesting, setIsRequesting] = useState<boolean>(false)
  const [modalNewServiceIsOpen, setModalNewServiceIsOpen] = useState<boolean>(false)

  const handleModalClose = () => {
    setModalNewServiceIsOpen(false)
  }

  const handleAttachService = async (values: AttachServiceFormValues) => {
    setIsRequesting(true)

    try {
      const parsedData = attachServiceDto.parse({ ...values, clientId: data._id })
      await clientAPI
        .post('/api/clients/attach-service', parsedData, { isLocal: true })
        .then(result => {
          handleModalClose()
          if (result._id) router.refresh()
        })
      
    } catch (error) {
      console.error(error)
    } finally {
      setIsRequesting(false)
    }
  }

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
      <div className="flex justify-between items-start">
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

      <div className="flex items-start flex-grow">
        <Button
          variant="soft"
          onClick={() => setModalNewServiceIsOpen(true)}
        >
          Add service
        </Button>
      </div>

      <Dialog
        disableEscapeKeyDown
        onClose={handleModalClose}
        open={modalNewServiceIsOpen}
        title="Add service to Client"
      >
        <AttachServiceForm
          loading={isRequesting}
          onSubmit={handleAttachService}
          onCancel={handleModalClose}
        />
      </Dialog>
    </PrivatePageContainer>
  )
}
