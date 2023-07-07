import { toKebabCase } from "./toKebabCase"; // Adjust this import statement as needed

describe("toKebabCase", () => {
  it("converts spaces to hyphens", () => {
    expect(toKebabCase("Hello World")).toBe("hello-world");
  });

  it("converts underscores to hyphens", () => {
    expect(toKebabCase("Hello_World")).toBe("hello-world");
  });

  it("converts camelCase to kebab-case", () => {
    expect(toKebabCase("helloWorld")).toBe("hello-world");
  });

  it("converts mixed cases and symbols to kebab-case", () => {
    expect(toKebabCase("Hello World_example anotherExample")).toBe(
      "hello-world-example-another-example"
    );
  });

  it("returns an empty string when input is an empty string", () => {
    expect(toKebabCase("")).toBe("");
  });
});
