// add an images folder in your space folder if you would like Sismo to host your images

import { SpaceConfig } from "../types";

export const aaveConfig: SpaceConfig = {
  slug: "aave",
  name: "Aave",
  description:
    "Aave is a decentralized non-custodial liquidity protocol where users can participate as depositors or borrowers. Depositors provide liquidity to the market to earn a passive income, while borrowers are able to borrow in an overcollateralized (perpetually) or undercollateralized (one-block liquidity) fashion.",
  coverImage: "https://aave.com/governanceGhosts.svg",
  apps: [
    {
      type: "external",
      name: "External app",
      description: "App description of an external app",
      tags: ["tag1", "tag2"],
      image: "https://aave.com/governanceGhosts.svg",
      CTAText: "Go to Aave",
      link: "https://aave.com/",

      claimRequests: [{ groupId: "0x123" }, { groupId: "0x1234", isOptional: true }],
      authRequests: [{ authType: 0 }]
    },
    {
      type: "zkdrop",
      name: "ZkDrop app",
      description: "App description of a zkdrop app",
      tags: ["tag1", "tag2"],
      image: "https://aave.com/governanceGhosts.svg",
      CTAText: "Get a drop",
      contractAddress: "0x1234",
      chainId: 5
    },
    {
      type: "zksub",
      name: "ZkSub app",
      description: "App description of a zkdrop app",
      tags: ["tag1", "tag2"],
      image: "https://aave.com/governanceGhosts.svg",
      CTAText: "Subscribe to the Newsletter",
      fields: [
        {
          type: "short-text",
          label: "First name",
          isRequired: true
        },
        {
          type: "short-text",
          label: "Last name",
          isRequired: true
        },
        {
          type: "short-text",
          label: "Email",
          isRequired: true
        }
      ],
      output: "google_sheet",
      appId: null,
      spreadsheetId: null
    },
  ],
};
