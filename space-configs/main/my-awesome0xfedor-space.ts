import { SpaceConfig } from "../types";

//           UPDATE HERE ↓↓↓
export default {
  metadata: {
    name: "My Awesome Space", // UPDATE HERE
    description:
      "This Space is dedicated to my new project. It's a great project, you should check it out!", // UPDATE HERE
    image: "my_awesome_space_picture_400x400.png", // UPDATE HERE
    socialLinks: [
      {
        type: "link", 
        link: "https://www.my-awesome-website.io/", // UPDATE HERE
      },
      // OTHER TYPE OF LINK YOU CAN USE
      // {
      //   type: "twitter",
      //   link: "https://twitter.com/0xabobus15723",
      // },
      // {
      //   type: "discord",
      //   link: "https://discord.com/invite/abobus3966",
      // },
      // {
      //   type: "github",
      //   link: "https://github.com/0xfedor",
      // },
    ],
  },
  apps: [],
} as SpaceConfig;
