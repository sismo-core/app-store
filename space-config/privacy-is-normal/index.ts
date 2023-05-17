// add an images folder in your space folder if you would like Sismo to host your images
// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType, ClaimType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

export const privacyIsNormalConfig: SpaceConfig = {
  slug: "privacy-is-normal",
  name: "Privacy Is Normal Space",
  description: "This Space celebrates censorship resistance and privacy as a fundamental human right. Prove in a privacy-preserving way that you're a Tornado Cash user to claim a 'Privacy Is Normal' NFT - a tribute to Tornado Cash's revolutionary code - and have a chance to get the physical version.",
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
      name: "‘Privacy Is Normal’ Print Lottery",
      description:
        "Register to have a chance to be among 10 lucky winners to get physical version of ‘Privacy Is Normal’ NFT - open to Tornado Cash depositors. First 1,000 participants will receive the NFT.",
      tags: ["Lottery"],
      image: "sismoapps_newletter_1014x720.png",
      CTAText: "Participate in the Print Lottery",
      fields: [
        {
          type: "short-text",
          label: "Claiming Address",
          placeholder: "Provide the address you will use to claim the NFT",
          isRequired: true,
        }
      ],
      congratulationsMessage: {
        title: "Fingers crossed!",
        description:
          "We hope to have you among our lucky winners :purple_heart: Stay in touch!",
      },
      startDate: new Date("2023-05-18T14:00"),
      endDate: new Date("2023-06-18T14:00"),
      slug: "print-lottery",
      output: "google_sheet",
      appId: "0x9dd13bc62ae6809fe9de95475111fc2a",
      spreadsheetId: "17uLGyCtSduW7PBTS2S2WKyourj9Z2nPKmAvzUD6kRM4",
      userSelection: { type: "Lottery", maxNumberOfEntries: 1000, numberOfWinners: 10 },
      authRequests: [{ authType: AuthType.VAULT }],
      claimRequests: [{ 
        groupId: "0x23ff9e30e9957c65ee56b4c902b28eae" //tornado depositor: 0x433ae0c1cb3793f0971f3bf2bbcff10e
      }, { 
        groupId: "0x1cde61966decb8600dfd0749bd371f12", claimType: ClaimType.GTE , value: 15  //tornado-test-wei-ben
      }],
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
        "Claim your ‘Privacy Is Normal’ NFT - a tribute to Tornado Cash's revolutionary code. Open to first 1,000 participants registered to our ‘Privacy Is Normal’ Print Lottery.",
      tags: ["NFT"],
      image: "sismoapps_newletter_1014x720.png",
      CTAText: "Claim ‘Privacy Is Normal’ NFT",
      chainId: 1,
      contractAddress: null,
      startDate: new Date("2023-06-18T18:00"),
      endDate: new Date("2023-07-18T18:00"),
      slug: "nft-claim",
      authRequests: [{ authType: AuthType.VAULT }],
      envs: ["Prod"],
    },
    {
      type: "zksub",
      name: "‘Privacy Is Normal’ Print",
      description:
        "Check if you win a physical version of the ‘Privacy Is Normal’ NFT - a tribute to Tornado Cash's revolutionary code - and provide us your shipping address.",
      tags: ["Print"],
      image: "sismoapps_newletter_1014x720.png",
      CTAText: "Check if you are a winner",
      fields: [
        {
          type: "short-text",
          label: "Claiming Address",
          placeholder: "Provide the address you will use to claim the NFT",
          isRequired: true,
        }
      ],
      congratulationsMessage: {
        title: "Congratulations",
        description:
          "You will soon receive the physical version of ‘Privacy Is Normal’ NFT :purple_heart: You can also claim the NFT version if not already.",
      },
      startDate: new Date("2023-06-18T18:00"),
      endDate: new Date("2023-07-18T18:00"),
      slug: "print-claim",
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
          "We hope to have you among our lucky winners :purple_heart: We will contact you if you win!",
      },
      startDate: new Date("2023-05-19T16:00"),
      endDate: new Date("2023-05-20T18:00"),
      slug: "print-lottery",
      output: "google_sheet",
      appId: null,
      spreadsheetId: null,
      authRequests: [{ authType: AuthType.VAULT }],
      claimRequests: [{ groupId: "0x433ae0c1cb3793f0971f3bf2bbcff10e" }, { groupId: "0x1cde61966decb8600dfd0749bd371f12", claimType: ClaimType.GTE, value: 15 }],
      demo: {
        spreadsheetId: "1WWN_o4KOMQ3gtgFasvPHZGbKqza3hsGuEon6ew2gMLE",
        appId: "0x5749773b034573e615026216c628be4d",
      },
      envs: ["Demo"],
    },

    /******************************************************************************************/
    /***************************************** TEST APPS **************************************/
    /******************************************************************************************/

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
          "We hope to have you among our lucky winners :purple_heart: We will contact you if you win!",
      },
      startDate: new Date("2023-05-19T16:00"),
      endDate: new Date("2023-05-21T16:00"),
      slug: "nft-lottery-test",
      output: "google_sheet",
      appId: "0x9dd13bc62ae6809fe9de95475111fc2a",
      spreadsheetId: "17uLGyCtSduW7PBTS2S2WKyourj9Z2nPKmAvzUD6kRM4",
      authRequests: [{ authType: AuthType.VAULT }],
      claimRequests: [{
        groupId: "0x23ff9e30e9957c65ee56b4c902b28eae"
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
          "We hope to have you among our lucky winners :purple_heart: We will contact you if you win!",
      },
      startDate: new Date("2023-05-19T16:00"),
      endDate: new Date("2023-05-21T16:00"),
      slug: "nft-lottery-test-contributor",
      output: "google_sheet",
      appId: "0x9dd13bc62ae6809fe9de95475111fc2a",
      spreadsheetId: "17uLGyCtSduW7PBTS2S2WKyourj9Z2nPKmAvzUD6kRM4",
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
  ],
};