// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType, ClaimType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

export const cowSwapConfigDemo: SpaceConfig = {
  metadata: {
    slug: "cow-swap",
    name: "Cow Swap",
    description:
      "This Space is dedicated to Cow Swap, a DEX aggregator. Cow Traders and Holders will get access to gifts and premium features.",
    profileImage: "space_cow_swap_pfp_500x500.png",
    coverImage: "space_cow_swap_pfp_500x500.png",
    socialLinks: [
      {
        type: "link",
        link: "https://cow.fi/",
      },
      {
        type: "twitter",
        link: "https://twitter.com/CoWSwap",
      },
      {
        type: "discord",
        link: "https://discord.com/invite/cowprotocol",
      },
      {
        type: "github",
        link: "https://github.com/cowprotocol",
      },
    ],
  },
  apps: [
    {
      type: "zkForm",
      metadata: {
        slug: "cow-swag",
        name: "Cow Swag Claim",
        description:
          "Enter your email to claim your Cow Swag during EthCC week in Paris - without doxxing your wallet 👀 Exclusively for Tier 1 (Water Flask + Backpack) and Tier 2 (Water flask) Cow Traders & Holders.",
        tags: ["Swag"],
        image: "space_cow_swap_pfp_500x500.png",
        ctaText: "Claim your Swag",
        createdAt: new Date("2023-07-04T18:00"),
      },
      sismoConnectRequest: {
        appId: "0x1893f6e21acda30ed88d9a7b9f9c30c0",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [
          {
            groupId: "0x34dba00caed5fbe69db7313adebf1eaf",
            value: 2,
          },
          {
            groupId: "0x34dba00caed5fbe69db7313adebf1eaf",
            isOptional: true,
            value: 1,
            authType: AuthType.EQ,
          },
        ],
        impersonateAddresses: [
          "0x9e26f0ca1e34e3cae9c5a8e4b47f8b25b757e1cd"
        ],
      },
      templateConfig: {
        fields: [
          {
            type: "short-text",
            label: "Email",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Name or Pseudonym",
            isRequired: true,
          },
        ],
        congratulationsMessage: {
          title: "Congratulations!",
          description: "You will receive an email soon to show at EthCC to get your Cow Swag 💜",
        },
        output: {
          destination: {
            type: "google_sheet",
            spreadsheetId: "15NlZQM-jyrFdRtuMVXXAjX4w4MjBPIicfRqO2jwQdB4",
          },
          saveAuths: true,
          saveClaims: true,
        },
      },
      options: {
        isFeatured: true,
      },
    },/*
    {
      type: "zkForm",
      metadata: {
        slug: "cow-event",
        name: "Cow Event Invitation",
        description:
          "Future of France is an invitation-only event during EthCC week in Paris, organized by French-based crypto startups. The number of tickets is limited. Exclusive for members of Sismo Community Level 3.",
        tags: ["Event", "Ticket"],
        image: "space_cow_swap_pfp_500x500.png",
        ctaText: "Claim your Swag",
        createdAt: new Date("2023-07-04T18:00"),
      },
      sismoConnectRequest: {
        appId: "0x1893f6e21acda30ed88d9a7b9f9c30c0",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [
          {
            groupId: "0x34dba00caed5fbe69db7313adebf1eaf",
            value: 2,
          },
          {
            groupId: "0x34dba00caed5fbe69db7313adebf1eaf",
            isOptional: true,
            AuthType
            value: 1,
          },
        ],
        impersonateAddresses: [
          "0x9e26f0ca1e34e3cae9c5a8e4b47f8b25b757e1cd"
        ],
      },
      templateConfig: {
        fields: [
          {
            type: "short-text",
            label: "Email",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Name or Pseudonym",
            isRequired: true,
          },
        ],
        congratulationsMessage: {
          title: "Congratulations!",
          description: "You will receive an email soon to show at EthCC to get your Cow Swag 💜",
        },
        output: {
          destination: {
            type: "google_sheet",
            spreadsheetId: "15NlZQM-jyrFdRtuMVXXAjX4w4MjBPIicfRqO2jwQdB4",
          },
          saveAuths: true,
          saveClaims: true,
        },
      },
      options: {
        isFeatured: true,
      },
    },*/
  ],
};
