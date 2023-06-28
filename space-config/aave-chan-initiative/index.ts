// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType, ClaimType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

export const aaveChanInitiativeConfig: SpaceConfig = {
  slug: "aave-chan-initiative",
  name: "Aave-Chan Initiative",
  description:
    "This Space is a tribute to core delegators of Aave-Chan Initiative delegate address “Aavechan.eth” - an Aave protocol Delegate. Prove you are a core Aave-Chan delegator to get ACI Chad Swag based on your level (1, 2 or 3). Eligibility group has been generated once, on June 26. Level 1 represents delegators with >= 50 tokens delegated, level 2 with >= 250 and level 3 with >= 1,000.",
  profileImage: "space_aave_chan_initiative_pfp_400x400.png",
  coverImage: "space_aave_chan_initiative_cover_1740x540.png",
  socialLinks: [
    {
      type: "twitter",
      link: "https://twitter.com/AaveChan",
    },
  ],
  envs: ["Demo", "Prod"],
  hidden: false,
  apps: [
    {
      type: "zksub",
      saveAuths: true,
      saveClaims: true,
      name: "ACI Chads Swag Claiming",
      description:
        "Enter your delivery address to claim your Aave-Chan Initiative Chads Swag - without doxxing your wallet 👀 Important: don't forget to share your 'Aavechan Delegators' highest value to get more swags!",
      tags: ["Swag"],
      image: "aave_chan_initiative_apps_swag_1014x720.png",
      CTAText: "Claim your Swag",
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
          label: "(Optional) T-shirt size - only if shared value >= 2",
          placeholder: "XS/S/M/L/XL (EU Sizes)",
          helperText: "If you're US, take one Size above your usual one",
          isRequired: false,
        },
      ],
      congratulationsMessage: {
        title: "Congratulations!",
        description:
          "You will receive your exclusive ACI Chads Swag soon 💜",
      },
      slug: "swag",
      output: "google_sheet",
      appId: "0x02bcb449a6bd1062017cf0315375afdf",
      spreadsheetId: "1wMfP6bjQIshkB8V_pOUVG9fJsx_1PGGXYuf7aOMHVSI",
      authRequests: [{ authType: AuthType.VAULT }],
      claimRequests: [
        {
          groupId: "0xf0285dcfe412b24a6ac9a1c365b7b35d",
          isSelectableByUser: true
        }
      ],
      demo: {
        spreadsheetId: "1XeoiYJjibDi51Ogch5eZTUFRp-SqZ0w2q1Cozs4nqPA",
        appId: "0x02bcb449a6bd1062017cf0315375afdf",
        impersonateAddresses: ["0x5af25164a0f1207db70727a2c447d6a7b44b89d0"]
      },
      envs: ["Demo", "Prod"],
    }
  ],
};