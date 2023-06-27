// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

export const sismoConfig: SpaceConfig = {
  slug: "sismo",
  name: "Sismo",
  description: "This Space is a tribute to members of the Sismo Community (level 1, 2 and 3). Prove you are a Sismo Community member and access Apps based on your level. Eligibility groups are updated daily. Learn more to upgrade: community.sismo.io",
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
  envs: ["Demo", "Prod"],
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
      name: "Newsletter Subscription",
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
        "Provide feedback to help us improve your Sismo Space experience and become a Sismo Contributor Level 1.",
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
      ],
      startDate: new Date("2023-05-12T18:00"),
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
        impersonateAddresses: ["0x85ff01cff157199527528788ec4ea6336615c989"]
      },
      envs: ["Demo"],
    },
    {
      type: "zksub",
      name: "Alpha Tester Registration",
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
        impersonateAddresses: [
          "twitter:VitalikButerin:423423",
          "0x74ce5c3cab7bea5fe742a6636101f42f66909475", 
          "0xff9a11ceca9f3f96e661cc549962984d770b615c"
        ]
      },
      envs: ["Demo"],
    },
    {
      type: "zksub",
      name: "Contributors' Anon Wall Publication",
      description:
        "Write a public message on the Sismo Contributors' Anon Wall - available to all members of the Sismo Community.",
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
      claimRequests: [{ groupId: "0xd630aa769278cacde879c5c0fe5d203c", value: 1, isSelectableByUser: true }],
      demo: {
        spreadsheetId: "1-sb-qxoicB6OKF_ERE8HCYlEA8CQHBYU3M9dQNksML4",
        appId: "0x90db0519f15b523cd41bc3557f6d6b91",
        impersonateAddresses: ["0x8ab1760889F26cBbf33A75FD2cF1696BFccDc9e6"]
      },
      envs: ["Demo"],
    },
    /*{
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
        impersonateAddresses: ["0x8ab1760889F26cBbf33A75FD2cF1696BFccDc9e6"]
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
        impersonateAddresses: ["github:Baoufa"]
      },
      envs: ["Demo"],
    },*/
    {
      type: "zksub",
      saveAuths: true,
      saveClaims: true,
      name: "Swag Box Lottery Registration",
      description:
        "Enter the lottery to win an exclusive swag box - available to all members of the Sismo Community. Each level grants one lottery ticket, and each Sybil-resistance ZK Proof shared multiplies your chances.",
      tags: ["Swag"],
      image: "sismoapps_swag_lotery_1014x720.png",
      CTAText: "Enter the Lottery",
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
          "We hope to have you as a lucky winner 💜 Stay in touch!",
      },
      slug: "swag-box",
      output: "google_sheet",
      appId: null,
      spreadsheetId: null,
      demo: {
        spreadsheetId: "1zD03W9S8mJVwkxMrjjGqX-jfxoQ3F3FQwOh1Ekmwdt4",
        appId: "0x0646e49829328aa58e4e13de4c6eb958",
        impersonateAddresses: ["0xfc43f5f9dd45258b3aff31bdbe6561d97e8b71de","0x8ab1760889F26cBbf33A75FD2cF1696BFccDc9e6", "twitter:dhadrien_:2390703980"]
      },
      claimRequests: [
        { groupId: "0xd630aa769278cacde879c5c0fe5d203c", isSelectableByUser: true },
        //{ groupId: "0x1cde61966decb8600dfd0749bd371f12", isOptional: true, isSelectableByUser: true },
        { groupId: "0x682544d549b8a461d7fe3e589846bb7b", isOptional:true },
        { groupId: "0x62b10d162a7ff12704f2d2eb8058cb3a", isOptional:true }
      ],
      userSelection: { type: "Lottery", numberOfWinners: 10 },
      authRequests: [{ authType: AuthType.VAULT }, { authType: AuthType.TWITTER, isOptional: true, isSelectableByUser: true} ],
      envs: ["Demo"],
    },
    {
      type: "zksub",
      name: "Future of France Invitation",
      description:
        "Register your email address to receive a ticket for the Future of France Party. The event will take place on July 17th during the EthCC week. Exclusively for members of Sismo Community Level 3.",
      tags: ["Ticket"],
      image: "sismo_appstore_fof_tickets.png",
      CTAText: "Register to get your Ticket",
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
          "See you there 💜 You will receive the ticket in a few days!",
      },
      slug: "ticket",
      output: "google_sheet",
      appId: null,
      spreadsheetId: null,
      demo: {
        spreadsheetId: "16NuT1HIJvM2jikRmHzN-ZSwJmjg_Ef1-6e-XbPff3z4",
        appId: "0x08ffa7336eb7bc0907a9f76ebc55aa4d",
        impersonateAddresses: ["0x8ab1760889F26cBbf33A75FD2cF1696BFccDc9e6"]
      },
      claimRequests: [
        { groupId: "0xd630aa769278cacde879c5c0fe5d203c", value: 3 }
      ],
      authRequests: [{ authType: AuthType.VAULT } ],
      envs: ["Demo"],
    },
    {
      type: "zksub",
      saveAuths: true,
      saveClaims: true,
      name: "Swag Box Lottery Registration",
      description:
        "Enter the lottery to win an exclusive swag box - available to all members of the Sismo Community. Each level grants one lottery ticket, and each Sybil-resistance ZK Proof shared multiplies your chances.",
      tags: ["Swag"],
      image: "sismoapps_swag_lotery_1014x720.png",
      CTAText: "Enter the Lottery",
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
          "We hope to have you as a lucky winner 💜 Stay in touch!",
      },
      endDate: new Date("2023-07-03T14:00"),
      slug: "swag-box",
      output: "google_sheet",
      appId: "0x80b2876a7dbe411813590a3b251de763",
      spreadsheetId: "1HfINfePvhujt3Y9CkpDVb_DYgeCegLrPeuhKnjEocsU",
      claimRequests: [
        { groupId: "0xd630aa769278cacde879c5c0fe5d203c", isSelectableByUser: true },
        { groupId: "0x1cde61966decb8600dfd0749bd371f12", isOptional: true, isSelectableByUser: true },
        { groupId: "0x682544d549b8a461d7fe3e589846bb7b", isOptional:true }
      ],
      userSelection: { type: "Lottery", numberOfWinners: 10 },
      authRequests: [{ authType: AuthType.VAULT }, { authType: AuthType.TWITTER, isOptional: true, isSelectableByUser: true} ],
      envs: ["Prod"],
    },
    {
      type: "zksub",
      name: "Future of France Invitation",
      description:
        "Register your email address to receive a ticket for the Future of France Party. The event will take place on July 17th during the EthCC week. Exclusively for members of Sismo Community Level 3.",
      tags: ["Ticket"],
      image: "sismo_appstore_fof_tickets.png",
      CTAText: "Register to get your Ticket",
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
          "See you there 💜 You will receive the ticket in a few days!",
      },
      endDate: new Date("2023-07-17T18:00"),
      slug: "ticket",
      output: "google_sheet",
      appId: "0x73316ca511efe1e14a63fcebdc9d8b24",
      spreadsheetId: "1sb_wAe84Im0VLaGsDv_IhNG-dSMjsJHb15Ur6hZ3mig",
      claimRequests: [
        { groupId: "0xd630aa769278cacde879c5c0fe5d203c", value: 3 }
      ],
      authRequests: [{ authType: AuthType.VAULT } ],
      envs: ["Prod"],
    },
  ],
};
