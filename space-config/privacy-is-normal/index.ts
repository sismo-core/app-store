// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType, ClaimType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

export const privacyIsNormalConfig: SpaceConfig = {
  slug: "privacy-is-normal",
  name: "Privacy Is Normal 🌼",
  description:
  "This Space celebrates privacy as a fundamental human right. By proving you are a Tornado Cash user in a privacy-preserving manner and with a Gitcoin Passport, you were able to participate in our Sybil-resistant lottery. You can now check if you are among the 10 winners to receive a printed ‘Privacy Is Normal’ artwork.",
  profileImage: "space_privacy_is_normal_pfp_400x400.png",
  coverImage: "space_privacy_is_normal_cover_1740x540.png",
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
  envs: ["Prod", "Demo"],
  hidden: false,
  apps: [
    {
      type: "zksub",
      name: "Lottery Registration",
      description:
        "Enter the Sybil-resistant lottery to get a chance to be among the 10 lucky winners to receive the ‘Privacy Is Normal’ artwork.",
      tags: ["Artwork"],
      image: "privacy_is_normal_apps_lotery_1014x720.png",
      CTAText: "Enter the Sybil-Resistant Lottery",
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
        description:
          "We hope to have you among our lucky winners 💜 Stay in touch!",
      },
      startDate: new Date("2023-05-17T14:00Z"),
      endDate: new Date("2023-06-18T14:00Z"),
      slug: "artwork-lottery",
      output: "google_sheet",
      appId: "0x9dd13bc62ae6809fe9de95475111fc2a",
      spreadsheetId: "17uLGyCtSduW7PBTS2S2WKyourj9Z2nPKmAvzUD6kRM4",
      authRequests: [{ authType: AuthType.VAULT }],
      claimRequests: [
        {
          groupId: "0x433ae0c1cb3793f0971f3bf2bbcff10e",
        },
        {
          groupId: "0x1cde61966decb8600dfd0749bd371f12",
          claimType: ClaimType.GTE,
          value: 15,
        }
      ],
      demo: {
        spreadsheetId: null,
        appId: null,
      },
      envs: ["Prod"],
    },
    /*{
      type: "zkdrop",
      name: "‘Privacy Is Normal’ NFT",
      description:
        "Claim your ‘Privacy Is Normal’ NFT - a tribute to Tornado Cash's revolutionary code. Open to the first 1000 participants registered to our ‘Privacy Is Normal’ print lottery.",
      tags: ["NFT"],
      image: "privacy_is_normal_apps_nft_1014x720.png",
      CTAText: "Claim the ‘Privacy Is Normal’ NFT",
      chainId: 1,
      contractAddress: null,
      startDate: new Date("2023-07-03T18:00Z"),
      endDate: new Date("2023-07-18T18:00Z"),
      slug: "nft-claim",
      userSelection: {
        type: "Lottery",
        maxNumberOfEntries: 1000,
        numberOfWinners: 1000,
      },
      authRequests: [{ authType: AuthType.VAULT }],
      envs: ["Prod"],
    },*/
    {
      type: "zksub",
      name: "Artwork Claiming",
      description:
        "Check if you won in the lottery and enter your shipping address to receive the ‘Privacy Is Normal’ artwork - without doxxing your wallet 👀",       
      tags: ["Artwork"],
      image: "privacy_is_normal_apps_print_1014x720.png",
      CTAText: "Claim Your Artwork",
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
        }
      ],
      congratulationsMessage: {
        title: "Congratulations!",
        description:
          "You will receive the ‘Privacy Is Normal’ artwork soon 💜",
      },
      endDate: new Date("2023-07-03T14:00Z"),
      slug: "artwork-claim",
      output: "google_sheet",
      appId: "0x1941996d7a0245ccc2b203847d682298",
      spreadsheetId: "15KaDhCGxs8E6mmYw5kZkUYTXQoTsH9UAt27TLsbT6TE",
      authRequests: [{ authType: AuthType.VAULT }],
      claimRequests: [ { groupId: "0x7e89f2add43b3597cdcacad5437595db" } ],//to be changed to 0x5981720e2223883ff387639125abee2f
      envs: ["Prod"],
    },
    {
      type: "zksub",
      name: "Lottery Registration",
      description:
        "Register to have a chance to be among 10 lucky winners to get a ‘Privacy Is Normal’ artwork - open at our ETHDam Sismo booth.",
      tags: ["Artwork"],
      image: "privacy_is_normal_apps_lotery_1014x720.png",
      CTAText: "Participate in the Lottery",
      fields: [
        {
          type: "short-text",
          label: "Twitter",
          placeholder: "@handle",
          isRequired: true,
        },
      ],
      congratulationsMessage: {
        title: "Fingers crossed!",
        description:
          "We hope to have you among our lucky winners 💜 We will contact you if you win!",
      },
      startDate: new Date("2023-05-17T16:00Z"),
      endDate: new Date("2023-05-20T18:00Z"),
      slug: "artwork-lottery",
      output: "google_sheet",
      appId: null,
      spreadsheetId: null,
      authRequests: [{ authType: AuthType.VAULT }],
      claimRequests: [
        { groupId: "0x433ae0c1cb3793f0971f3bf2bbcff10e" },
        {
          groupId: "0x1cde61966decb8600dfd0749bd371f12",
          claimType: ClaimType.GTE,
          value: 15,
        },
      ],
      demo: {
        spreadsheetId: "1WWN_o4KOMQ3gtgFasvPHZGbKqza3hsGuEon6ew2gMLE",
        appId: "0x5749773b034573e615026216c628be4d",
        impersonateAddresses: [
          "0x85ff01cff157199527528788ec4ea6336615c989",
          "0x48724944608b7baacd2f7d10bdbc98d429967f7c"
        ]
      },
      envs: ["Demo"],
    },
    {
      type: "zksub",
      name: "Artwork Claiming",
      description:
        "Check if you won in the lottery and enter your shipping address to receive the ‘Privacy Is Normal’ artwork - without doxxing your wallet 👀",       
      tags: ["Artwork"],
      image: "privacy_is_normal_apps_print_1014x720.png",
      CTAText: "Claim Your Artwork",
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
        }
      ],
      congratulationsMessage: {
        title: "Congratulations!",
        description:
          "You will receive the ‘Privacy Is Normal’ artwork soon 💜",
      },
      endDate: new Date("2023-07-03T14:00Z"),
      slug: "artwork-claim",
      output: "google_sheet",
      appId: null,
      spreadsheetId: null,
      authRequests: [{ authType: AuthType.VAULT }],
      claimRequests: [ { groupId: "0x7e89f2add43b3597cdcacad5437595db" } ],
      demo: {
        spreadsheetId: "1hlAxg69kX1Z7RRh-prmkkYTiMFXcmFluGv_dcfTP7bg",
        appId: "0x325b16d643351175e190a43ce8066da9",
      },
      envs: ["Demo"],
    },
  ],
};
