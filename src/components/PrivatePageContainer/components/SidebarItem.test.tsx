import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BubbleChartIcon from "@mui/icons-material/BubbleChart"
import { SidebarItem } from "./SidebarItem"

describe("Component <SidebarItem />", () => {
  const itemName = 'Clients'
  const onClick = jest.fn()
  const user = userEvent.setup()

  it("should render with a button, icon and label", () => {
    const { getByRole, getByTestId } = render(
      <SidebarItem
        icon={<BubbleChartIcon />}
        name={itemName}
        onClick={onClick}
      />
    )

    expect(getByTestId(`sidebar-item-${itemName.toLowerCase()}`)).toBeInTheDocument()
    expect(getByRole('button')).toBeInTheDocument()
    expect(getByTestId('BubbleChartIcon')).toBeInTheDocument()
    expect(getByTestId('sidebar-item-name').textContent).toEqual(itemName)
  })

  it("should call onClick handler when user clicks on the item", async () => {
    const { getByRole } = render(
      <SidebarItem
        icon={<BubbleChartIcon />}
        name={itemName}
        onClick={onClick}
      />
    )

    await user.click(getByRole('button'))
    expect(onClick).toBeCalledTimes(1)
  })
})