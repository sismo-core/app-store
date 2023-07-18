import { SpaceConfig } from "../types";

//           UPDATE HERE ↓↓↓
export default {
  metadata: {
    name: "Jonny's Space", // UPDATE HERE
    description:
      "Do you care about privacy, anon? Welcome to a world of experiments from the mind of Jonny.", // UPDATE HERE
    image: "jonnys-sismo-space.png", // UPDATE HERE
    socialLinks: [
      {
        type: "link", 
        link: "https://www.jonnyhowle.com/", // UPDATE HERE
      },
      // OTHER TYPE OF LINK YOU CAN USE
      // {
      //   type: "twitter",
      //   link: "https://twitter.com/Sismo_eth",
      // },
      // {
      //   type: "discord",
      //   link: "https://discord.com/invite/sismo",
      // },
      // {
      //   type: "github",
      //   link: "https://github.com/sismo-core",
      // },
    ],
  },
  apps: [],
} as SpaceConfig;
