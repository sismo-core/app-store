/**
 * @jest-environment node
 */
import { POST } from "./route";
import { getSpacesConfigs } from "@/src/libs/spaces";
import axios from "axios";
import { getUserStore } from "@/src/libs/user-store";
import { UserStore } from "@/src/libs/user-store/store";
import { MemoryUserStore } from "@/src/libs/user-store/memory-user-store";
import { MockedRequest, mockJoinRequest, mockSpacesConfigs } from "../mocks";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("../../../../libs/user-store", () => ({
  getUserStore: jest.fn(),
}));
let memoryUserStore: UserStore;

jest.mock("../../../../environments", () => ({
  isDemo: false,
  isDev: false,
  telegramBotToken: "123"
}));

jest.mock("../../../../libs/spaces", () => {  
  return {
    getSpacesConfigs: jest.fn()
  }
});

describe("POST /api/zk-telegram-bot/webhook", () => {
  beforeEach(() => {
    jest.resetModules();
    memoryUserStore = new MemoryUserStore();
    (getUserStore as jest.Mock).mockReturnValue(memoryUserStore);
    (getSpacesConfigs as jest.Mock).mockReturnValue(mockSpacesConfigs());
  });

  it("Should return error when app is not found", async () => {
    const requestForUnknownGroup = mockJoinRequest(-1, 1);
    const response = await POST(
      new MockedRequest(requestForUnknownGroup) as any
    );
    const data = await response.json();
    expect(data.status).toEqual("error");
    expect(data.message).toMatch("Failed to find a matching app for the group");
  });

  it("Should approve when user is in the whitelist", async () => {
    await memoryUserStore.add({ 
      userId: "6232426394",
      appSlug: "appSlug"
    });
    
    let performedApproveRequest = false;
    mockedAxios.get.mockImplementation((url) => {
      if (url === "https://api.telegram.org/bot123/approveChatJoinRequest?chat_id=-2&user_id=6232426394") {
        performedApproveRequest = true;
      }
      return Promise.resolve();
     });

    const requestForKnownGroup = mockJoinRequest(-2, 6232426394);
    const response = await POST(
      new MockedRequest(requestForKnownGroup) as any
    );
    const data = await response.json();
    expect(performedApproveRequest).toEqual(true);
    expect(data.status).toEqual("approved");
  });

  it("Should decline when user is not in the whitelist", async () => {
    let performedDeclineRequest = false;
    mockedAxios.get.mockImplementation((url) => {
      if (url === "https://api.telegram.org/bot123/declineChatJoinRequest?chat_id=-2&user_id=6232426394") {
        performedDeclineRequest = true;
      }
      return Promise.resolve();
     });

    const requestForKnownGroup = mockJoinRequest(-2, 6232426394);
    const response = await POST(
      new MockedRequest(requestForKnownGroup) as any
    );
    const data = await response.json();
    expect(performedDeclineRequest).toEqual(true);
    expect(data.status).toEqual("declined");
  });
});