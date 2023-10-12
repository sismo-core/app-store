// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

export default {
  metadata: {
    name: "Nouns DAO",
    description:
      "This Space presents Nouns DAO Apps, offering exclusive benefits for their community members. Prove your level and unlock access to the apps.",
    image: "space_nouns_pfp_500x500.png",
    socialLinks: [
      {
        type: "link",
        link: "https://nouns.wtf",
      },
      {
        type: "twitter",
        link: "https://twitter.com/nounsdao",
      },
    ],
  },
  apps: [
    {
      type: "zkTelegramBot",
      metadata: {
        name: "Demo Nouns DAO Group",
        slug: "join-demo-nouns-dao-group",
        description:
          "Prove you own a Nouns NFT to join ‘Nouns DAO' private Telegram Group.",
        image: "nouns_tg_zk_bot_1014x720.png",
        tags: ["Telegram"],
        createdAt: new Date("2022-07-12T00:00:00.000Z"),
      },
      sismoConnectRequest: {
        appId: "0xe955b4791fe8393dca57c2f1a0bea985",
        claimRequests: [{ groupId: "0x311ece950f9ec55757eb95f3182ae5e2" }],
        impersonateAddresses: ["telegram:dhadrien:1234", "0xf7cfc8b249c46ede9cccda3a08ecb58f88262623"],
      },
      templateConfig: {
        appDescription: "gbrefnlerqgnrqehlbngkjnelsgedgeszfdgdgfrgsgfedghgtrfeds",
        step2CtaText: "Join 'Nouns DAO' Telegram Group",
        telegramGroupId: "-1001658867707",
        telegramInviteLink: "https://t.me/+MJxmxpCwKg82M2I0",
      },
    },
  ],
} as SpaceConfig;
