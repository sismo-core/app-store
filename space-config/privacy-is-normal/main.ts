// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType, ClaimType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

export const privacyIsNormalConfigMain: SpaceConfig = {
  metadata: {
    slug: "privacy-is-normal",
    name: "Privacy Is Normal 🌼",
    description:
      "This Space celebrates privacy as a fundamental human right. By proving you are a Tornado Cash user in a privacy-preserving manner and with a Gitcoin Passport, you were able to participate in our Sybil-resistant lottery. 10 winners have been selected to receive a printed ‘Privacy Is Normal’ artwork.",
    profileImage: "space_privacy_is_normal_pfp_400x400.png",
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
        name: "Lottery Registration",
        slug: "artwork-lottery",
        description:
          "Enter the Sybil-resistant lottery to get a chance to be among the 10 lucky winners to receive the ‘Privacy Is Normal’ artwork.",
        tags: ["Artwork"],
        image: "privacy_is_normal_apps_lotery_500x500.png",
        ctaText: "Enter the Sybil-Resistant Lottery",
        createdAt: new Date("2022-07-01T00:00:00.000Z"),
      },
      sismoConnectRequest: {
        appId: "0x9dd13bc62ae6809fe9de95475111fc2a",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [
          {
            groupId: "0x433ae0c1cb3793f0971f3bf2bbcff10e",
          },
          {
            groupId: "0x1cde61966decb8600dfd0749bd371f12",
            claimType: ClaimType.GTE,
            value: 15,
          },
        ],
      },
      templateConfig: {
        fields: [
          {
            type: "short-text",
            label: "Claiming Address",
            placeholder: "Provide the address you will use to claim the NFT",
            isRequired: true,
          },
        ],
        congratulationsMessage: {
          title: "Fingers crossed!",
          description: "We hope to have you among our lucky winners 💜 Stay in touch!",
        },
        output: {
          destination: {
            type: "google_sheet",
            spreadsheetId: "17uLGyCtSduW7PBTS2S2WKyourj9Z2nPKmAvzUD6kRM4",
          },
        },
      },
      options: {
        startDate: new Date("2023-05-17T14:00Z"),
        endDate: new Date("2023-06-18T14:00Z"),
      },
    },
    {
      type: "zkForm",
      metadata: {
        name: "Artwork Claiming",
        description:
          "Check if you won in the lottery and enter your shipping address to receive the ‘Privacy Is Normal’ artwork - without doxxing your wallet 👀",
        tags: ["Artwork"],
        image: "privacy_is_normal_apps_print_500x500.png",
        ctaText: "Claim Your Artwork",
        slug: "artwork-claim",
        createdAt: new Date("2022-07-01T00:00:00.000Z"),
      },
      sismoConnectRequest: {
        appId: "0x1941996d7a0245ccc2b203847d682298",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0xa199ee8b75688035fb40f8660adbcdac" }],
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
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Street address",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Apartment, unit, suite, etc",
            placeholder: "Optional",
            isRequired: false,
          },
          {
            type: "short-text",
            label: "City",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "State/Province",
            placeholder: "Optional",
            isRequired: false,
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
        ],
        congratulationsMessage: {
          title: "Congratulations!",
          description: "You will receive the ‘Privacy Is Normal’ artwork soon 💜",
        },
        output: {
          destination: {
            type: "google_sheet",
            spreadsheetId: "15KaDhCGxs8E6mmYw5kZkUYTXQoTsH9UAt27TLsbT6TE",
          },
        },
      },
    },
  ],
};
