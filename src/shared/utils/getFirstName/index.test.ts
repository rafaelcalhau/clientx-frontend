import { getFirstName } from "./index"

describe("Util getFirstName()", () => {
  it("should return the first name of a given person name", () => {
    expect(getFirstName("Martin Luther King Jr.")).toBe("Martin")
  })
})
