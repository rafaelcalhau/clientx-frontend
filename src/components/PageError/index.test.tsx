import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { PageError } from "./index"

describe("Component <PageError />", () => {
  const error = "That's an error"
  const onClose = jest.fn()
  const user = userEvent.setup()

  it("should render a message of error as expected", () => {
    render(<PageError message="That's an error" />)

    expect(screen.queryByTestId('close-button')).not.toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent(error)
  })

  it("should render a close button when passing onClose handler", async () => {
    render(<PageError message="That's an error" onClose={onClose} />)

    expect(screen.getByTestId('close-button')).toBeInTheDocument()
    await user.click(screen.getByTestId('close-button'))
    expect(onClose).toBeCalledTimes(1)
  })
})
