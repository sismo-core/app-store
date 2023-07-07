/**
 * @jest-environment node
 */

import fs from "fs";
import ServiceFactory from "@/src/services/service-factory/service-factory";
import { syncAppsConfigTest } from "@/src/scripts/sync-apps-factory/test-configs/sync-apps-config-test";
import { SismoFactoryService } from "@/src/services/sismo-factory-service";
import { syncAppsFactory } from "@/src/scripts/sync-apps-factory";

describe("SCRIPT sync-apps-factory", () => {
  let sismoFactoryMemory: SismoFactoryService;

  beforeEach(() => {
    ServiceFactory.reset();
    ServiceFactory.getSpaceConfigs([syncAppsConfigTest]);
    sismoFactoryMemory = ServiceFactory.getSismoFactoryService();
    // memoryTableStore = ServiceFactory.getZkFormTableStore() as MemoryTableStore;
  });

  it("should create apps when detecting {{ auto-fill }} in the appId field", async () => {
    const res = await syncAppsFactory(`${__dirname}/test-configs`);
    const createdApps = await sismoFactoryMemory.getApps();
    expect(createdApps.length).toEqual(3);
    expect(createdApps[0].name).toEqual("app test number 1");
    expect(createdApps[1].name).toEqual("app test number 3");
    expect(createdApps[2].name).toEqual("app test number 4");
    expect(res[0].content).toContain(createdApps[0].id);
    const expectedResult = fs.readFileSync(
      `${__dirname}/test-configs/sync-apps-config-test-filled.ts`,
      "utf8"
    );
    expect(res[0].content).toEqual(expectedResult);
  });
});
