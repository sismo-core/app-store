import { initAppDataSource } from "../../src/libs/user-store/postgres-user-store/initAppDataSource";
// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

export const sismoConfigMain: SpaceConfig = {
  metadata: {
    slug: "sismo",
    name: "Sismo",
    description:
      "This Space showcases a variety of Sismo Apps and benefits for our valued members across all levels (1, 2, and 3) in the Sismo Community. Prove your membership and unlock access to Apps personalized to your level. To learn more and elevate your level, head to https://community.sismo.io.",
    profileImage: "space_sismo_pfp_400x400.png",
    coverImage: "space_sismo_cover_1740x540.png",
    socialLinks: [
      {
        type: "link",
        link: "https://www.sismo.io/",
      },
      {
        type: "twitter",
        link: "https://twitter.com/Sismo_eth",
      },
      {
        type: "discord",
        link: "https://discord.com/invite/sismo",
      },
      {
        type: "github",
        link: "https://github.com/sismo-core",
      },
    ],
  },
  apps: [
    {
      type: "zkTelegramBot",
      metadata: {
        name: "Citadel Invite",
        slug: "telegram",
        description:
          "Sismo Citadel telegram chat was created specifically for our most active builders and closest friends. It is gated to Sismo Community level 3. Learn more about community levels: https://community.sismo.io.",
        image: "sismoapps_tg_zk_bot_1014x720.png",
        tags: ["Telegram"],
        ctaText: "Join Gated Telegram Chat",
      },
      sismoConnectRequest: {
        appId: "0xa83b7b0d5e268fb4aa3d3582e11700fa",
        claimRequests: [{ groupId: "0xd630aa769278cacde879c5c0fe5d203c", value: 3 }],
      },
      templateConfig: {
        telegramGroupId: "-1001930531830",
        telegramInviteLink: "https://t.me/+3hZN4bNCmsw5Mzgy",
      },
    },
  ],
};
