// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";
import { Network } from "@/src/libs/contracts/networks";

export default {
  metadata: {
    name: "Aave-Chan Initiative",
    description:
      "This Space is dedicated to the Aave-Chan Initiative (ACI - Aavechan.eth), a delegate platform. Aave users that delegated their governance power to ACI will get access to gifts and premium features.",
    image: "space_aave_chan_initiative_pfp_400x400.png",
    socialLinks: [
      {
        type: "twitter",
        link: "https://twitter.com/AaveChan",
      },
    ],
  },
  apps: [
    {
      type: "zkForm",
      metadata: {
        slug: "aci-swag",
        name: "ACI Chads Swag Claim",
        description:
          "Enter your delivery address to claim your Aave-Chan Initiative Chads Swag - without doxxing your wallet 👀 Don't forget to share all your levels to get more swags!",
        tags: ["Swag"],
        image: "aave_chan_initiative_apps_swag_1014x720.png",
        createdAt: new Date("2022-07-01T00:00:00.000Z"),
      },
      sismoConnectRequest: {
        appId: "0x02bcb449a6bd1062017cf0315375afdf",
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
        fields: [
          {
            type: "short-text",
            label: "Email",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Full name",
            placeholder: "P.O Box ok",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Street address",
            placeholder: "P.O Box ok",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "City",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "ZIP code",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Country",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "(Optional) Drop here if you have a weird address",
            placeholder: "",
            isRequired: false,
          },
          {
            type: "short-text",
            label: "(Optional) T-shirt size - only if >= 250 tokens delegated",
            placeholder: "XS/S/M/L/XL (EU Sizes)",
            helperText: "If you're US, take one Size above your usual one",
            isRequired: false,
          },
        ],
        congratulationsMessage: {
          title: "Congratulations!",
          description: "You will receive your exclusive ACI Chads Swag soon 💜",
        },
        output: {
          destination: {
            type: "google_sheet",
            spreadsheetId: "1XeoiYJjibDi51Ogch5eZTUFRp-SqZ0w2q1Cozs4nqPA",
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
      type: "zkDrop",
      metadata: {
        name: "ZK Drop name",
        slug: "zk-drop-slug",
        description: "Zk drop test description",
        tags: ["Drop"],
        image: "image.png",
        createdAt: new Date("2023-07-03T18:00"),
      },
      sismoConnectRequest: {
        appId: "0x4",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0x04" }],
      },
      templateConfig: {
        nftMetadata: {
          name: "NFT Test",
          description: "This is a test description",
          image: "sismo-zkdrop.png",
        },
        chains: [
          {
            contractAddress: "{{ auto-fill }}",
            name: Network.Sepolia,
            relayerEnabled: true,
          },
        ],
        step1CtaText: "step 1",
        step2CtaText: "step 2",
        appDescription: "App description",
      },
    },
    {
      type: "zkDrop",
      metadata: {
        name: "ZK Drop name",
        slug: "zk-drop-slug",
        description: "Zk drop test description",
        tags: ["Drop"],
        image: "image.png",
        createdAt: new Date("2023-07-03T18:00"),
      },
      sismoConnectRequest: {
        appId: "0x4",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0x04" }],
      },
      templateConfig: {
        nftMetadata: {
          name: "NFT Test 2",
          description: "This is a test description2 ",
          image: "sismo-zkdrop.png",
        },
        chains: [
          {
            contractAddress: "{{ auto-fill }}",
            name: Network.Sepolia,
            relayerEnabled: true,
          },
        ],
        step1CtaText: "step 1",
        step2CtaText: "step 2",
        appDescription: "App description",
      },
    },
  ],
} as SpaceConfig;
