import { InfoOutlined } from "@mui/icons-material"
import { FC, PropsWithChildren } from "react"

interface FormErrorTextProps {
  ['data-testid']?: string
  withIcon?: boolean
}
export const FormErrorText: FC<PropsWithChildren<FormErrorTextProps>> = ({ children, withIcon, ...otherProps }) => (
  <p className="flex items-center text-sm text-red-500" role="alert" {...otherProps}>
    {withIcon && <InfoOutlined className="text-red-500 mr-1 text-sm" />}
    {children}
  </p>
)
