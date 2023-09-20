import { FC, PropsWithChildren } from 'react'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import DialogTitle from '@mui/joy/DialogTitle'
import DialogContent from '@mui/joy/DialogContent'

interface DialogProps {
  disableEscapeKeyDown?: boolean
  open: boolean
  onClose: (value: boolean) => void
  subtitle?: string
  title: string
}
export const Dialog: FC<PropsWithChildren<DialogProps>> = ({
  children,
  disableEscapeKeyDown,
  open,
  onClose,
  subtitle,
  title,
}) => (
  <Modal
    disableEscapeKeyDown={disableEscapeKeyDown}
    open={open}
    onClose={onClose}
  >
    <ModalDialog>
      <DialogTitle>{title}</DialogTitle>
      {subtitle && (
        <DialogContent>{subtitle}</DialogContent>
      )}
      <div className='flex flex-col mt-6'>
        {children}
      </div>
    </ModalDialog>
  </Modal>
)