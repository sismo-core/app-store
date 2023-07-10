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
        step1CtaText: "LFGGGGGGGGGG",
        appDescription: "allllllllllllezzzzzzzz",
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
        isFeatured: true,
      },
    },
  ],
} as SpaceConfig;
