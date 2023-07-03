// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType, ClaimType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

export const stakeDaoConfigDemo: SpaceConfig = {
  metadata: {
    slug: "stake-dao",
    name: "Stake DAO",
    description:
      "This Space is dedicated to Stake DAO, a non-custodial DeFi platform. Stake DAO NFT holders will get access to gifts and premium features.",
    profileImage: "space_stake_dao_pfp_400x400.png",
    coverImage: "space_stake_dao_cover_1740x540.png",
    socialLinks: [
      {
        type: "link",
        link: "https://stakedao.org/",
      },
      {
        type: "twitter",
        link: "https://twitter.com/StakeDAOHQ",
      },
      {
        type: "discord",
        link: "https://discord.com/invite/qwQfw4kmYy",
      },
    ],
  },
  apps: [
    {
      type: "zkForm",
      metadata: {
        slug: "stake-dao-event",
        name: "La Degen Invitation",
        description:
          "La Degen is an invitation-only event during EthCC week in Paris, organized by Stake Capital Group. The number of tickets is limited. Exclusive for Stake DAO NFT holders.",
        tags: ["Event", "Ticket"],
        image: "stake_dao_apps_event_500x500.png",
        ctaText: "Register to get your Ticket",
        createdAt: new Date("2022-07-03T00:00:00.000Z"),
      },
      sismoConnectRequest: {
        appId: "0x05cc1ae55610157f83f2c1589b8839c1",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [
          {
            groupId: "0x5bc7fef39772e3269020f3d0f68f35aa",
          },
        ],
        impersonateAddresses: ["0x82b8b659a4a98f69cb7899e1a07089ea3b90a894"],
      },
      templateConfig: {
        fields: [
          {
            type: "short-text",
            label: "First name",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Family name",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Email",
            isRequired: true,
          }
        ],
        congratulationsMessage: {
          title: "Congratulations!",
          description: "You will receive the ticket in a few days! La bise 💜",
        },
        output: {
          destination: {
            type: "google_sheet",
            spreadsheetId: "1A5nSkex96lLJszRUt0Xr1hVHZsd8W6hmy5DOxKyFXhE",
          },
          saveAuths: true,
          saveClaims: true,
        },
      },
    },
  ],
};
