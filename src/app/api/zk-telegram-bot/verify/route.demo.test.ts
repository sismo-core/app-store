/**
 * @jest-environment node
 */
import { POST } from "./route";
import { MockedRequest, mockSpaceType } from "../mocks";
import { getSpace } from "@/src/libs/spaces";

jest.mock("../../../../environments", () => ({
  isDemo: true,
  isDev: false, // Set to true for console logs
}));

jest.mock("../../../../libs/spaces", () => {
  return {
    getSpace: jest.fn(),
  };
});

describe("[Demo] POST /api/zk-telegram-bot/verify", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("Should return approved without checking the proof", async () => {
    (getSpace as jest.Mock).mockReturnValue(mockSpaceType("appSlug", "spaceSlug"));
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
