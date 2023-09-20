import { render, screen } from "@testing-library/react"
import { BreadcrumbItem, HeaderBreadcrumbs } from "./index"

describe("Component <HeaderBreadcrumbs />", () => {
  it("should render a container with 2 items", () => {
    const text = 'Overview'
    render(
      <HeaderBreadcrumbs text={text} />
    )

    expect(screen.getByTestId('breadcrumb-container')).toBeInTheDocument()
    expect(screen.getByLabelText("Home")).toBeInTheDocument()
    expect(screen.getByTestId('HomeRoundedIcon')).toBeInTheDocument()
    expect(screen.getByTestId('breadcrumb-current-item')).toBeInTheDocument()
    expect(screen.getByTestId('breadcrumb-current-item').textContent).toBe(text)
  })

  it("should render more items through the prop extraPaths", () => {
    const extraPaths: BreadcrumbItem[] = [
      { href: '/something', icon: () => <span />, label: 'Something' }
    ]
    render(
      <HeaderBreadcrumbs extraPaths={extraPaths} text="Overview" />
    )

    expect(screen.getByLabelText('Something')).toBeInTheDocument()
  })
})