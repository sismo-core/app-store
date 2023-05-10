// add an images folder in your space folder if you would like Sismo to host your images

import { SpaceConfig } from "../types";

export const sismoConfig: SpaceConfig = {
  slug: 'sismo',
  name: 'Sismo',
  description: "Sismo enables users to selectively disclose personal data to apps with Sismo Connect (SSO) and ZK Badges (SBTs). Get the most of your data",
  profileImage: "banner.png",
  coverImage: "banner.png",
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
  demoEnabled: false,
  hidden: false,
  apps: [
    {
      type: "zkbadge",
      name: "Sismo Contributor ZK Badge",
      description: "Claim your Sismo Contributor ZK Badge to voice your opinion in Sismo Governance - open to Sismo contributors.",
      tags: ["ZK Badge"],
      image: "https://aave.com/governanceGhosts.svg",
      CTAText: "Get NFT",
      chainId: 137,
      collectionId: "5151110",
      claimRequests: [{ groupId: "0x43db071ed6277abbe0fbd36869211e80" }],
      authRequests: [{ authType: 0 }]
    },
    {
      type: "zksub",
      name: "Sismo Newsletter",
      description: "Register your email address to receive the Sismo newsletter - open to all.",
      tags: ["Newsletter"],
      image: "https://aave.com/governanceGhosts.svg",
      CTAText: "Subscribe to the Newsletter",
      fields: [
        {
          type: "short-text",
          label: "Email",
          isRequired: true
        }
      ],
      authRequests: [{ authType: 0 }, { authType: 2 }, { authType: 1, isOptional: true }],
      output: "google_sheet",
      appId: "0xe083ec4268d2c75e41ec6e08b4373882",
      spreadsheetId: "1Z61ZMWOFhXhp8rt2T6ewpFRMR_CtF0XL6sBIUz4KeQQ",
      congratulationsMessage: {
        title: "Congratulations",
        description: "You will now receive our Sismo Newsletter 💜",
      }
    }
    /*{
      /*type: "zksub",
      name: "Sismo Space Feedback",
      description: "Provide feedback to help us improve your Sismo Spaces experience and become a Sismo Contributor Level 1 - open to all.",
      tags: ["Feedback"],
      image: "https://aave.com/governanceGhosts.svg",
      CTAText: "Give Feedback",
      fields: [
        {
          type: "short-text",
          label: "Email",
          isRequired: true
        }
      ],
      startDate: new Date("2023-05-12T18:00"),
      endDate: new Date("2023-05-12 18:00"),
      authRequests: [{ authType: 0 }, { authType: 2 }],
      output: "google_sheet",
      appId: null,
      spreadsheetId: null,
      congratulationsMessage: {
        title: "Congratulations",
        description: "You will now receive our Sismo Newsletter 💜",
      }
    },*/
  ],
};