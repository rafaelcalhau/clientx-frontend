import { render, screen, waitFor } from "@testing-library/react"
import useEvent from "@testing-library/user-event"
import { AttachServiceForm } from "./index"

jest.mock("swr", () => ({
  __esModule: true,
  default: () => ({
    data: [{ _id: "0", name: "Service One" }, { _id: "1", name: "Service Two" }],
    isLoading: false,
  })
}))

describe("Component <AttachServiceForm />", () => {
  const onCancel = jest.fn()
  const onSubmit = jest.fn()
  const user = useEvent.setup()

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("should render the form with all expected fields", () => {
    render(<AttachServiceForm onCancel={onCancel} onSubmit={onSubmit} />)

    expect(screen.getAllByLabelText('Service')).toHaveLength(2)
    expect(screen.getByTestId('form-field-serviceid')).toBeInTheDocument()

    expect(screen.getByTestId('button-cancel')).toBeInTheDocument()
    expect(screen.getByTestId('button-submit')).toBeInTheDocument()
  })

  it("should call handler onCancel when user hit the cancel button", async () => {
    render(<AttachServiceForm onCancel={onCancel} onSubmit={onSubmit} />)
    await user.click(screen.getByTestId('button-cancel'))
    expect(onCancel).toBeCalledTimes(1)
  })

  it("should call handler onSubmit when user selects a service and hit the submit button", async () => {
    render(<AttachServiceForm onCancel={onCancel} onSubmit={onSubmit} />)
    await user.click(screen.getByTestId('button-submit'))
    expect(screen.getByTestId('field-error-serviceid')).toBeInTheDocument()
    expect(onSubmit).toBeCalledTimes(0)

    await user.click(screen.getByTestId('form-field-serviceid'))
    await user.click(screen.getByText('Service One'))
    await user.click(screen.getByTestId('button-submit'))
    expect(onSubmit).toBeCalledTimes(1)
  })
})