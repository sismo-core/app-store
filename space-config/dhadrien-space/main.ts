// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType, ClaimType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

export const DhadrienIsConfigMain: SpaceConfig = {
  metadata: {
    slug: "privacy-is-normal",
    name: "Privacy Is Normal 🌼",
    description:
      "This Space celebrates privacy as a fundamental human right. By proving you are a Tornado Cash user in a privacy-preserving manner and with a Gitcoin Passport, you were able to participate in our Sybil-resistant lottery. 10 winners have been selected to receive a printed ‘Privacy Is Normal’ artwork.",
    profileImage: "space_privacy_is_normal_pfp_400x400.png",
    coverImage: "space_privacy_is_normal_cover_1740x540.png",
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
  },
};
