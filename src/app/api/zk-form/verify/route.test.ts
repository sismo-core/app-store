/**
 * @jest-environment node
 */
import { POST } from "./route";
import ServiceFactory from "@/src/libs/service-factory/service-factory";
import { mockZkFormTestAppRequest } from "@/src/app/api/zk-form/mocks";
import { MemoryTableStore } from "@/src/libs/table-store";

describe("POST /api/zk-form/verify", () => {
  let memoryTableStore: MemoryTableStore;

  beforeEach(() => {
    memoryTableStore = ServiceFactory.getZkFormTableStore() as MemoryTableStore;
  });

  afterAll(() => {
    // globalThis.curve_bn128.terminate();
  });

  it("Should return error when app is not found", async () => {
    const response = await POST(
      mockZkFormTestAppRequest({
        appSlug: "non-existent-app",
      })
    );
    const data = await response.json();
    expect(data.status).toEqual("error");
    expect(data.message).toMatch(/App non-existent-app not found or not a zkForm app/);
  });
});
