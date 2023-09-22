import { attachServiceDto } from "./form.dtos"

describe("attachServiceDto DTO Utils", () => {
  it("Util serviceRequestDto", () => {
    expect(attachServiceDto.parse({
      clientId: "1",
      serviceId: "A",
    })).toStrictEqual({
      clientId: "1",
      serviceId: "A",
    })
  })
})