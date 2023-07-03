import { deepSearch } from "./deepSearch";

describe("deepSearch", () => {
  it("returns false if the input object is falsy", () => {
    expect(deepSearch({ obj: null, searchString: "test" })).toEqual(false);
    expect(deepSearch({ obj: undefined, searchString: "test" })).toEqual(false);
    expect(deepSearch({ obj: "", searchString: "test" })).toEqual(false);
  });

  it("returns true if the search string is found in a nested object property", () => {
    const obj = {
      name: "John",
      age: 30,
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345"
      }
    };
    expect(deepSearch({ obj, searchString: "main" })).toEqual(true);
    expect(deepSearch({ obj, searchString: "CA" })).toEqual(true);
  });

  it("returns true if the search string is found in a nested array element", () => {
    const obj = {
      name: "John",
      age: 30,
      hobbies: ["reading", "writing", "swimming"]
    };
    expect(deepSearch({ obj, searchString: "writing" })).toEqual(true);
    expect(deepSearch({ obj, searchString: "swim" })).toEqual(true);
  });

  it("returns true if the search string is found in a primitive value", () => {
    const obj = {
      name: "John",
      age: 30,
      occupation: "Software Engineer"
    };
    expect(deepSearch({ obj, searchString: "software" })).toEqual(true);
    expect(deepSearch({ obj, searchString: "30" })).toEqual(true);
  });

  it("returns false if the search string is not found", () => {
    const obj = {
      name: "John",
      age: 30,
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345"
      }
    };
    expect(deepSearch({ obj, searchString: "test" })).toEqual(false);
  });
});