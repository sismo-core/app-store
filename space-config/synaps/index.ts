// add an images folder in your space folder if you would like Sismo to host your images
import { SpaceConfig } from "../types";

export const synapsConfig: SpaceConfig = {
  slug: "synaps",
  name: "Synaps",
  description: "Synaps space.",
  profileImage: "synaps_pfp.jpeg",
  coverImage: "space_sismo_cover_1740x540.png",
  envs: ["Demo", "Prod"],
  hidden: false,
  apps: [
    {
      type: "custom",
      appId: "0x5b379992e5da74bfa4aaff4d3e52d6a8",
      name: "Synaps Liveness",
      description: "Synaps proof of liveness.",
      tags: ["KYC"],
      image: "synaps_pfp.jpeg",
      CTAText: "Prove liveness",
      slug: "synaps-proof-of-liveness",
      envs: ["Demo", "Prod"],
    }
  ],
};
