// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType, ClaimType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

export const privacyIsNormalConfig: SpaceConfig = {
  slug: "privacy-is-normal",
  name: "Privacy Is Normal Space",
  description: "This Space celebrates censorship resistance and privacy as a fundamental human right. Prove that you're a Tornado Cash user to claim a 'Privacy Is Normal' NFT - a tribute to Tornado Cash's revolutionary code. Use the NFT to redeem a physical version.",
  profileImage: "space_sismo_pfp_400x400.png",
  coverImage: "space_sismo_cover_1740x540.png",
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
  envs: ["Prod","Demo"],
  hidden: false,
  apps: [
    {
      type: "zksub",
      name: "‘Privacy Is Normal’ NFT Lottery",
      description:
        "Register to have a chance to be among 100 lucky winners to claim a ‘Privacy Is Normal’ NFT and use it to redeem a physical version.- open to Tornado Cash depositors.",
      tags: ["Lottery"],
      image: "sismoapps_newletter_1014x720.png",
      CTAText: "Participate in the NFT Lottery",
      fields: [
        {
          type: "short-text",
          label: "Email",
          isRequired: false,
        }
      ],
      congratulationsMessage: {
        title: "Fingers crossed!",
        description:
          "We hope to have you among our lucky winners 💜 We will contact you if you win!",
      },
      startDate: new Date("2023-05-19T16:00"),
      endDate: new Date("2023-05-21T16:00"),
      slug: "nft-lottery",
      output: "google_sheet",
      appId: "0x9dd13bc62ae6809fe9de95475111fc2a",
      spreadsheetId: "17uLGyCtSduW7PBTS2S2WKyourj9Z2nPKmAvzUD6kRM4",
      userSelection: { type: "Lottery", maxNumberOfEntries: null, numberOfWinners: 100 },
      authRequests: [{ authType: AuthType.VAULT }, { authType: AuthType.TWITTER, isSelectableByUser: true }],
      claimRequests: [{ groupId: "0x433ae0c1cb3793f0971f3bf2bbcff10e" }, { groupId: "0x1cde61966decb8600dfd0749bd371f12", claimType: ClaimType.GTE , value: 15 }],
      demo: {
        spreadsheetId: null,
        appId: null,
      },
      envs: ["Prod"],
    },
    {
      type: "zksub",
      name: "[PROD TEST APP] ‘Privacy Is Normal’ NFT Lottery",
      description:
        "Register to have a chance to be among 100 lucky winners to claim a ‘Privacy Is Normal’ NFT and use it to redeem a physical version.- open to Tornado Cash depositors.",
      tags: ["Lottery"],
      image: "sismoapps_newletter_1014x720.png",
      CTAText: "[PROD TEST APP] Participate in the NFT Lottery",
      fields: [
        {
          type: "short-text",
          label: "Email",
          isRequired: false,
        }
      ],
      congratulationsMessage: {
        title: "Fingers crossed!",
        description:
          "We hope to have you among our lucky winners 💜 We will contact you if you win!",
      },
      startDate: new Date("2023-05-19T16:00"),
      endDate: new Date("2023-05-21T16:00"),
      slug: "nft-lottery-test",
      output: "google_sheet",
      appId: "0x9dd13bc62ae6809fe9de95475111fc2a",
      spreadsheetId: "17uLGyCtSduW7PBTS2S2WKyourj9Z2nPKmAvzUD6kRM4",
      userSelection: { type: "Lottery", maxNumberOfEntries: null, numberOfWinners: 100 },
      authRequests: [{ authType: AuthType.VAULT }],
      claimRequests: [{ 
        groupId: "0xe9ed316946d3d98dfcd829a53ec9822e" 
      }, { 
        groupId: "0x1cde61966decb8600dfd0749bd371f12", 
        claimType: ClaimType.GTE, 
        value: 5
      }],
      demo: {
        spreadsheetId: null,
        appId: null,
      },
      envs: ["Prod"],
    },
    {
      type: "zksub",
      name: "[PROD TEST APP CONTRIBUTOR] ‘Privacy Is Normal’ NFT Lottery",
      description:
        "Register to have a chance to be among 100 lucky winners to claim a ‘Privacy Is Normal’ NFT and use it to redeem a physical version.- open to Tornado Cash depositors.",
      tags: ["Lottery"],
      image: "sismoapps_newletter_1014x720.png",
      CTAText: "[PROD TEST APP CONTRIBUTOR] Participate in the NFT Lottery",
      fields: [
        {
          type: "short-text",
          label: "Email",
          isRequired: false,
        }
      ],
      congratulationsMessage: {
        title: "Fingers crossed!",
        description:
          "We hope to have you among our lucky winners 💜 We will contact you if you win!",
      },
      startDate: new Date("2023-05-19T16:00"),
      endDate: new Date("2023-05-21T16:00"),
      slug: "nft-lottery-test-contributor",
      output: "google_sheet",
      appId: "0x9dd13bc62ae6809fe9de95475111fc2a",
      spreadsheetId: "17uLGyCtSduW7PBTS2S2WKyourj9Z2nPKmAvzUD6kRM4",
      userSelection: { type: "Lottery", maxNumberOfEntries: null, numberOfWinners: 100 },
      authRequests: [{ authType: AuthType.VAULT }],
      claimRequests: [{ 
        groupId: "0xe9ed316946d3d98dfcd829a53ec9822e", 
        claimType: ClaimType.GTE, 
        value: 2
      }],
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
        "Register to have a chance to be among 10 lucky winners to get a ‘Privacy Is Normal’ Print - open at our ETHDam Sismo Booth.",
      tags: ["Lottery"],
      image: "sismoapps_newletter_1014x720.png",
      CTAText: "Participate in the Print Lottery",
      fields: [
        {
          type: "short-text",
          label: "Twitter",
          placeholder: "@handle",
          isRequired: true,
        }
      ],
      congratulationsMessage: {
        title: "Fingers crossed!",
        description:
          "We hope to have you among our lucky winners 💜 We will contact you if you win!",
      },
      startDate: new Date("2023-05-19T16:00"),
      endDate: new Date("2023-05-20T18:00"),
      slug: "print-lottery",
      output: "google_sheet",
      appId: null,
      spreadsheetId: null,
      userSelection: { type: "Lottery", maxNumberOfEntries: null, numberOfWinners: 10 },
      authRequests: [{ authType: AuthType.VAULT }, { authType: AuthType.TWITTER, isSelectableByUser: true }],
      claimRequests: [{ groupId: "0x433ae0c1cb3793f0971f3bf2bbcff10e" }, { groupId: "0x1cde61966decb8600dfd0749bd371f12", claimType: ClaimType.GTE, value: 15 }],
      demo: {
        spreadsheetId: "1WWN_o4KOMQ3gtgFasvPHZGbKqza3hsGuEon6ew2gMLE",
        appId: "0x5749773b034573e615026216c628be4d",
      },
      envs: ["Demo"],
    }
  ],
};
