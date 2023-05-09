// add an images folder in your space folder if you would like Sismo to host your images

import { SpaceConfig } from "../types";

export const aaveConfig: SpaceConfig = {
  slug: "aave",
  name: "Aave",
  description:
    "Aave is a decentralized non-custodial liquidity protocol where users can participate as depositors or borrowers. Depositors provide liquidity to the market to earn a passive income, while borrowers are able to borrow in an overcollateralized (perpetually) or undercollateralized (one-block liquidity) fashion.",
  banner: "https://aave.com/governanceGhosts.svg",
  apps: [
    {
      type: "external-app",
      name: "External app",
      description: "App description of an external app",
      tags: ["tag1", "tag2"],
      image: "https://aave.com/governanceGhosts.svg",
      buttonText: "Go to Aave",
      link: "https://aave.com/",
    },
    {
      type: "zkdrop-app",
      name: "ZkDrop app",
      description: "App description of a zkdrop app",
      tags: ["tag1", "tag2"],
      image: "https://aave.com/governanceGhosts.svg",
      buttonText: "Get a drop",
      contractAddress: "0x1234",
      chainId: 5
    },
    {
      type: "zksub-app",
      name: "ZkSub app",
      description: "App description of a zkdrop app",
      tags: ["tag1", "tag2"],
      image: "https://aave.com/governanceGhosts.svg",
      buttonText: "Subscribe to the Newsletter",
      inputs: [],
      output: "google_sheet"
    },
  ],
};
