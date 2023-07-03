import { SpaceType } from "@/src/libs/spaces";
import { AuthType } from "@sismo-core/sismo-connect-server";

export class MockedRequest {
  private data: any;

  constructor(data: any) {
    this.data = data;
  }

  json() {
    return this.data;
  }
}

export const mockSpaceType = (
  appSlug: string = "appSlug",
  spaceSlug: string = "spaceSlug"
): SpaceType => {
  return {
    slug: spaceSlug,
    description: "description",
    name: "name",
    apps: [
      {
        type: "zkTelegramBot",
        name: "name",
        description: "description",
        tags: [],
        image: "image",
        ctaText: "ctaText",
        slug: appSlug,
        authRequests: [{ authType: AuthType.TELEGRAM }],
        appId: "0xd21d9ab6eaf8bcc16eff8d9a76764eab",
        telegramGroupId: "groupId",
        telegramInviteLink: "inviteLink",
      },
    ],
  };
};

export const mockSpacesType = (
  appSlug: string = "appSlug",
  spaceSlug: string = "spaceSlug",
  telegramGroupId: string = "-2"
): SpaceType[] => [
  {
    slug: spaceSlug,
    description: "description",
    name: "name",
    apps: [
      {
        type: "zkTelegramBot",
        name: "name",
        description: "description",
        tags: [],
        image: "image",
        ctaText: "ctaText",
        slug: appSlug,
        authRequests: [{ authType: AuthType.TELEGRAM }],
        appId: "0xd21d9ab6eaf8bcc16eff8d9a76764eab",
        telegramGroupId: telegramGroupId,
        telegramInviteLink: "inviteLink",
      },
    ],
  },
];

export const mockJoinRequest = (chatId: number, userId: number) => {
  return {
    chat_join_request: {
      chat: {
        id: chatId,
        title: "title",
      },
      from: {
        id: userId,
        username: "username",
      },
    },
  };
};

export const mockGroupIdCommand = (chatId: number, messageId: number) => {
  return {
    message: {
      message_id: messageId,
      chat: {
        id: chatId,
      },
      text: "/groupid@SismoDevBot"
    }
  };
};

export const mockMessageWithoutText = () => {
  return {
    message: {
      message_id: 1,
      chat: {
        id: 1,
      }
    }
  };
};