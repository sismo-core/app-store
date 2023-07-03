// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType, ClaimType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

export const aaveChanInitiativeConfigMain: SpaceConfig = {
  metadata: {
    slug: "aave-chan-initiative",
    name: "Aave-Chan Initiative",
    description:
      "This Space is dedicated to the Aave-Chan Initiative (ACI - Aavechan.eth), a delegate platform. Aave users that delegated their governance power to ACI will get access to gifts and premium features.",
    profileImage: "space_aave_chan_initiative_pfp_400x400.png",
    coverImage: "space_aave_chan_initiative_cover_1740x540.png",
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
        ctaText: "Claim your Swag",
        createdAt: new Date("2023-07-02T18:00"),
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
            spreadsheetId: "1wMfP6bjQIshkB8V_pOUVG9fJsx_1PGGXYuf7aOMHVSI",
          },
          saveAuths: true,
          saveClaims: true,
        },
      },
    },
  ],
};
