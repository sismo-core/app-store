// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType, ClaimType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

export const aaveChanInitiativeConfig: SpaceConfig = {
  slug: "aave-chan-initiative",
  name: "Aave-Chan Initiative",
  description:
    "This Space is a tribute to delegates of Aave-Chan Initiative delegate address “Aavechan.eth”- an Aave protocol Delegate participating in governance discussions on Aave, and creating snapshot votes & AIPs for the benefit of the Aave protocol.",
  profileImage: "space_aave_chan_initiative_pfp_400×400.png",
  coverImage: "",
  socialLinks: [
    {
      type: "twitter",
      link: "https://twitter.com/AaveChan",
    },
  ],
  envs: ["Demo"],
  hidden: false,
  apps: [
    {
      type: "zksub",
      name: "Aave-Chan Initiative Swag Claiming",
      description:
        "Enter your delivery address to claim your Aave-Chan Initiative Swag.",
      tags: ["Swag"],
      image: "aave_chan_initiative_apps_swag_400x400.png",
      CTAText: "Claim",
      fields: [
        {
          type: "short-text",
          label: "Email",
          isRequired: true,
        },
        {
          type: "short-text",
          label: "Full name (P.O Box ok)",
          isRequired: true,
        },
        {
          type: "short-text",
          label: "Street address ((P.O Box ok)",
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
          label: "Drop here if you have a weird address",
          placeholder: "",
          isRequired: false,
        },
        {
          type: "short-text",
          label: "T-shirt size (only if delegated more than 10)",
          placeholder: "XS / S / M / L or XL (European Sizes, if you're US, take one Size above your usual one)",
          isRequired: false,
        },
      ],
      congratulationsMessage: {
        title: "Congratulations!",
        description:
          "You will receive your exclusive Aave-Chan Initiative Swag soon 💜",
      },
      slug: "swag",
      output: "google_sheet",
      appId: "",
      spreadsheetId: "",
      authRequests: [{ authType: AuthType.VAULT }],
      claimRequests: [
        {
          groupId: "0x433ae0c1cb3793f0971f3bf2bbcff10e",
          isSelectableByUser: true,
          claimType: ClaimType.GTE,
          value: 1,
        }
      ],
      demo: {
        spreadsheetId: "1XeoiYJjibDi51Ogch5eZTUFRp-SqZ0w2q1Cozs4nqPA",
        appId: "0x02bcb449a6bd1062017cf0315375afdf",
      },
      envs: ["Demo"],
    }
  ],
};