/**
 * @jest-environment node
 */
import { POST } from "./route";
import { getSpaceConfig } from "@/src/libs/spaces";
import { MockedRequest, mockSpaceConfig } from "../mocks";

jest.mock("../../../../environments", () => ({
  isDemo: true,
  isDev: false // Set to true for console logs
}));

jest.mock("../../../../libs/spaces", () => {  
  return {
    getSpaceConfig: jest.fn()
  }
});

describe("[Demo] POST /api/zk-telegram-bot/verify", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("Should return approved without checking the proof", async () => {
    (getSpaceConfig as jest.Mock).mockReturnValue(mockSpaceConfig("appSlug", "spaceSlug"));
    const response = await POST(
      new MockedRequest({
        spaceSlug: "spaceSlug",
        appSlug: "appSlug",
      }) as any
    );
    const data = await response.json();
    expect(data.status).toEqual("approved");
  });
});