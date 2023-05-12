// add an images folder in your space folder if you would like Sismo to host your images

import { SpaceConfig } from "../types";

export const sismoConfig: SpaceConfig = {
  slug: "sismo",
  name: "Sismo",
  description: "Sismo enables users to selectively disclose personal data to apps with Sismo Connect (SSO) and ZK Badges (SBTs). Get the most of your data.",
  //profileImage: "pfp_Space_TheMergeContributors_400x400.png",
  //coverImage: "Cover_Space_TheMergeContributors_1160x340.png",
  socialLinks:[
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
  hidden: true,
  apps: [
    {
      type: "zkbadge",
      name: "Sismo Contributor ZK Badge",
      description: "Claim your Sismo Contributor ZK Badge to voice your opinion in Sismo Governance - open to Sismo contributors.",
      tags: ["ZK Badge"],
      image: "Mergooor_NFT_1014x720px.png",
      CTAText: "Get ZK Badge",
      chainId: 137,
      collectionId: "5151110",
      claimRequests: [{ groupId: "0x43db071ed6277abbe0fbd36869211e80" }],
      slug: "sismo-zkbadge",
      authRequests: [
        {
          authType: 0,
        }
      ],
    },
    {
      type: "zksub",
      name: "Sismo Newsletter",
      description:
        "Register your email address to receive the Sismo newsletter - open to all.",
      tags: ["Newsletter"],
      image: "EthCCtickets_1014x720px.png",
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
      slug: "sismo-newsletter",
      output: "google_sheet",
      appId: null,
      spreadsheetId: null,
      claimRequests: [{ groupId: "0x42c768bb8ae79e4c5c05d3b51a4ec74a" }],
      authRequests: [{ authType: 0 }],//, { authType: 2 }, { authType: 1, isOptional: true }
      demo: {
        spreadsheetId: "1Z61ZMWOFhXhp8rt2T6ewpFRMR_CtF0XL6sBIUz4KeQQ-loRa-Y",
        appId: "0xe083ec4268d2c75e41ec6e08b4373882",
      }
    },
    {
      type: "zksub",
      name: "Sismo Space Feedback",
      description:
        "Provide feedback to help us improve your Sismo Spaces experience and become a Sismo Contributor Level 1 - open to all.",
      tags: ["Feedback"],
      image: "EthCCtickets_1014x720px.png",
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
        {
          type: "short-text",
          label: "How easy was it to access this form?",
          isRequired: true,
        },
      ],
      startDate: new Date("2023-05-12T18:00"),
      endDate: new Date("2023-05-26T18:00"),
      congratulationsMessage: {
        title: "Thank you",
        description:
          "Your feedback will help Sismo a lot 💜",
      },
      slug: "sismo-feedback",
      output: "google_sheet",
      appId: null,
      spreadsheetId: null,
      authRequests: [{ authType: 0 }],//, { authType: 2 }
      demo: {
        spreadsheetId: "1VBYLvo6x1R34kPhr9DVxYmNx6uzm_FtHczsbaDL-7dU",
        appId: "0xc429ae9dc0e1fea6591244cdc70ee626",
      }
    },
  ],
};
