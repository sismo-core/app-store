// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType, ClaimType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

//           UPDATE HERE ↓↓↓
export const myNewSpaceConfigMain : SpaceConfig = {
  metadata: {
    slug: "my-space-test", // UPDATE HERE
    name: "My Space test", // UPDATE HERE
    description:
      "This Space is a test", // UPDATE HERE
    profileImage: "my_new_space_picture_400x400.png", // UPDATE HERE
    socialLinks: [
      {
        type: "link",
        link: "https://www.sismo.io/", // UPDATE HERE
      },
    ],
  }, 
  apps: []
};
