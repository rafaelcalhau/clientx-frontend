import { serviceFormDto, serviceRequestDto } from "./form.dtos"

describe("ServiceForm DTO Utils", () => {
  it("Util serviceRequestDto", () => {
    expect(serviceRequestDto.parse({
      name: "A",
      description: "B",
      basePrice: "1",
      paymentCycle: "daily"
    })).toStrictEqual({
      name: "A",
      description: "B",
      basePrice: 1,
      paymentCycle: "daily"
    })
  })

  it("Util serviceFormDto", () => {
    expect(serviceFormDto.parse({
      name: "A",
      description: "B",
      basePrice: 1,
      paymentCycle: "daily"
    })).toStrictEqual({
      name: "A",
      description: "B",
      basePrice: "1",
      paymentCycle: "daily"
    })
  })
})