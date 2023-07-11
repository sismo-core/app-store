import { SpaceConfig } from "../types";

//           UPDATE HERE    ↓↓↓
export default {
  metadata: {
    name: "Leo Space", // UPDATE HERE
    description:
      "This Space is dedicated to my new project. It's a great project, you should check it out!", // UPDATE HERE
    image: "leo_cover_400x400.png", // UPDATE HERE
    socialLinks: [
      {
        type: "link",
        link: "https://www.sismo.io/", // UPDATE HERE
      },
      {
        type: "twitter",
        link: "https://twitter.com/Sismo_eth", // UPDATE HERE
      },
      {
        type: "discord",
        link: "https://discord.com/invite/sismo", // UPDATE HERE
      },
      {
        type: "github",
        link: "https://github.com/sismo-core", // UPDATE HERE
      },
    ],
  },
  apps: [],
} as SpaceConfig;
