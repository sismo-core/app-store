// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType, ClaimType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

export const cowSwapConfigMain: SpaceConfig = {
  metadata: {
    slug: "cow-swap",
    name: "CoW Swap",
    description:
      "Welcome to the CoW Swap Sismo Space. CoW Swap is a decentralized exchange aggregator that protects users from MEV. CoW community, traders and holders can find here exclusive events, swags and premium features.",
    image: "space_cow_swap_pfp_500x500.png",
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
        slug: "swag",
        name: "CoW Swag Claim",
        description:
          "Prove you are a CoW trader or holder to claim your CoW Swag. You can find us in our booth during EthCC week in Paris. Exclusive items are reserved for Level 2 (Water Flask) and Level 3 (Backpack).",
        tags: ["Swag"],
        image: "cowswap_app_store_cow_swag_400x400.png",
        createdAt: new Date("2023-07-04T18:00"),
      },
      sismoConnectRequest: {
        appId: "0x1893f6e21acda30ed88d9a7b9f9c30c0",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [
          {
            groupId: "0x70c30e9a9abdb5fd41ba9e9cb7f50173",
            value: 2,
          },
          {
            groupId: "0x70c30e9a9abdb5fd41ba9e9cb7f50173",
            isOptional: true,
            value: 3,
          },
        ],
      },
      templateConfig: {
        step2CtaText: "Claim your Swag",
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
          description:
            "Swags are given on a first come first serve basis. Come to our booth and tell us your name/pseudonym to claim your Swag 🎒",
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
        endDate: new Date("2023-07-19T18:00Z"),
      },
    },
    {
      type: "zkForm",
      metadata: {
        slug: "event",
        name: "CoW Event Invitation",
        description:
          "Prove you are a CoW trader or holder to register to an invitation-only event organized by CoW Swap, during EthCC week in Paris. Event details are available on the [event page](https://www.eventbrite.pt/e/cow-swap-cheese-fusion-festival-a-cow-tastic-exchange-tickets-667483981557)",
        tags: ["Event", "Ticket"],
        image: "cowswap_app_store_cow_event_400x400.png",
        createdAt: new Date("2023-07-04T18:00"),
      },
      sismoConnectRequest: {
        appId: "0x42bf819b60a7f4cbe57f2c5617b6a35c",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [
          {
            groupId: "0x70c30e9a9abdb5fd41ba9e9cb7f50173",
            value: 1,
          },
        ],
      },
      templateConfig: {
        step2CtaText
        : "Register to get your ticket",
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
          description:
            "Tickets are processed on a first come first serve basis. You will receive an email update in a few days! Event details are available on the [event page](https://www.eventbrite.pt/e/cow-swap-cheese-fusion-festival-a-cow-tastic-exchange-tickets-667483981557). See you there 💜",
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
        endDate: new Date("2023-07-19T18:00Z"),
      },
    },
  ],
};
