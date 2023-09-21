import Alert from "@mui/joy/Alert"
import IconButton from "@mui/joy/IconButton"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import WarningRoundedIcon from "@mui/icons-material/WarningRounded"
import { FC } from "react"

interface PageErrorProps {
  message: string
  onClose?: () => void
}
export const PageError: FC<PageErrorProps> = ({ message, onClose }) => (
  <Alert
    color="danger"
    variant="outlined"
    startDecorator={<WarningRoundedIcon />}
    endDecorator={
      onClose && (
        <IconButton
          color="neutral"
          data-testid="close-button"
          onClick={onClose}
          size="sm"
          variant="plain"
        >
          <CloseRoundedIcon />
        </IconButton>
      )
    }
  >
    {message}
  </Alert>
)
