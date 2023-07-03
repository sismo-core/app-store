/**
 * @jest-environment node
 */
import { POST } from "./route";
import { getSpaces } from "@/src/libs/spaces";
import axios from "axios";
import { MockedRequest, mockJoinRequest, mockSpacesType } from "../mocks";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("../../../../environments", () => ({
  isDemo: true,
  isDev: false,
  telegramBotToken: "123",
}));

jest.mock("../../../../libs/spaces", () => {
  return {
    getSpaces: jest.fn(),
  };
});

describe("[Demo] POST /api/zk-telegram-bot/webhook", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("Should bypass whitelist and approve", async () => {
    (getSpaces as jest.Mock).mockReturnValue(mockSpacesType("appSlug", "spaceSlug", "-2"));

    let performedApproveRequest = false;
    mockedAxios.get.mockImplementation((url) => {
      if (url === "https://api.telegram.org/bot123/approveChatJoinRequest?chat_id=-2&user_id=1") {
        performedApproveRequest = true;
      }
      return Promise.resolve();
    });

    const response = await POST(new MockedRequest(mockJoinRequest(-2, 1)) as any);
    const data = await response.json();
    expect(performedApproveRequest).toEqual(true);
    expect(data.status).toEqual("approved");
  });
});
