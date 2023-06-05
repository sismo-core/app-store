// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

export const sismoConfig: SpaceConfig = {
  slug: "sismo",
  name: "Sismo",
  description: "Sismo enables users to selectively disclose personal data to apps with Sismo Connect (SSO) and ZK Badges (SBTs). Get the most of your data.",
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
  envs: ["Demo"],
  hidden: false,
  apps: [
    // {
    //   type: "zkbadge",
    //   name: "Sismo Contributor ZK Badge",
    //   description: "Claim your Sismo Contributor ZK Badge to voice your opinion in Sismo Governance - open to Sismo Contributors.",
    //   tags: ["ZK Badge"],
    //   image: "sismoapps_zkbadge_contrib_1014x720.png",
    //   CTAText: "Get ZK Badge",
    //   chainId: 137,
    //   collectionId: "5151110",
    //   claimRequests: [
    //     { 
    //       groupId: "0xe9ed316946d3d98dfcd829a53ec9822e",
    //       value: 1,
    //       isSelectableByUser: true
    //     }
    //   ],
    //   authRequests: [
    //     {
    //       authType: AuthType.VAULT,
    //     }
    //   ],
    //   slug: "contributor-zkbadge",
    // },
    {
      type: "zksub",
      name: "Sismo Newsletter",
      description:
        "Register your email address to receive the Sismo newsletter - open to all.",
      tags: ["Newsletter"],
      image: "sismoapps_newletter_1014x720.png",
      CTAText: "Subscribe to the Newsletter",
      fields: [
        {
          type: "short-text",
          label: "Email",
          isRequired: true,
        },
      ],
      congratulationsMessage: {
        title: "Congratulations",
        description:
          "You will now receive our Sismo Newsletter 💜",
      },
      slug: "newsletter",
      output: "google_sheet",
      appId: null,
      spreadsheetId: null,
      authRequests: [{ authType: AuthType.VAULT }, { authType: AuthType.TWITTER, isSelectableByUser: true }, { authType: AuthType.GITHUB, isOptional: true }],
      demo: {
        spreadsheetId: "1Z61ZMWOFhXhp8rt2T6ewpFRMR_CtF0XL6sBIUz4KeQQ",
        appId: "0xe083ec4268d2c75e41ec6e08b4373882",
      },
      envs: ["Demo"],
    },
    {
      type: "zksub",
      name: "Sismo Space Feedback",
      description:
        "Provide feedback to help us improve your Sismo Space experience and become a Sismo Contributor Level 1 - open to Gitcoin Passport holders.",
      tags: ["Feedback"],
      image: "sismoapps_feedback_1014x720.png",
      CTAText: "Give Feedback",
      fields: [
        {
          type: "short-text",
          label: "What is your favourite app?",
          isRequired: true,
        },
        {
          type: "short-text",
          label: "Why is it your favourite app?",
          isRequired: true,
        },
        {
          type: "short-text",
          label: "Have you encountered any difficulties while using Spaces?",
          isRequired: true,
        },
        {
          type: "short-text",
          label: "What improvements would make your experience with Spaces even better?",
          isRequired: true,
        },
        // Need to implement the number input
        // {
        //   type: "number",
        //   label: "How easy was it to access this form?",
        //   isRequired: true,
        // },
      ],
      startDate: new Date("2023-05-12T18:00"),
      endDate: new Date("2023-05-26T18:00"),
      congratulationsMessage: {
        title: "Thank you",
        description:
          "Your feedback will help Sismo a lot 💜",
      },
      slug: "space-feedback",
      output: "google_sheet",
      appId: null,
      spreadsheetId: null,
      claimRequests: [{ groupId: "0x1cde61966decb8600dfd0749bd371f12", isOptional: true }],
      authRequests: [{ authType: AuthType.VAULT }, { authType: AuthType.TWITTER, isSelectableByUser: true}],
      demo: {
        spreadsheetId: "1VBYLvo6x1R34kPhr9DVxYmNx6uzm_FtHczsbaDL-7dU",
        appId: "0xc429ae9dc0e1fea6591244cdc70ee626",
      },
      envs: ["Demo"],
    },
    {
      type: "zksub",
      name: "Sismo Alpha Tester",
      description:
        "Register to become a Sismo Alpha Tester - open to Ethereum Power Users & ENS Domains Holders.",
      tags: ["Alpha"],
      image: "sismoapps_alpha_tester_1014x720.png",
      CTAText: "Become an Alpha Tester",
      fields: [
        {
          type: "short-text",
          label: "Email",
          isRequired: false,
        }
      ],
      congratulationsMessage: {
        title: "Thank you",
        description:
          "We hope to see you at our future testing session 💜",
      },
      slug: "alpha-tester",
      output: "google_sheet",
      appId: null,
      spreadsheetId: null,
      claimRequests: [{ groupId: "0x4ad1cfd0eb55f578e7690ecd06aa250b" }, { groupId: "0x8b64c959a715c6b10aa8372100071ca7" }],
      authRequests: [{ authType: AuthType.VAULT }, { authType: AuthType.TWITTER, isSelectableByUser: true }],
      demo: {
        spreadsheetId: "1WF3taIR9qy1mAFOKhwZRQKeIBMfoxib7uMlXa_zV3-s",
        appId: "0x7cef438f591d7b391a3eae11b2bd7868",
      },
      envs: ["Demo"],
    },
    {
      type: "zksub",
      name: "Sismo Contributors' Anon Wall",
      description:
        "Write a public message on the Sismo Contributors' Anon Wall - open to Sismo Contributors.",
      tags: ["Feedback"],
      image: "sismoapps_anon_wall_1014x720.png",
      CTAText: "Publish on Contributors' Anon Wall",
      fields: [
        {
          type: "short-text",
          label: "What would you like to tell us?",
          isRequired: true,
        }
      ],
      congratulationsMessage: {
        title: "Thank you for your message",
        description:
          "It will be forever published on the Sismo Contributors' Anon Wall 💜",
      },
      slug: "anon-wall",
      output: "google_sheet",
      appId: null,
      spreadsheetId: null,
      claimRequests: [{ groupId: "0xe9ed316946d3d98dfcd829a53ec9822e", value: 1, isSelectableByUser: true }],
      demo: {
        spreadsheetId: "1-sb-qxoicB6OKF_ERE8HCYlEA8CQHBYU3M9dQNksML4",
        appId: "0x90db0519f15b523cd41bc3557f6d6b91",
      },
      envs: ["Demo"],
    },
    {
      type: "zksub",
      name: "Sismo Events",
      description:
        "Pre-register to the future Sismo events - open to Sismo Contributors.",
      tags: ["Event"],
      image: "sismoapps_sismo_events_1014x720.png",
      CTAText: "Pre-register to Sismo events",
      fields: [
        {
          type: "short-text",
          label: "Email",
          isRequired: true,
        }
      ],
      congratulationsMessage: {
        title: "Congratulations",
        description:
          "We hope to see you at our future events 💜",
      },
      failedMessage: {
        title: "Sorry, too late this time 😕",
        description: "Stay in touch for the next one 💜",
      },
      slug: "event",
      output: "google_sheet",
      appId: null,
      spreadsheetId: null,
      authRequests: [{ authType: AuthType.VAULT }],
      claimRequests: [{ groupId: "0xe9ed316946d3d98dfcd829a53ec9822e", value: 1, isSelectableByUser: true }],
      userSelection: { type: "FCFS", maxNumberOfUsers: 100 },
      demo: {
        spreadsheetId: "1XTLPEOM0RL8WpjMm1dXYNpkYq3Wk1G1K7Jk-RntqfjA",
        appId: "0xb3a074e124ff04ee0d703b528bfd5f4d",
      },
      envs: ["Demo"],
    },
    {
      type: "zksub",
      name: "Sismo Swag Lottery",
      description:
        "Register to have a chance to be one of 10 lucky winners to get Sismo swag - open to Sismo GitHub Contributors.",
      tags: ["Swag"],
      image: "sismoapps_swag_lotery_1014x720.png",
      CTAText: "Participate in the Swag Lottery",
      fields: [
        {
          type: "short-text",
          label: "Email",
          isRequired: true,
        }
      ],
      congratulationsMessage: {
        title: "Fingers crossed!",
        description:
          "We hope to have you as a lucky winner 💜 ",
      },
      startDate: new Date("2023-05-12T18:00"),
      endDate: new Date("2023-05-26T18:00"),
      slug: "swag",
      output: "google_sheet",
      appId: null,
      spreadsheetId: null,
      claimRequests: [{ groupId: "0xd138c33e8a6a450336a6c5dda990cf95" }],
      userSelection: { type: "Lottery", maxNumberOfEntries: null, numberOfWinners: 10 },
      authRequests: [{ authType: AuthType.VAULT }],
      demo: {
        spreadsheetId: "1GaSpQ3-SO_mWDreh97Nri2YSF5LeRYKUEuUjImF8Cxk",
        appId: "0x4f7fef07fcdce0a81e8f2ea14e8ea6c0",
      },
      envs: ["Demo"],
    },
    {
      type: "zksub",
      name: "Sismo Swag Box",
      description:
        "Enter the Sybil-resistant lottery for a chance to win an exclusive swag box, available to all members of the Sismo Community (level 1, 2 and 3). Each level grants one lottery ticket.",
      tags: ["Lottery"],
      image: "sismoapps_swag_lotery_1014x720.png",
      CTAText: "Win a Swag Box in the Lottery",
      fields: [
        {
          type: "short-text",
          label: "Email",
          isRequired: true,
        }
      ],
      congratulationsMessage: {
        title: "Fingers crossed!",
        description:
          "We hope to have you as a lucky winner 💜 ",
      },
      startDate: null,
      endDate: new Date("2023-06-21T14:00"),
      slug: "swag-box",
      output: "google_sheet",
      appId: "0x80b2876a7dbe411813590a3b251de763",
      spreadsheetId: "1HfINfePvhujt3Y9CkpDVb_DYgeCegLrPeuhKnjEocsU",
      claimRequests: [
        //{ groupId: null, value: 1, isSelectableByUser: true },
        { groupId: "0x1cde61966decb8600dfd0749bd371f12", isOptional:true, isSelectableByUser: true },
        { groupId: "0x682544d549b8a461d7fe3e589846bb7b", isOptional:true }
      ],
      userSelection: { type: "Lottery", maxNumberOfEntries: null, numberOfWinners: 10 },
      authRequests: [{ authType: AuthType.VAULT }, { authType: AuthType.TWITTER, isOptional: true, isAnon: true, isSelectableByUser: true} ],
      envs: ["Prod"],
    },
    {
      type: "zksub",
      name: "Future of France Invite",
      description:
        "Claim your ticket to the Future of France event during EthCC week. Exclusively for members of Sismo Community level 3.",
      tags: ["Event"],
      image: "sismoapps_sismo_events_1014x720.png",
      CTAText: "Claim the ticket",
      fields: [
        {
          type: "short-text",
          label: "Email",
          isRequired: true,
        }
      ],
      congratulationsMessage: {
        title: "Congratulations!",
        description:
          "We are excited to see you there 💜 Stay in touch for the details!",
      },
      startDate: null,
      endDate: new Date("2023-07-17T18:00"),
      slug: "event-fof",
      output: "google_sheet",
      appId: "0x73316ca511efe1e14a63fcebdc9d8b24",
      spreadsheetId: "1sb_wAe84Im0VLaGsDv_IhNG-dSMjsJHb15Ur6hZ3mig",
      /*claimRequests: [//add Sismo Community group once done lvl 3
        { groupId: null, value: 3 }
      ],*/
      authRequests: [{ authType: AuthType.VAULT } ],
      envs: ["Prod"],
    },
  ],
};
