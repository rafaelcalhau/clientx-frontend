import { FC } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import Button from "@mui/joy/Button"
import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import Option from "@mui/joy/Option"
import Stack from "@mui/joy/Stack"
import Select from "@mui/joy/Select"
import useSWR from "swr"
import { zodResolver } from "@hookform/resolvers/zod"
import { ServiceItem } from "@/app/services/services.interface"
import { FormErrorText } from "@/components/FormErrorText"
import { clientAPI } from "@/modules/api"
import { attachServiceFormSchema } from "./form.schema"

export type AttachServiceFormValues = {
  serviceId: string
}
interface AttachServiceFormProps {
  loading?: boolean
  onCancel: () => void
  onSubmit: SubmitHandler<AttachServiceFormValues>
}
export const AttachServiceForm: FC<AttachServiceFormProps> = ({
  loading,
  onCancel,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AttachServiceFormValues>({
    resolver: zodResolver(attachServiceFormSchema)
  })
  const {
    data,
    isLoading,
  } = useSWR<ServiceItem[]>('/api/services', url => clientAPI.get(url, { isLocal: true }))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormControl>
          <FormLabel aria-label="Service">Service</FormLabel>
          <Controller
            name="serviceId"
            control={control}
            render={({ field }) => (
              <Select
              {...field}
                aria-invalid={errors.serviceId ? "true" : "false"}
                data-testid='form-field-serviceid'
                disabled={isLoading}
                onChange={(_, value) => value && setValue('serviceId', value)}
              >
                {(data ?? []).map(option => (
                  <Option key={option._id} value={option._id}>
                    {option.name}
                  </Option>
                ))}
              </Select>
            )}
          />
          {errors.serviceId && (
            <FormErrorText withIcon data-testid="field-error-serviceid">
              {errors.serviceId.message}
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
            Save
          </Button>
        </div>
      </Stack>
    </form>
  )
}