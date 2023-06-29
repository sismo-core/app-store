import capitalizeFirstLetter from "./capitalizeFirstLetter";

describe("capitalizeFirstLetter", () => {
  it("returns an empty string if input is falsy", () => {
    expect(capitalizeFirstLetter(null)).toEqual("");
    expect(capitalizeFirstLetter(undefined)).toEqual("");
    expect(capitalizeFirstLetter("")).toEqual("");
  });

  it("capitalizes the first letter of a string", () => {
    expect(capitalizeFirstLetter("hello world")).toEqual("Hello world");
    expect(capitalizeFirstLetter("this is a test")).toEqual("This is a test");
  });

  it("does not modify the rest of the string", () => {
    expect(capitalizeFirstLetter("hello world")).toEqual("Hello world");
    expect(capitalizeFirstLetter("this is a test")).toEqual("This is a test");
  });
});