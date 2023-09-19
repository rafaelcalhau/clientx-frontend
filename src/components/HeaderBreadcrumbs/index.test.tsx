import { render } from "@testing-library/react"
import { HeaderBreadcrumbs } from "./index"

describe("Component <HeaderBreadcrumbs />", () => {
  it("should render a container with 2 items", () => {
    const text = 'Overview'
    const { getByLabelText, getByTestId } = render(
      <HeaderBreadcrumbs text={text} />
    )

    expect(getByTestId('breadcrumb-container')).toBeInTheDocument()
    expect(getByLabelText("Home")).toBeInTheDocument()
    expect(getByTestId('HomeRoundedIcon')).toBeInTheDocument()
    expect(getByTestId('breadcrumb-current-item')).toBeInTheDocument()
    expect(getByTestId('breadcrumb-current-item').textContent).toBe(text)
  })
})