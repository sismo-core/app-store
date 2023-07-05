// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType, ClaimType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

export const cowSwapConfigMain: SpaceConfig = {
  metadata: {
    slug: "cow-swap",
    name: "Cow Swap",
    description:
      "This Space is dedicated to Cow Swap, a DEX aggregator. Cow Traders and Holders will get access to gifts and premium features.",
    profileImage: "space_cow_swap_pfp_500x500.png",
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
          "Enter your email to claim your Cow Swag during EthCC week in Paris - without doxxing your wallet 👀 Exclusively for Cow Traders & Holders Level 2 (Water flask) and Level 3 (Water Flask + Backpack).",
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
            value: 3,
          },
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
            spreadsheetId: "1rNILllaOqsar8tpGbwHULbv39FE43VLZ9K419Hy5V_s",
          },
          saveAuths: true,
          saveClaims: true,
        },
      },
      options: {
        isFeatured: true,
      },
    },
    {
      type: "zkForm",
      metadata: {
        slug: "cow-event",
        name: "Cow Event Invitation",
        description:
          "Cow Event is an invitation-only event during EthCC week in Paris, organized by Cow Swap. The number of tickets is limited. Exclusive for Cow Traders and Holders.",
        tags: ["Event", "Ticket"],
        image: "space_cow_swap_pfp_500x500.png",
        ctaText: "Register to get your Ticket",
        createdAt: new Date("2023-07-04T18:00"),
      },
      sismoConnectRequest: {
        appId: "0x42bf819b60a7f4cbe57f2c5617b6a35c",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [
          {
            groupId: "0x34dba00caed5fbe69db7313adebf1eaf",
            value: 1,
          },
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
          description: "You will receive the ticket in a few days! See you there 💜",
        },
        failedMessage: {
          title: "Sorry, too late this time 😕",
          description: "Stay in touch for the next one 💜",
        },
        output: {
          destination: {
            type: "google_sheet",
            spreadsheetId: "1rqSdDnIc2kOpg51rYNS6TSQmxqXLB_JKm70sdJg2smM",
          },
          saveAuths: true,
        },
      },
      options: {
        isFeatured: true,
      },
    },
  ],
};
