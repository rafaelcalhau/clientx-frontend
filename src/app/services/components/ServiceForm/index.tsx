import { FC } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/joy/Button"
import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import Input from "@mui/joy/Input"
import Option from "@mui/joy/Option"
import Select from "@mui/joy/Select"
import Stack from "@mui/joy/Stack"
import { NumericFormat } from "react-number-format"
import { FormErrorText } from "@/components/FormErrorText"
import { serviceFormSchema } from "./form.schema"
import { SERVICE_PAYMENT_CYCLE_OPTIONS } from "../../services.constants"
import { ServiceItem } from "../../services.interface"
import { serviceFormDto } from "./form.dtos"

export type ServiceFormValues = {
  name: string
  description: string
  basePrice: string
  paymentCycle: string
}
interface ServiceFormProps {
  data?: ServiceItem
  loading?: boolean
  onCancel: () => void
  onSubmit: (data: ServiceFormValues, serviceid?: string) => void
}
export const ServiceForm: FC<ServiceFormProps> = ({
  data,
  loading,
  onCancel,
  onSubmit,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<ServiceFormValues>({
    defaultValues: data
      ? serviceFormDto.parse(data)
      : { basePrice: '', description: '', name: '', paymentCycle: '' },
    resolver: zodResolver(serviceFormSchema)
  })

  return (
    <form onSubmit={handleSubmit((values => onSubmit(values, data?._id)))}>
      <Stack spacing={2}>
        <FormControl>
          <FormLabel aria-label="Name">Name</FormLabel>
          <Input 
            autoFocus
            aria-invalid={errors.name ? "true" : "false"}
            data-testid='form-field-name'
            {...register("name")}
          />
          {errors.name && (
            <FormErrorText withIcon data-testid="field-error-name">
              {errors.name.message}
            </FormErrorText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel aria-label="Description">Description</FormLabel>
          <Input
            aria-invalid={errors.description ? "true" : "false"}
            data-testid='form-field-description'
            {...register("description")}
          />
          {errors.description && (
            <FormErrorText withIcon data-testid="field-error-description">
              {errors.description.message}
            </FormErrorText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel aria-label="Base Price">Base Price</FormLabel>
          <Controller
            name="basePrice"
            control={control}
            render={({ field: { ref, onChange, ...otherProps } }) => (
              <NumericFormat
                {...otherProps}
                aria-invalid={errors.basePrice ? "true" : "false"}
                customInput={Input}
                prefix="$ "
                thousandSeparator="."
                decimalScale={2}
                decimalSeparator=","
                data-testid='form-field-baseprice'
                onValueChange={
                  content => content.value && setValue('basePrice', String(content.value))
                }
              />
            )}
          />
          {errors.basePrice && (
            <FormErrorText withIcon data-testid="field-error-baseprice">
              {errors.basePrice.message}
            </FormErrorText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel aria-label="Payment Cycle">Payment Cycle</FormLabel>
          <Controller
            name="paymentCycle"
            control={control}
            render={({ field }) => (
              <Select
              {...field}
                aria-invalid={errors.paymentCycle ? "true" : "false"}
                data-testid='form-field-paymentcycle'
                onChange={(_, value) => value && setValue('paymentCycle', value)}
              >
                {SERVICE_PAYMENT_CYCLE_OPTIONS.map(option => (
                  <Option key={option} value={option}>{option}</Option>
                ))}
              </Select>
            )}
          />
          {errors.paymentCycle && (
            <FormErrorText withIcon data-testid="field-error-paymentcycle">
              {errors.paymentCycle.message}
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