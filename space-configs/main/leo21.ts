// add an images folder in your space folder if you would like Sismo to host your images
import { SpaceConfig } from "../types";

//           UPDATE HERE ↓↓↓
export default {
  metadata: {
    name: "Leo Space", // UPDATE HERE
    description: "This space is for all leo related content!", // UPDATE HERE
    image: "my_new_space_picture_400x400.png", // UPDATE HERE
    socialLinks: [
      {
        type: "twitter",
        link: "https://twitter.com/leo21_eth", // UPDATE HERE
      },
    ],
  },
  apps: [],
} as SpaceConfig;
