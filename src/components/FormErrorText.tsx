import { FC, PropsWithChildren } from "react"

export const FormErrorText: FC<PropsWithChildren> = ({ children }) => (
  <span className="text-sm text-red-500">
    {children}
  </span>
)
