import { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import Button from "@mui/joy/Button"
import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import Input from "@mui/joy/Input"
import Stack from "@mui/joy/Stack"
import { FormErrorText } from "@/components/FormErrorText"

export type NewClientFormValues = {
  name: string
  email: string
}
interface NewClientFormProps {
  loading?: boolean
  onCancel: () => void
  onSubmit: SubmitHandler<NewClientFormValues>
}
export const NewClientForm: FC<NewClientFormProps> = ({
  loading,
  onCancel,
  onSubmit,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<NewClientFormValues>()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input 
            autoFocus
            aria-invalid={errors.name ? "true" : "false"}
            {...register("name", { required: true })}
          />
          {errors.name && <FormErrorText>This field is required</FormErrorText>}
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            aria-invalid={errors.email ? "true" : "false"}
            {...register("email", { required: true })}
          />
          {errors.email && <FormErrorText>This field is required</FormErrorText>}
        </FormControl>
        
        <div className="flex items-center justify-between">
          <Button disabled={loading} type="button" onClick={onCancel} variant="outlined">Cancel</Button>
          <Button loading={loading} type="submit">Register</Button>
        </div>
      </Stack>
    </form>
  )
}