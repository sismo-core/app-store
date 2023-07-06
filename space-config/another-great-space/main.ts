// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType, ClaimType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

//           UPDATE HERE ↓↓↓
export const SashaSpace : SpaceConfig = {
  metadata: {
    slug: "great-space", // UPDATE HERE
    name: "My second great Space", // UPDATE HERE
    description:
      "This is another test!", // UPDATE HERE
    image: "my_new_space_picture_500x500.png", // UPDATE HERE
    socialLinks: [
      {
        type: "link",
        link: "https://www.sismo.io/", // UPDATE HERE
      },
      {
        type: "twitter",
        link: "https://twitter.com/kugusha", // UPDATE HERE
      },
    ],
  }, 
  apps: []
};
