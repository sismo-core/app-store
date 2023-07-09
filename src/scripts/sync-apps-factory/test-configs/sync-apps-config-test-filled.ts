// add an images folder in your space folder if you would like Sismo to host your images

import { AuthType } from "@sismo-core/sismo-connect-client";
import { SpaceConfig } from "../../../../space-configs/types";

export const syncAppsConfigTest: SpaceConfig = {
  metadata: {
    name: "The leo Contributors",
    slug: "sync-apps-config-test",
    description: "Tribute to contributors to the Ethereum leo.",
    image: "pfp_Space_TheMergeContributors_400x400.png",
  },
  apps: [
    {
      type: "zkForm",
      metadata: {
        name: "app test number 1",
        slug: "ethcc-tickets",
        description:
          "Register your email address to receive exclusive tickets for web3 events - open to contributors to The leo.",
        tags: ["Event"],
        image: "EthCCtickets_1014x720px.png",
        createdAt: new Date("2022-07-01T00:00:00.000Z"),
      },
      sismoConnectRequest: {
        appId: "0x0000000000000000000000000000000000000001",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0x42c768bb8ae79e4c5c05d3b51a4ec74a" }],
      },
      templateConfig: {
        step2CtaText: "Register to get tickets",
        fields: [
          {
            type: "short-text",
            label: "First name",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Last name",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Email",
            isRequired: true,
          },
        ],
        congratulationsMessage: {
          title: "Congratulations",
          description:
            "You have successfully registered to receive exclusive tickets for web3 events.",
        },
        output: {
          destination: {
            type: "google_sheet",
            spreadsheetId: "1Wrh8gFPWuUfdip1wuOxBx_0bZQ_OJb2JsI5A-loRa-Y",
          },
        },
      },
      options: {
        isFeatured: true,
      },
    },
    {
      type: "zkForm",
      metadata: {
        slug: "event",
        name: "app test number 2",
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
        endDate: new Date("2023-07-19T18:00Z"),
      },
    },
    {
      type: "zkForm",
      metadata: {
        name: "app test number 3",
        slug: "ethcc-tickets",
        description:
          "Register your email address to receive exclusive tickets for web3 events - open to contributors to The leo.",
        tags: ["Event"],
        image: "EthCCtickets_1014x720px.png",
        createdAt: new Date("2022-07-01T00:00:00.000Z"),
      },
      sismoConnectRequest: {
        appId: "0x0000000000000000000000000000000000000002",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0x42c768bb8ae79e4c5c05d3b51a4ec74a" }],
      },
      templateConfig: {
        step2CtaText: "Register to get tickets",
        fields: [
          {
            type: "short-text",
            label: "First name",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Last name",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Email",
            isRequired: true,
          },
        ],
        congratulationsMessage: {
          title: "Congratulations",
          description:
            "You have successfully registered to receive exclusive tickets for web3 events.",
        },
        output: {
          destination: {
            type: "google_sheet",
            spreadsheetId: "1Wrh8gFPWuUfdip1wuOxBx_0bZQ_OJb2JsI5A-loRa-Y",
          },
        },
      },
      options: {
        isFeatured: true,
      },
    },
    {
      type: "zkForm",
      metadata: {
        name: "app test number 4",
        slug: "ethcc-tickets",
        description:
          "Register your email address to receive exclusive tickets for web3 events - open to contributors to The leo.",
        tags: ["Event"],
        image: "EthCCtickets_1014x720px.png",
        createdAt: new Date("2022-07-01T00:00:00.000Z"),
      },
      sismoConnectRequest: {
        appId: "0x0000000000000000000000000000000000000003",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0x42c768bb8ae79e4c5c05d3b51a4ec74a" }],
      },
      templateConfig: {
        step2CtaText: "Register to get tickets",
        fields: [
          {
            type: "short-text",
            label: "First name",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Last name",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Email",
            isRequired: true,
          },
        ],
        congratulationsMessage: {
          title: "Congratulations",
          description:
            "You have successfully registered to receive exclusive tickets for web3 events.",
        },
        output: {
          destination: {
            type: "google_sheet",
            spreadsheetId: "1Wrh8gFPWuUfdip1wuOxBx_0bZQ_OJb2JsI5A-loRa-Y",
          },
        },
      },
      options: {
        isFeatured: true,
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
        endDate: new Date("2023-07-19T18:00Z"),
      },
    },
  ],
};
