// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

export const synapsConfig: SpaceConfig = {
  slug: "synaps",
  name: "Synaps",
  description: "Synaps provides identity verification solutions from Personhood validation to regulated KYC / AML and KYB processes.",
  profileImage: "synaps_pfp.png",
  coverImage: "synaps_cover.png",
  envs: ["Demo", "Prod"],
  hidden: false,
  apps: [
    {
      type: "external",
      name: "Synaps Liveness",
      description: "Synaps provides identity verification solutions from Personhood validation to regulated KYC / AML and KYB processes",
      tags: ["KYC"],
      image: "synaps_liveness_img.png",
      CTAText: "Prove liveness",
      slug: "proof-of-liveness",
      envs: ["Demo", "Prod"],
      authRequests: [{ authType: AuthType.VAULT }],
      link: "https://synaps-integration.vercel.app"
    }
  ],
};
