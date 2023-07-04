// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType, ClaimType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

//           UPDATE HERE ↓↓↓
export const myAwesomeSpaceConfigMain : SpaceConfig = {
  metadata: {
    slug: "my-awesome-space", // UPDATE HERE
    name: "My Awesome Space", // UPDATE HERE
    description:
      "This Space is dedicated to my awesome project. It's a great project, you should check it out!", // UPDATE HERE
    profileImage: "my_awesome_space_picture_400x400.png", // UPDATE HERE
    socialLinks: [
      {
        type: "link",
        link: "https://www.my-awesome-website.io/", // UPDATE HERE
      },
    ],
  }, 
  apps: []
};
