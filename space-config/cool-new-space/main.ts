// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType, ClaimType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

//           UPDATE HERE ↓↓↓
export const CoolNewSpace : SpaceConfig = {
  metadata: {
    slug: "cool-new-space", // UPDATE HERE
    name: "Sasha's Cool New Space", // UPDATE HERE
    description:
      "This Space is very cool. https://sismo.mirror.xyz/z-hka-hlI3wiJE8zmr2E3KviwYGh6QymzHiBH5BMOwM", // UPDATE HERE
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
