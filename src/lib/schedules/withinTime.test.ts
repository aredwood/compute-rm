import withinTime from "./withinTime"


describe("positive",() => {
    test("is within zone",() => {
        expect(withinTime(new Date("2019-09-29T10:35:39.530Z"),"20:30","21:00")).toBe(true)
    })
})