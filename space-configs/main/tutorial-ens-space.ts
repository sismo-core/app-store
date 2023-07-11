import { AuthType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

export default {
  metadata: {
    name: "Tutorial ENS Space", // INSERT SPACE NAME HERE
    description: "Space used for tutorial purpose", // INSERT DESCRIPTION HERE
    image: "tutorial-ens-space.png", // INSERT IMAGE NAME HERE
    socialLinks: [
      {
        type: "link",
        link: "ens.domains", // INSERT ANY LINK HERE
      },
      {
        type: "twitter",
        link: "", // INSERT TWITTER ACCOUNT LINK HERE
      },
      {
        type: "discord",
        link: "", // INSERT DSICCORD SERVER INVITE LINK HERE
      },
      {
        type: "github",
        link: "", // INSERT GITHUB ACCOUNT LINK HERE
      },
    ],
  },
  apps: [],
} as SpaceConfig;
