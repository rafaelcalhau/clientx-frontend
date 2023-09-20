import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BubbleChartIcon from "@mui/icons-material/BubbleChart"
import { SidebarItem } from "./index"

describe("Component <SidebarItem />", () => {
  const itemName = 'Clients'
  const onClick = jest.fn()
  const user = userEvent.setup()

  it("should render with a button, icon and label", () => {
    render(
      <SidebarItem
        icon={<BubbleChartIcon />}
        name={itemName}
        onClick={onClick}
      />
    )

    expect(screen.getByTestId(`sidebar-item-${itemName.toLowerCase()}`)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByTestId('BubbleChartIcon')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar-item-name').textContent).toEqual(itemName)
  })

  it("should call onClick handler when user clicks on the item", async () => {
    render(
      <SidebarItem
        icon={<BubbleChartIcon />}
        name={itemName}
        onClick={onClick}
      />
    )

    await user.click(screen.getByRole('button'))
    expect(onClick).toBeCalledTimes(1)
  })
})