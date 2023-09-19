import { render } from "@testing-library/react"
import { Listing } from "./index"

describe("Component <HeaderBreadcrumbs />", () => {
  it("should render a table with 3 header items", () => {
    const Component = <div aria-label="Test">Test</div>
    const { getByLabelText, getByTestId } = render(
      <Listing columns={[{ label: "A" }, { label: "B" }, { component: () => Component }]} />
    )

    expect(getByLabelText('basic table')).toBeInTheDocument()
    expect(getByTestId('header-item-0')).toBeInTheDocument()
    expect(getByTestId('header-item-0').textContent).toBe("A")
    expect(getByTestId('header-item-1')).toBeInTheDocument()
    expect(getByTestId('header-item-1').textContent).toBe("B")
    expect(getByTestId('header-item-2')).toBeInTheDocument()
    expect(getByLabelText('Test')).toBeInTheDocument()
  })
})