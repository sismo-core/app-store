// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";
import { Network } from "@/src/libs/contracts/networks";

export default {
  metadata: {
    name: "Cow Swap",
    description:
      "This Space is dedicated to Cow Swap, a DEX aggregator. Cow Traders and Holders will get access to gifts and premium features.",
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
        name: "Cow Swag Claim",
        description:
          "Prove you are a Cow Trader or Holder to claim your Cow Swag, during EthCC week in Paris. Exclusive for Level 2 (Water Flask) and Level 3 (Water Flask + Backpack).",
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
        impersonateAddresses: ["0xb18e3bf33365fd2466c2e99b181e527a165c210c"],
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
            spreadsheetId: "15NlZQM-jyrFdRtuMVXXAjX4w4MjBPIicfRqO2jwQdB4",
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
        name: "Cow Event Invitation",
        description:
          "Prove you are a Cow Trader or Holder to register to an invitation-only event organized by Cow Swap, during EthCC week in Paris.",
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
        impersonateAddresses: ["0xb18e3bf33365fd2466c2e99b181e527a165c210c"],
      },
      templateConfig: {
        step2CtaText: "Register to get your Ticket",
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
            "Tickets are processed on a first come first serve basis. You will receive an email update in a few days! See you there 💜",
        },
        output: {
          destination: {
            type: "google_sheet",
            spreadsheetId: "153c26qbdBFxgX1r9mKY7fx3krWPTFjKnYVMpYWEmRM0",
          },
          saveAuths: true,
        },
      },
      options: {
        isFeatured: true,
      },
    },
    {
      type: "zkDrop",
      metadata: {
        name: "Golden Cow Trader Minting",
        slug: "zk-drop-golden-trader",
        description: "Prove you have swapped ≥ 37 times on CoW to mint your Golden CoW Trader NFT.",
        tags: ["NFT"],
        image: "cow_app_store_zkdrop_golden_trader_500x500.png",
        createdAt: new Date("2023-07-12T10:00"),
        isTransferable: false,
      },
      sismoConnectRequest: {
        appId: "0x90e7e9cee2de45bd484985e63f69b946",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0x34dba00caed5fbe69db7313adebf1eaf", value: 3 },],
        impersonateAddresses: ["0x32ae635f5136adb181a442cc890be39263bc13c8"],
      },
      templateConfig: {
        nftMetadata: {
          name: "Golden Cow Trader NFT",
          description: "Claimable by users that have swapped ≥ 37 times on CoW between January 1, 2023 and July 1, 2023.",
          image: "nft_cow_golden_trader_1000x1000.png",
          symbol: "GCoWTraderNFT",
        },
        chains: [
          {
            contractAddress: "",
            name: "mumbai",
            relayerEnabled: true,
          },
        ],
        step2CtaText: "Mint your Golden Cow Trader NFT",
      },
    },
  ],
} as SpaceConfig;
