import { SpaceConfig } from "../types";

//           UPDATE HERE ↓↓↓
export default {
  metadata: {
    name: "kugusha.eth space", // UPDATE HERE
    description:
      "This is a space of kugusha.eth" // UPDATE HERE
    image: "space_pic_pfp.png", // UPDATE HERE
    socialLinks: [
      {
        type: "twitter", 
        link: "https://twitter.com/kugusha", // UPDATE HERE
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
