/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react"
import { DashboardPage } from "./DashboardPage"

describe("<DashboardPage />", () => {
  it ('should have the heading "Dashboard Page"', () => {
    const { getByTestId } = render(<DashboardPage />)
    expect(getByTestId('page-heading').textContent).toEqual('Dashboard Page')
  })
})