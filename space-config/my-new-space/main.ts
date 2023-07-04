// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType, ClaimType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

export const myNewSpaceConfigMain: SpaceConfig = {
  metadata: {
    slug: "my-new-space",
    name: "My New Space",
    description:
      "This Space is dedicated to my new project. It's a great project, you should check it out!",
    profileImage: "my_new_space_pfp_400x400.png",
    socialLinks: [
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
  }
};
