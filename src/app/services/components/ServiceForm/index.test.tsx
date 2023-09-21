import { render, screen } from "@testing-library/react"
import useEvent from "@testing-library/user-event"
import { ServiceItem } from "../../services.interface"
import { ServiceForm } from "./index"

describe("Component <ServiceForm />", () => {
  const onCancel = jest.fn()
  const onSubmit = jest.fn()
  const user = useEvent.setup()

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("should render the form with all expected fields", () => {
    render(<ServiceForm onCancel={onCancel} onSubmit={onSubmit} />)

    expect(screen.getAllByLabelText('Name')).toHaveLength(2)
    expect(screen.getByTestId('form-field-name')).toBeInTheDocument()
    expect(screen.getAllByLabelText('Description')).toHaveLength(2)
    expect(screen.getByTestId('form-field-description')).toBeInTheDocument()
    expect(screen.getAllByLabelText('Base Price')).toHaveLength(2)
    expect(screen.getByTestId('form-field-baseprice')).toBeInTheDocument()
    expect(screen.getAllByLabelText('Payment Cycle')).toHaveLength(2)
    expect(screen.getByTestId('form-field-paymentcycle')).toBeInTheDocument()

    expect(screen.getByTestId('button-cancel')).toBeInTheDocument()
    expect(screen.getByTestId('button-submit')).toBeInTheDocument()
  })

  it("should call handler onCancel when user hit the cancel button", async () => {
    render(<ServiceForm onCancel={onCancel} onSubmit={onSubmit} />)
    await user.click(screen.getByTestId('button-cancel'))
    expect(onCancel).toBeCalledTimes(1)
  })

  it("should call handler onSubmit when user has filled out all fields and hit the submit button", async () => {
    render(<ServiceForm onCancel={onCancel} onSubmit={onSubmit} />)
    await user.click(screen.getByTestId('button-submit'))
    expect(screen.getByTestId('field-error-name')).toBeInTheDocument()
    expect(screen.getByTestId('field-error-description')).toBeInTheDocument()
    expect(screen.getByTestId('field-error-baseprice')).toBeInTheDocument()
    expect(screen.getByTestId('field-error-paymentcycle')).toBeInTheDocument()
    expect(onSubmit).toBeCalledTimes(0)

    await user.type(screen.getByTestId('form-field-name'), 'Test')
    await user.click(screen.getByTestId('button-submit'))
    expect(onSubmit).toBeCalledTimes(0)

    await user.type(screen.getByTestId('form-field-description'), 'Test')
    await user.click(screen.getByTestId('button-submit'))
    expect(onSubmit).toBeCalledTimes(0)

    await user.type(screen.getByTestId('form-field-baseprice'), '1')
    await user.click(screen.getByTestId('button-submit'))
    expect(onSubmit).toBeCalledTimes(0)

    await user.click(screen.getByTestId('form-field-paymentcycle'))
    await user.click(screen.getByText('monthly'))
    await user.click(screen.getByTestId('button-submit'))
    expect(onSubmit).toBeCalledTimes(1)
  })

  it("should form be filled out as expected when data prop exists", async () => {
    const data: ServiceItem = {
      _id: '0',
      basePrice: 1,
      description: 'Test',
      name: 'Test',
      paymentCycle: 'monthly',
      createdAt: ''
    }
    render(<ServiceForm data={data} onCancel={onCancel} onSubmit={onSubmit} />)
    await user.click(screen.getByTestId('button-submit'))
    expect(onSubmit).toBeCalledTimes(1)
    expect(screen.queryByTestId('field-error-name')).not.toBeInTheDocument()
    expect(screen.queryByTestId('field-error-description')).not.toBeInTheDocument()
    expect(screen.queryByTestId('field-error-baseprice')).not.toBeInTheDocument()
    expect(screen.queryByTestId('field-error-paymentcycle')).not.toBeInTheDocument()
  })
})