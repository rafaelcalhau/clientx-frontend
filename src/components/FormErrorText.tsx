import { FC, PropsWithChildren } from "react"

export const FormErrorText: FC<PropsWithChildren> = ({ children }) => (
  <p className="text-sm text-red-500" role="alert">
    {children}
  </p>
)
