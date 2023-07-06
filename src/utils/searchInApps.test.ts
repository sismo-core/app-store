import { ZkAppType } from "../libs/spaces";
import { searchInApps } from "./searchInApps";

describe("searchInApps", () => {
  const apps = [
    {
      name: "My App",
      description: "This is my app",
    },
    {
      name: "Another App",
      description: "This is another app",
    },
    {
      name: "Third App",
      description: "This is a third app",
    }
  ] as ZkAppType[];

  it("returns all apps if search string is falsy", () => {
    const result = searchInApps({ apps, searchString: "" });
    expect(result).toEqual(apps);
  });

  it("returns matching apps based on name", () => {
    const result = searchInApps({ apps, searchString: "app" });
    expect(result).toEqual([
      {
        name: "My App",
        description: "This is my app",
      },
      {
        name: "Another App",
        description: "This is another app",
      },
      {
        name: "Third App",
        description: "This is a third app",
      }
    ]);
  });

  it("returns matching apps based on description", () => {
    const result = searchInApps({ apps, searchString: "third" });
    expect(result).toEqual([
      {
        name: "Third App",
        description: "This is a third app",
      }
    ]);
  });


  it("returns an empty array if no matches are found", () => {
    const result = searchInApps({ apps, searchString: "test" });
    expect(result).toEqual([]);
  });
});