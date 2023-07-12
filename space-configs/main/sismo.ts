// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

export default {
  metadata: {
    name: "Sismo",
    description:
      "This Space presents Sismo Apps, offering exclusive benefits for our contributors and community members. Prove your level and unlock access to the apps. Learn more about the Sismo Community and check your level: https://community.sismo.io.",
    image: "space_sismo_pfp_400x400.png",
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
      type: "zkDrop",
      metadata: {
        name: "Sismo Early Community Minting",
        slug: "zk-drop-early-community",
        description: "Prove you are an early member of Sismo Community to mint your Sismo Early Community NFT.",
        tags: ["NFT"],
        image: "sismo_app_store_zkdrop_early_community_500x500.png",
        createdAt: new Date("2023-07-11T10:00"),
        isTransferable: true,
      },
      sismoConnectRequest: {
        appId: "0x5b7249cf5d8a1669cec21e5aa554299d",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0xc90878eaa974c31bc62c52ad86121765" },],
      },
      templateConfig: {
        nftMetadata: {
          name: "Sismo Early Community NFT",
          description: "Claimable by the early community of Sismo, this NFT is a small gift to everyone that helped us to build Sismo before July 11 2023.",
          image: "nft_sismo_early_community_1000x1000.png",
          symbol: "SEarlyNFT",
        },
        chains: [
          {
            contractAddress: "0xF27a25BF230c02f52721324266583aAeD85284E8",
            name: "gnosis",
            relayerEnabled: true,
          },
          {
            contractAddress: "0xF27a25BF230c02f52721324266583aAeD85284E8",
            name: "optimism",
            relayerEnabled: false,
          },
          {
            contractAddress: "0x4744189928214fF879646a24B3FB2A2080152351",
            name: "arbitrum",
            relayerEnabled: false,
          },
          {
            contractAddress: "0x498310AD2c30349143DcBa65cd6e055d7D68cB4B",
            name: "polygon",
            relayerEnabled: false,
          },
        ],
        step2CtaText: "Mint your Sismo Early Community NFT",
      },
      options: {
        endDate: new Date("2023-09-01T10:00"),
      },
    },
    {
      type: "zkForm",
      metadata: {
        name: "Future of France Invitation",
        slug: "ticket-fof",
        description:
          "Future of France is an invitation-only event during EthCC week in Paris, organized by French-based crypto startups. The number of tickets is limited. Exclusive for members of Sismo Community Level 3.",
        tags: ["Event", "Ticket"],
        image: "sismo_appstore_fof_tickets.png",
        createdAt: new Date("2023-07-03T18:00"),
      },
      sismoConnectRequest: {
        appId: "0x08ffa7336eb7bc0907a9f76ebc55aa4d",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0xd630aa769278cacde879c5c0fe5d203c", value: 3 }],
      },
      templateConfig: {
        step2CtaText: "Register to get the Invite",
        fields: [
          {
            type: "short-text",
            label: "First Name",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Last Name",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Company (optional)",
            isRequired: false,
          },
          {
            type: "short-text",
            label: "Email",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Will you be in Paris on July 17, 7pm? Tickets are limited.",
            isRequired: true,
            placeholder: "Yes/No",
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
            spreadsheetId: "1sb_wAe84Im0VLaGsDv_IhNG-dSMjsJHb15Ur6hZ3mig",
          },
          saveAuths: true,
          saveClaims: true,
        },
        userSelection: { type: "FCFS", maxNumberOfUsers: 40 },
      },
      options: {
        endDate: new Date("2023-07-10T18:00"),
      },
    },
    {
      type: "zkTelegramBot",
      metadata: {
        name: "Join Citadel Telegram Chat",
        slug: "join-citadel",
        description:
          "Sismo Citadel telegram chat was created specifically for our most active builders and closest friends. It is gated to Sismo Community level 3. Learn more about community levels: https://community.sismo.io.",
        image: "sismoapps_tg_zk_bot_1014x720.png",
        tags: ["Telegram"],
        createdAt: new Date("2023-07-01T18:00"),
      },
      sismoConnectRequest: {
        appId: "0xa83b7b0d5e268fb4aa3d3582e11700fa",
        claimRequests: [{ groupId: "0xd630aa769278cacde879c5c0fe5d203c", value: 3 }],
      },
      templateConfig: {
        step2CtaText: "Join Gated Telegram Chat",
        telegramGroupId: "-1001930531830",
        telegramInviteLink: "https://t.me/+5oMohki7dhgwNDJi",
      },
    },
    {
      type: "zkForm",
      metadata: {
        name: "Future of France Lottery",
        slug: "lottery-fof",
        description:
          "Enter the Lottery to get a chance to receive an Invite for Future of France, an invitation-only event during EthCC week in Paris, organized by French-based crypto startups.",
        tags: ["Event", "Ticket"],
        image: "sismo_appstore_fof_tickets.png",
        createdAt: new Date("2023-07-03T18:00"),
      },
      sismoConnectRequest: {
        appId: "0xd3448b2ad00929478df698a73ae98fe1",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0x1cde61966decb8600dfd0749bd371f12", value: 15 }],
      },
      templateConfig: {
        step2CtaText: "Enter the Lottery",
        fields: [
          {
            type: "short-text",
            label: "First Name",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Last Name",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Company (optional)",
            isRequired: false,
          },
          {
            type: "short-text",
            label: "Email",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Will you be in Paris on July 17, 7pm? Tickets are limited.",
            isRequired: true,
            placeholder: "Yes/No",
          },
        ],
        congratulationsMessage: {
          title: "Fingers crossed!",
          description: "You will receive the ticket in a few days if you win! See you there 💜",
        },
        failedMessage: {
          title: "Sorry, too late this time 😕",
          description: "Stay in touch for the next one 💜",
        },
        output: {
          destination: {
            type: "google_sheet",
            spreadsheetId: "1UNUcsfYEMBXDDKPeTyJ3xd-rS5gulHwqJOIuqzrLYaU",
          },
          saveAuths: true,
        },
        userSelection: { type: "Lottery", maxNumberOfEntries: 1000, numberOfWinners: 10 },
      },
      options: {
        endDate: new Date("2023-07-07T18:00"),
      },
    }
  ],
} as SpaceConfig;
