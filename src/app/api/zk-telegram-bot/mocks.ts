import { SpaceConfig } from "@/space-config/types";
import { AuthType } from "@sismo-core/sismo-connect-server";

export class MockedRequest {
  private data: any;

  constructor(data: any) {
    this.data = data;
  }

  json() {
    return this.data;
  }
};

export const mockSpaceConfig = (
  appSlug: string = "appSlug",
  spaceSlug: string = "spaceSlug"
): SpaceConfig => {
  return {
    slug: spaceSlug,
    description: "description",
    name: "name",
    envs: [ "Prod", "Demo" ],
    apps: [
      {
        type: "zkTelegramBot",
        name: "name",
        description: "description",
        tags: [],
        image: "image",
        CTAText: "CTAText",
        slug: appSlug,
        authRequests: [{ authType: AuthType.TELEGRAM }],
        appId: "0xd21d9ab6eaf8bcc16eff8d9a76764eab",
        telegramGroupId: "groupId",
        telegramInviteLink: "inviteLink",
        envs: [ "Demo", "Prod" ]
      }
    ]
  }
};

export const mockSpacesConfigs = (
  appSlug: string = "appSlug",
  spaceSlug: string = "spaceSlug"
): SpaceConfig[] => [
  {
    slug: spaceSlug,
    description: "description",
    name: "name",
    envs: [ "Prod", "Demo" ],
    apps: [
      {
        type: "zkTelegramBot",
        name: "name",
        description: "description",
        tags: [],
        image: "image",
        CTAText: "CTAText",
        slug: appSlug,
        authRequests: [{ authType: AuthType.TELEGRAM }],
        appId: "0xd21d9ab6eaf8bcc16eff8d9a76764eab",
        telegramGroupId: "-2",
        telegramInviteLink: "inviteLink",
        envs: [ "Demo", "Prod" ]
      }
    ]
  }
];

export const mockJoinRequest = (chatId: number, userId: number) => {
  return {
    "chat_join_request": {
      "chat": {
        "id": chatId,
        "title": "title",
      },
      "from": {
        "id": userId,
        "username": "username",
      }
    }
  }
};