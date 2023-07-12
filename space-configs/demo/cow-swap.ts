// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";
import { Network } from "@/src/libs/contracts/networks";

export default {
  metadata: {
    name: "CoW Swap",
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
    },
    {
      type: "zkDrop",
      metadata: {
        name: "Astronaut CoW NFT",
        slug: "zk-drop-astronaut",
        description: "Prove you are a Golden Trader or Holder to claim your Astronaut CoW NFT.",
        tags: ["NT-NFT"],
        image: "cow_app_store_zkdrop_astronaut_500x500.png",
        createdAt: new Date("2023-07-12T10:00"),
        isTransferable: false,
      },
      sismoConnectRequest: {
        appId: "0x90e7e9cee2de45bd484985e63f69b946",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0x70c30e9a9abdb5fd41ba9e9cb7f50173", value: 3 },],
        impersonateAddresses: ["0x7fee439ed7a6bb1b8e7ca1ffdb0a5ca8d993c030"],
      },
      templateConfig: {
        nftMetadata: {
          name: "Astronaut CoW NFT",
          description: "Claimable by users that have held ≥ 56.8k COW on July 1, 2023 or swapped ≥ 37 times on CoW Swap between January 1, 2023 and July 1, 2023.",
          image: "nft_cow_astronaut_1000x1000.png",
          symbol: "GoldenCoWNFT",
        },
        chains: [
          {
            contractAddress: "0xdc9dF24414b9528b1f954a1956e423804BfEcc10",
            name: "mumbai",
            relayerEnabled: true,
          },
        ],
        step2CtaText: "Claim your Astronaut CoW NFT",
      },
    },
    {
      type: "zkDrop",
      metadata: {
        name: "Moon Calf CoW NFT",
        slug: "zk-drop-moon-calf",
        description: "Prove you are a Silver Trader or Holder to claim your Moon Calf CoW NFT.",
        tags: ["NT-NFT"],
        image: "cow_app_store_zkdrop_moon_calf_500x500.png",
        createdAt: new Date("2023-07-12T10:00"),
        isTransferable: false,
      },
      sismoConnectRequest: {
        appId: "0x436fac93e62ef34f5b9867391f36ce4f",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0x70c30e9a9abdb5fd41ba9e9cb7f50173", value: 2 },],
        impersonateAddresses: ["0x7fee439ed7a6bb1b8e7ca1ffdb0a5ca8d993c030"],
      },
      templateConfig: {
        nftMetadata: {
          name: "Moon Calf CoW NFT",
          description: "Claimable by users that have held ≥ 26.5k COW on July 1, 2023 or swapped ≥ 6 times on CoW Swap between January 1, 2023 and July 1, 2023.",
          image: "nft_cow_moon_calf_1000x1000.png",
          symbol: "SilverCoWNFT",
        },
        chains: [
          {
            contractAddress: "",
            name: "mumbai",
            relayerEnabled: true,
          },
        ],
        step2CtaText: "Claim your Moon Calf CoW NFT",
      },
    },
    {
      type: "zkDrop",
      metadata: {
        name: "Meadow CoW NFT",
        slug: "zk-drop-meadow",
        description: "Prove you are a Bronze Trader or Holder to claim your Meadow CoW NFT.",
        tags: ["NT-NFT"],
        image: "cow_app_store_zkdrop_meadow_500x500.png",
        createdAt: new Date("2023-07-12T10:00"),
        isTransferable: false,
      },
      sismoConnectRequest: {
        appId: "0xd9f2e3f04273addd0c72e2a9f59cc37e",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0x70c30e9a9abdb5fd41ba9e9cb7f50173", value: 1 },],
        impersonateAddresses: ["0x7fee439ed7a6bb1b8e7ca1ffdb0a5ca8d993c030"],
      },
      templateConfig: {
        nftMetadata: {
          name: "Meadow CoW NFT",
          description: "Claimable by users that have held ≥ 2k COW on July 1, 2023 or swapped ≥ 2 times on CoW Swap between January 1, 2023 and July 1, 2023.",
          image: "nft_cow_meadow_1000x1000.png",
          symbol: "BronzeCoWNFT",
        },
        chains: [
          {
            contractAddress: "",
            name: "mumbai",
            relayerEnabled: true,
          },
        ],
        step2CtaText: "Claim your Meadow CoW NFT",
      },
    },
  ],
} as SpaceConfig;
