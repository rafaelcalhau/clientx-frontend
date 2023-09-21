import { clientDto } from "./form.dtos"

describe("clientDto DTO Utils", () => {
  it("Util serviceRequestDto", () => {
    expect(clientDto.parse({
      name: "A",
      email: "B",
    })).toStrictEqual({
      name: "A",
      email: "B",
    })
  })
})