// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

export default {
  metadata: {
    name: "Leo test",
    description: "Leo test",
    image: "leo.png",
    socialLinks: [],
  },
  apps: [
    {
      type: "zkForm",
      metadata: {
        slug: "leo-swag",
        name: "Leo Super Swag Claim 4",
        description: "description",
        tags: ["Swag"],
        image: "leo.png",
        createdAt: new Date("2022-07-01T00:00:00.000Z"),
      },
      sismoConnectRequest: {
        appId: "0x5aec5186e30fec5130fd4fa7a110a280",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [
          {
            groupId: "0xf0285dcfe412b24a6ac9a1c365b7b35d",
            value: 50,
          },
          {
            groupId: "0xf0285dcfe412b24a6ac9a1c365b7b35d",
            isOptional: true,
            value: 250,
          },
          {
            groupId: "0xf0285dcfe412b24a6ac9a1c365b7b35d",
            isOptional: true,
            value: 1000,
          },
        ],
        impersonateAddresses: ["0x5af25164a0f1207db70727a2c447d6a7b44b89d0"],
      },
      templateConfig: {
        step2CtaText: "Claim your Swag",
        fields: [],
        congratulationsMessage: {
          title: "Congratulations!",
          description: "You will receive your exclusive ACI Chads Swag soon 💜",
        },
        output: {
          destination: {
            type: "google_sheet",
            spreadsheetId: "random",
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
        slug: "leo-swag",
        name: "Leo Super Swag Claim 6",
        description: "description",
        tags: ["Swag"],
        image: "leo.png",
        createdAt: new Date("2022-07-01T00:00:00.000Z"),
      },
      sismoConnectRequest: {
        appId: "0x43b9908995b96f53dca503f689a9edf1",
        authRequests: [{ authType: AuthType.VAULT }],
        impersonateAddresses: ["leo21.eth"],
      },
      templateConfig: {
        step2CtaText: "Claim your Swag",
        fields: [],
        congratulationsMessage: {
          title: "Congratulations!",
          description: "You will receive your exclusive ACI Chads Swag soon 💜",
        },
        output: {
          destination: {
            type: "google_sheet",
            spreadsheetId: "random",
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
        slug: "leo-swag",
        name: "Leo Super Swag Claim 7",
        description: "description",
        tags: ["Swag"],
        image: "leo.png",
        createdAt: new Date("2022-07-01T00:00:00.000Z"),
      },
      sismoConnectRequest: {
        appId: "0x457d53fbc540eff9035676a6a38dfae5",
        authRequests: [{ authType: AuthType.VAULT }],
        impersonateAddresses: ["leo21.eth"],
      },
      templateConfig: {
        step2CtaText: "Claim your Swag",
        fields: [],
        congratulationsMessage: {
          title: "Congratulations!",
          description: "You will receive your exclusive ACI Chads Swag soon 💜",
        },
        output: {
          destination: {
            type: "google_sheet",
            spreadsheetId: "random",
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
        slug: "leo-swag",
        name: "Leo Super Swag Claim 8",
        description: "description",
        tags: ["Swag"],
        image: "leo.png",
        createdAt: new Date("2022-07-01T00:00:00.000Z"),
      },
      sismoConnectRequest: {
        appId: "0xd49b4337246e793b5bf2760b49761b97",
        authRequests: [{ authType: AuthType.VAULT }],
        impersonateAddresses: ["leo21.eth"],
      },
      templateConfig: {
        step2CtaText: "Claim your Swag",
        fields: [],
        congratulationsMessage: {
          title: "Congratulations!",
          description: "You will receive your exclusive ACI Chads Swag soon 💜",
        },
        output: {
          destination: {
            type: "google_sheet",
            spreadsheetId: "random",
          },
          saveAuths: true,
          saveClaims: true,
        },
      },
      options: {
        isFeatured: true,
      },
    },
  ],
} as SpaceConfig;
