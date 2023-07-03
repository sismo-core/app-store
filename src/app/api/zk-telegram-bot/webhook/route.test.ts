/**
 * @jest-environment node
 */
import { POST } from "./route";
import axios from "axios";
import {
  MockedRequest,
  mockGroupIdCommand,
  mockJoinRequest,
  mockMessageWithoutText,
} from "../mocks";
import { MemoryUserStore } from "../../../../libs/user-store/memory-user-store";
import { UserStore } from "../../../../libs/user-store/store";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

let memoryUserStore: UserStore;

jest.mock("../../../../environments", () => ({
  isDemo: false,
  isDev: false,
  telegramBotToken: "123",
}));

describe("POST /api/zk-telegram-bot/webhook", () => {
  beforeEach(() => {
    jest.resetModules();
    memoryUserStore = new MemoryUserStore();
  });

  it("Should return error when app is not found", async () => {
    const requestForUnknownGroup = mockJoinRequest(-1, 1);
    const response = await POST(new MockedRequest(requestForUnknownGroup) as any);
    const data = await response.json();
    expect(data.status).toEqual("error");
    expect(data.message).toMatch("Failed to find a matching app for the group");
  });

  it("Should approve when user is in the whitelist", async () => {
    await memoryUserStore.add({
      userId: "6232426394",
      appSlug: "appSlug",
    });

    let performedApproveRequest = false;
    mockedAxios.get.mockImplementation((url) => {
      if (
        url ===
        "https://api.telegram.org/bot123/approveChatJoinRequest?chat_id=-2&user_id=6232426394"
      ) {
        performedApproveRequest = true;
      }
      return Promise.resolve();
    });

    const requestForKnownGroup = mockJoinRequest(-2, 6232426394);
    const response = await POST(new MockedRequest(requestForKnownGroup) as any);
    const data = await response.json();
    expect(performedApproveRequest).toEqual(true);
    expect(data.status).toEqual("approved");
  });

  it("Should decline when user is not in the whitelist", async () => {
    let performedDeclineRequest = false;
    mockedAxios.get.mockImplementation((url) => {
      if (
        url ===
        "https://api.telegram.org/bot123/declineChatJoinRequest?chat_id=-2&user_id=6232426394"
      ) {
        performedDeclineRequest = true;
      }
      return Promise.resolve();
    });

    const requestForKnownGroup = mockJoinRequest(-2, 6232426394);
    const response = await POST(new MockedRequest(requestForKnownGroup) as any);
    const data = await response.json();
    expect(performedDeclineRequest).toEqual(true);
    expect(data.status).toEqual("declined");
  });

  it("Should reply to groupid command", async () => {
    // (getSpaces as jest.Mock).mockReturnValue(mockSpacesType("appSlug", "spaceSlug", "-2"));

    let performedSendMessage = false;
    mockedAxios.get.mockImplementation((url) => {
      if (
        url ===
        "https://api.telegram.org/bot123/sendMessage?chat_id=-2&reply_to_message_id=1&text=-2"
      ) {
        performedSendMessage = true;
      }
      return Promise.resolve();
    });

    const response = await POST(new MockedRequest(mockGroupIdCommand(-2, 1)) as any);
    const data = await response.json();
    expect(performedSendMessage).toEqual(true);
    expect(data.status).toEqual("handled");
  });

  it("Should ignore message events without text", async () => {
    // (getSpaces as jest.Mock).mockReturnValue(mockSpacesType());

    let performedSendMessage = false;
    mockedAxios.get.mockImplementation((_) => {
      performedSendMessage = true;
      return Promise.resolve();
    });

    const response = await POST(new MockedRequest(mockMessageWithoutText()) as any);
    const data = await response.json();
    expect(performedSendMessage).toEqual(false);
    expect(data.status).toEqual("ignored");
  });
});
