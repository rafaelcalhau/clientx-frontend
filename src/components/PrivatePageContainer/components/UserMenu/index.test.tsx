import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { UserMenu } from "./index"

const pushMock = jest.fn()
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: () => ({ push: (route: string) => pushMock(route) }),
}))

describe("Component <UserMenu />", () => {
  const user = userEvent.setup()

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("should render a container list with all expected items", async () => {
    const { getAllByRole, getByTestId } = render(
      <UserMenu userName="Rafael" />
    )

    const userMenuButton = getByTestId('usermenu-button')
    expect(userMenuButton).toBeInTheDocument()
    await user.click(userMenuButton)

    const profileItem = getByTestId('usermenu-item-profile')
    const logoutItem = getByTestId('usermenu-item-logout')

    expect(profileItem).toBeInTheDocument()
    expect(logoutItem).toBeInTheDocument()
    expect(getAllByRole('menuitem').length).toBe(2)
  })

  it("should click on item Profile and call the expected handler", async () => {
    const { getByTestId } = render(
      <UserMenu userName="Rafael" />
    )

    const userMenuButton = getByTestId('usermenu-button')
    expect(userMenuButton).toBeInTheDocument()
    await user.click(userMenuButton)
    await user.click(getByTestId('usermenu-item-profile'))
    expect(pushMock).toHaveBeenCalledTimes(1)
    expect(pushMock).toHaveBeenCalledWith('/profile')
  })

  it("should click on item Logout and call the expected handler", async () => {
    const { getByTestId } = render(
      <UserMenu userName="Rafael" />
    )

    const userMenuButton = getByTestId('usermenu-button')
    expect(userMenuButton).toBeInTheDocument()
    await user.click(userMenuButton)
    await user.click(getByTestId('usermenu-item-logout'))
    expect(pushMock).toHaveBeenCalledTimes(1)
    expect(pushMock).toHaveBeenCalledWith('/logout')
  })
})