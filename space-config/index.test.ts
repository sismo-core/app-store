import {configsDemo, configsMain} from "./index";

describe('space-config/apps', () => {
  it("demo config should not have the same slug", () => {
    const slugs = configsDemo.map((space) => space.metadata.slug);
    expect(slugs).toEqual([...new Set(slugs)]);
  });

  it("demo apps should not have the same slug", () => {
    const apps = [];
    for (let space of configsDemo) {
      apps.push(...space.apps);
    }
    const slugs = apps.map((app) => app.metadata.slug);
    expect(slugs).toEqual([...new Set(slugs)]);
  });
  
  it("prod config should not have the same slug", () => {
    const slugs = configsMain.map((space) => space.metadata.slug);
    expect(slugs).toEqual([...new Set(slugs)]);
  });

  it("prod apps should not have the same slug", () => {
    const apps = [];
    for (let space of configsMain) {
      apps.push(...space.apps);
    }
    const slugs = apps.map((app) => app.metadata.slug);
    expect(slugs).toEqual([...new Set(slugs)]);
  });
});
