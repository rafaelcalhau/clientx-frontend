import { render, screen } from "@testing-library/react"
import { Listing } from "./index"

describe("Component <HeaderBreadcrumbs />", () => {
  it("should render a table with 3 header items", () => {
    const component = () => <div aria-label="Test">Test</div>
    render(
      <Listing columns={[{ label: "A" }, { label: "B" }, { component }]} />
    )

    expect(screen.getByLabelText('basic table')).toBeInTheDocument()
    expect(screen.getByTestId('header-item-0')).toBeInTheDocument()
    expect(screen.getByTestId('header-item-0').textContent).toBe("A")
    expect(screen.getByTestId('header-item-1')).toBeInTheDocument()
    expect(screen.getByTestId('header-item-1').textContent).toBe("B")
    expect(screen.getByTestId('header-item-2')).toBeInTheDocument()
    expect(screen.getByLabelText('Test')).toBeInTheDocument()
  })

  it("should render a loading indicator when loading prop is true", () => {
    const component = () => <div aria-label="Test">Test</div>
    render(
      <Listing loading columns={[{ label: "A" }, { label: "B" }, { component }]} />
    )

    expect(screen.getByTestId('listing-loader')).toBeInTheDocument()
  })
})