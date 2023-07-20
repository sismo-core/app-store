import { SpaceConfig } from "../types";

//           UPDATE HERE ↓↓↓
export default {
  metadata: {
    name: "Spyglass Space", // UPDATE HERE
    description:
      "This Space is dedicated to my Spyglass Space to explore ZK Tech", // UPDATE HERE
    image: "coding.jpg", // UPDATE HERE
    socialLinks: [
      {
        type: "link", 
        link: "https://spyglass-analytics.com/", // UPDATE HERE
      },
      // OTHER TYPE OF LINK YOU CAN USE
      {
      type: "twitter",
      link: "https://twitter.com/kartentaucher",
       },
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
