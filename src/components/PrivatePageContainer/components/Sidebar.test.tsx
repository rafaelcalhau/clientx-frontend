import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { sidebarNavigationOptions, Sidebar } from "./Sidebar"

const pushMock = jest.fn()
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: () => ({ push: (route: string) => pushMock(route) }),
}))

describe("Component <Sidebar />", () => {
  const user = userEvent.setup()

  it("should render a container list with all expected items", async () => {
    const { getAllByTestId, getByTestId } = render(
      <Sidebar />
    )

    expect(getAllByTestId('sidebar-item-name').length).toBe(4)
    await Promise.all(sidebarNavigationOptions.map(async ({ name, route }) => {
      const item = getByTestId(`sidebar-item-${name.toLowerCase()}`).querySelector("[role='button']") as HTMLButtonElement
      expect(item).toBeInTheDocument()
      await user.click(item)
      expect(pushMock).toBeCalledWith(route)
    }))
  })
})