// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType, ClaimType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

export const privacyIsNormalConfigDemo: SpaceConfig = {
  metadata: {
    slug: "privacy-is-normal",
    name: "Privacy Is Normal 🌼",
    description:
      "This Space celebrates privacy as a fundamental human right. By proving you are a Tornado Cash user in a privacy-preserving manner and with a Gitcoin Passport, you were able to participate in our Sybil-resistant lottery. 10 winners have been selected to receive a printed ‘Privacy Is Normal’ artwork.",
    profileImage: "space_privacy_is_normal_pfp_400x400.png",
    coverImage: "space_privacy_is_normal_cover_1740x540.png",
    socialLinks: [
      {
        type: "link",
        link: "https://case-studies.sismo.io/db/anon-lottery",
      },
      {
        type: "twitter",
        link: "https://twitter.com/Sismo_eth/status/1659164330900746240?s=20",
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
          "Register to have a chance to be among 10 lucky winners to get a ‘Privacy Is Normal’ artwork'.",
        tags: ["Artwork"],
        image: "privacy_is_normal_apps_lotery_1014x720.png",
        ctaText: "Participate in the Lottery",
        createdAt: new Date("2022-07-01T00:00:00.000Z"),
      },
      sismoConnectRequest: {
        appId: "0x5749773b034573e615026216c628be4d",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [
          { groupId: "0x433ae0c1cb3793f0971f3bf2bbcff10e" },
          {
            groupId: "0x1cde61966decb8600dfd0749bd371f12",
            claimType: ClaimType.GTE,
            value: 15,
          },
        ],
        impersonateAddresses: [
          "0x85ff01cff157199527528788ec4ea6336615c989",
          "0x48724944608b7baacd2f7d10bdbc98d429967f7c",
        ],
      },
      templateConfig: {
        congratulationsMessage: {
          title: "Fingers crossed!",
          description:
            "We hope to have you among our lucky winners 💜 We will contact you if you win!",
        },
        output: {
          destination: {
            type: "google_sheet",
            spreadsheetId: "1WWN_o4KOMQ3gtgFasvPHZGbKqza3hsGuEon6ew2gMLE",
          },
        },
      },
      options: {
        startDate: new Date("2023-05-17T16:00Z"),
      },
    },
    {
      type: "zkForm",
      metadata: {
        name: "Artwork Claiming",
        slug: "artwork-claim",
        description:
          "[DEMO] Artwork Claiming App: you will impersonate ‘demo.eth’ that is the unique winner in the demo environment of the ‘Privacy Is Normal’ lottery.",
        tags: ["Artwork"],
        image: "privacy_is_normal_apps_print_1014x720.png",
        ctaText: "Claim Your Artwork",
        createdAt: new Date("2022-07-01T00:00:00.000Z"),
      },
      sismoConnectRequest: {
        appId: "0x325b16d643351175e190a43ce8066da9",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0x406925cbd710f4fd10c5b304777cd073" }],
        impersonateAddresses: [
          "0xfc43f5f9dd45258b3aff31bdbe6561d97e8b71de",
          "github:demo",
          "twitter:demo:159203775",
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
            spreadsheetId: "1hlAxg69kX1Z7RRh-prmkkYTiMFXcmFluGv_dcfTP7bg",
          },
        },
      },
      options: {
        endDate: new Date("2023-07-03T14:00Z"),
      },
    },
  ],
};
