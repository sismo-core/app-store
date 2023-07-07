import { SpaceConfig } from "@/space-configs/types";

export const mockTelegramTestSpaceType = (
  appSlug: string = "appSlug",
  spaceSlug: string = "spaceSlug",
  telegramGroupId: string = "-2"
): SpaceConfig => {
  return {
    metadata: {
      slug: spaceSlug,
      description: "description",
      name: "name",
    },
    apps: [
      {
        type: "zkTelegramBot",
        metadata: {
          name: "name",
          slug: appSlug,
          description: "description",
          image: "image",
          tags: [],
          createdAt: new Date(),
          lastUpdateAt: new Date(),
        },
        sismoConnectRequest: {
          appId: "0xd21d9ab6eaf8bcc16eff8d9a76764eab",
        },
        templateConfig: {
          step2CtaText: "ctaText",
          telegramGroupId: telegramGroupId,
          telegramInviteLink: "inviteLink",
        },
      },
    ],
  };
};

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
      text: "/groupid@SismoDevBot",
    },
  };
};

export const mockMessageWithoutText = () => {
  return {
    message: {
      message_id: 1,
      chat: {
        id: 1,
      },
    },
  };
};
