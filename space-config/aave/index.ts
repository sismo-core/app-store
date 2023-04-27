// add an images folder in your space folder if you would like Sismo to host your images

import { SpaceConfig } from "../space-config.types";

export const aaveConfig: SpaceConfig = {
  slug: "aave",
  name: "Aave",
  description:
    "Aave is a decentralized non-custodial liquidity protocol where users can participate as depositors or borrowers. Depositors provide liquidity to the market to earn a passive income, while borrowers are able to borrow in an overcollateralized (perpetually) or undercollateralized (one-block liquidity) fashion.",
  banner: "https://aave.com/governanceGhosts.svg",
  apps: [
    {
      type: "external-app",
      name: "First app",
      description: "App description",
      tags: ["tag1", "tag2"],
      image: "https://aave.com/governanceGhosts.svg",
      buttonText: "register",
      link: "https://aave.com/governanceGhosts.svg",
    },
    {
      type: "external-app",
      name: "Second app",
      description: "App description",
      tags: ["tag1", "tag2"],
      image: "https://aave.com/governanceGhosts.svg",
      buttonText: "register",
      link: "https://aave.com/governanceGhosts.svg",
    },
  ],
};
