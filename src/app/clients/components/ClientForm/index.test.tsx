import { render, screen } from "@testing-library/react"
import useEvent from "@testing-library/user-event"
import { ClientForm } from "./index"

describe("Component <ClientForm />", () => {
  const onCancel = jest.fn()
  const onSubmit = jest.fn()
  const user = useEvent.setup()

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("should render the form with all expected fields", () => {
    render(<ClientForm onCancel={onCancel} onSubmit={onSubmit} />)

    expect(screen.getAllByLabelText('Name')).toHaveLength(2)
    expect(screen.getByTestId('form-field-name')).toBeInTheDocument()
    expect(screen.getAllByLabelText('Email')).toHaveLength(2)
    expect(screen.getByTestId('form-field-email')).toBeInTheDocument()

    expect(screen.getByTestId('button-cancel')).toBeInTheDocument()
    expect(screen.getByTestId('button-submit')).toBeInTheDocument()
  })

  it("should call handler onCancel when user hit the cancel button", async () => {
    render(<ClientForm onCancel={onCancel} onSubmit={onSubmit} />)
    await user.click(screen.getByTestId('button-cancel'))
    expect(onCancel).toBeCalledTimes(1)
  })

  it("should call handler onSubmit when user has filled out all fields and hit the submit button", async () => {
    render(<ClientForm onCancel={onCancel} onSubmit={onSubmit} />)
    await user.click(screen.getByTestId('button-submit'))
    expect(screen.getByTestId('field-error-name')).toBeInTheDocument()
    expect(screen.getByTestId('field-error-email')).toBeInTheDocument()
    expect(onSubmit).toBeCalledTimes(0)

    await user.type(screen.getByTestId('form-field-name'), 'Test')
    await user.click(screen.getByTestId('button-submit'))
    expect(onSubmit).toBeCalledTimes(0)

    await user.type(screen.getByTestId('form-field-email'), 'test@test.com')
    await user.click(screen.getByTestId('button-submit'))
    expect(onSubmit).toBeCalledTimes(1)
  })
})