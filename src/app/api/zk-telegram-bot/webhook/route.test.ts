/**
 * @jest-environment node
 */
import { MockedTelegramBotService } from "@/src/services/telegram-bot-service/mocked-telegram-bot-service";
import { POST } from "./route";
import { mockGroupIdCommand, mockJoinRequest, mockMessageWithoutText } from "../mocks";
import { UserStore } from "../../../../services/user-store/store";
import ServiceFactory from "@/src/services/service-factory/service-factory";
import { MockedRequest } from "@/src/libs/helper";

describe("POST /api/zk-telegram-bot/webhook", () => {
  let memoryUserStore: UserStore;
  let mockedTelegramBotService: MockedTelegramBotService;

  beforeEach(() => {
    memoryUserStore = ServiceFactory.getZkTelegramBotUserStore();
    mockedTelegramBotService = ServiceFactory.getTelegramBotService() as MockedTelegramBotService;
  });

  afterEach(() => {
    ServiceFactory.reset();
  });

  it("Should return error when app is not found", async () => {
    const requestForUnknownGroup = mockJoinRequest(-1, 1);
    const response = await POST(MockedRequest(requestForUnknownGroup)); // todo fix this
    const data = await response.json();
    expect(data.status).toEqual("error");
    expect(data.message).toMatch("Failed to find a matching app for the group");
  });

  it("Should approve when user is in the whitelist", async () => {
    await memoryUserStore.add({
      userId: "6232426394",
      appSlug: "appSlug",
    });

    const requestForKnownGroup = mockJoinRequest(-2, 6232426394);
    const response = await POST(MockedRequest(requestForKnownGroup));
    const data = await response.json();

    expect(data.status).toEqual("approved");
    expect(mockedTelegramBotService.joinRequestApproved).toEqual([
      {
        groupId: "-2",
        groupTitle: "title",
        userId: "6232426394",
        username: "username",
      },
    ]);
  });

  it("Should decline when user is not in the whitelist", async () => {
    const requestForKnownGroup = mockJoinRequest(-2, 6232426394);
    const response = await POST(MockedRequest(requestForKnownGroup));
    const data = await response.json();
    expect(data.status).toEqual("declined");
    expect(mockedTelegramBotService.joinRequestDeclined).toEqual([
      {
        groupId: "-2",
        groupTitle: "title",
        userId: "6232426394",
        username: "username",
      },
    ]);
  });

  it("Should reply to groupid command", async () => {
    const groupId = -2;
    const response = await POST(MockedRequest(mockGroupIdCommand(groupId, 1)));
    const data = await response.json();
    expect(data.status).toEqual("handled");
    expect(mockedTelegramBotService.messageSent).toEqual([
      {
        groupId: `${groupId}`,
        messageId: "1",
        text: "-2",
      },
    ]);
  });

  it("Should ignore message events without text", async () => {
    const response = await POST(MockedRequest(mockMessageWithoutText()));
    const data = await response.json();
    expect(data.status).toEqual("ignored");
  });
});
