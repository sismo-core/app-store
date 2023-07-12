import formatNumberWithSpace from "./formatNumberWithSpace";

describe("formatNumberWithSpace", () => {
  it("returns an empty string if input is falsy", () => {
    expect(formatNumberWithSpace(null)).toEqual("");
    expect(formatNumberWithSpace(undefined)).toEqual("");
    expect(formatNumberWithSpace(0)).toEqual("0");
  });

  it("formats a number with spaces", () => {
    expect(formatNumberWithSpace(1000)).toEqual("1 000");
    expect(formatNumberWithSpace(123456789)).toEqual("123 456 789");
  });
});
