// add an images folder in your space folder if you would like Sismo to host your images
// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType, ClaimType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

export const privacyIsNormalConfig: SpaceConfig = {
  slug: "privacy-is-normal",
  name: "Privacy Is Normal 🌼",
  description:
    "This Space celebrates privacy as a fundamental human right. Get your Gitcoin Passport and enter the Sybil-resistant lottery by proving you’re a Tornado Cash user in a privacy-preserving manner. Eligibility groups are updated daily. Ten winners will receive a printed 'Privacy Is Normal' artwork. The NFT version will be claimable by the first 1000 participants.",
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
      name: "Artwork Lottery",
      description:
        "Enter the Sybil-resistant lottery to get a chance to be among the 10 lucky winners to receive the ‘Privacy Is Normal’ artwork. The first 1000 participants will receive the NFT version.",
      tags: ["Lottery"],
      image: "privacy_is_normal_apps_lotery_1014x720.png",
      CTAText: "Enter the Sybil-resistant Lottery",
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
      slug: "print-lottery",
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

    {
      type: "zkdrop",
      name: "‘Privacy Is Normal’ NFT",
      description:
        "Claim your ‘Privacy Is Normal’ NFT - a tribute to Tornado Cash's revolutionary code. Open to the first 1000 participants registered to our ‘Privacy Is Normal’ print lottery.",
      tags: ["NFT"],
      image: "privacy_is_normal_apps_nft_1014x720.png",
      CTAText: "Claim the ‘Privacy Is Normal’ NFT",
      chainId: 1,
      contractAddress: null,
      startDate: new Date("2023-06-18T18:00Z"),
      endDate: new Date("2023-07-18T18:00Z"),
      slug: "nft-claim",
      userSelection: {
        type: "Lottery",
        maxNumberOfEntries: 1000,
        numberOfWinners: 1000,
      },
      authRequests: [{ authType: AuthType.VAULT }],
      envs: ["Prod"],
    },
    {
      type: "zksub",
      name: "‘Privacy Is Normal’ Artwork",
      description:
        "Check if you won a printed version of the ‘Privacy Is Normal’ NFT - a tribute to Tornado Cash's revolutionary code - and provide us with your shipping address.",
      tags: ["Print"],
      image: "privacy_is_normal_apps_print_1014x720.png",
      CTAText: "Check if you are a winner",
      fields: [
        {
          type: "short-text",
          label: "Claiming Address",
          placeholder: "Provide the address you will use to claim the NFT",
          isRequired: true,
        },
      ],
      congratulationsMessage: {
        title: "Congratulations",
        description:
          "You will soon receive the physical version of our ‘Privacy Is Normal’ NFT 💜 You can also claim the NFT version if you haven't already.",
      },
      startDate: new Date("2023-06-18T18:00Z"),
      endDate: new Date("2023-07-18T18:00Z"),
      slug: "print-claim",
      userSelection: {
        type: "Lottery",
        maxNumberOfEntries: 10,
        numberOfWinners: 10,
      },
      output: "google_sheet",
      appId: null,
      spreadsheetId: null,
      authRequests: [{ authType: AuthType.VAULT }],
      claimRequests: [], //add winners lottery group
      demo: {
        spreadsheetId: null,
        appId: null,
      },
      envs: ["Prod"],
    },

    {
      type: "zksub",
      name: "‘Privacy Is Normal’ Print Lottery",
      description:
        "Register to have a chance to be among 10 lucky winners to get a ‘Privacy Is Normal’ print - open at our ETHDam Sismo booth.",
      tags: ["Lottery"],
      image: "privacy_is_normal_apps_lotery_1014x720.png",
      CTAText: "Participate in the Print Lottery",
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
      slug: "print-lottery",
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
      },
      envs: ["Demo"],
    },
  ],
};
