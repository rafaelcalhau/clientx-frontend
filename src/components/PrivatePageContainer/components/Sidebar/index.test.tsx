import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { sidebarNavigationOptions, Sidebar } from "./index"

const pushMock = jest.fn()
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: () => ({ push: (route: string) => pushMock(route) }),
}))

describe("Component <Sidebar />", () => {
  const user = userEvent.setup()

  it("should render a container list with all expected items", async () => {
    render(<Sidebar />)

    expect(screen.getAllByTestId('sidebar-item-name')).toHaveLength(4)
    await Promise.all(sidebarNavigationOptions.map(async ({ name, route }) => {
      const item = screen.getByTestId(`sidebar-item-${name.toLowerCase()}`)
      expect(item).toBeInTheDocument()
      await user.click(item)
      expect(pushMock).toBeCalledWith(route)
    }))
  })
})