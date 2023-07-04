// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType, ClaimType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

//           UPDATE HERE ↓↓↓
export const myNewSpaceConfigMain : SpaceConfig = {
  metadata: {
    slug: "test-space", // UPDATE HERE
    name: "Look at my space", // UPDATE HERE
    description:
      "This Space is dedicated to my new project. It's a great project, you should check it out!", // UPDATE HERE
    profileImage: "my_new_space_picture_400x400.png", // UPDATE HERE
    socialLinks: [
      {
        type: "link",
        link: "https://etherscan.io/tx/0x0ae3d3ce3630b5162484db5f3bdfacdfba33724ffb195ea92a6056beaa169490", // UPDATE HERE
      },
    ],
  }, 
  apps: []
};
