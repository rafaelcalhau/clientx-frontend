import { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import Button from "@mui/joy/Button"
import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import Input from "@mui/joy/Input"
import Stack from "@mui/joy/Stack"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormErrorText } from "@/components/FormErrorText"
import { clientFormSchema } from "./form.schema"

export type ClientFormValues = {
  name: string
  email: string
}
interface ClientFormProps {
  loading?: boolean
  onCancel: () => void
  onSubmit: SubmitHandler<ClientFormValues>
}
export const ClientForm: FC<ClientFormProps> = ({
  loading,
  onCancel,
  onSubmit,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormControl>
          <FormLabel aria-label="Name">Name</FormLabel>
          <Input 
            autoFocus
            aria-invalid={errors.name ? "true" : "false"}
            data-testid="form-field-name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <FormErrorText withIcon data-testid="field-error-name">
              {errors.name.message}
            </FormErrorText>
          )}
        </FormControl>
        <FormControl>
          <FormLabel aria-label="Email">Email</FormLabel>
          <Input
            type="email"
            aria-invalid={errors.email ? "true" : "false"}
            data-testid="form-field-email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <FormErrorText withIcon data-testid="field-error-email">
              {errors.email.message}
            </FormErrorText>
          )}
        </FormControl>
        
        <div className="flex items-center justify-between">
          <Button
            data-testid="button-cancel"
            disabled={loading}
            type="button"
            onClick={onCancel}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            data-testid="button-submit"
            loading={loading}
            type="submit"
          >
            Register
          </Button>
        </div>
      </Stack>
    </form>
  )
}