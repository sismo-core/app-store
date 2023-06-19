// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType } from "@sismo-core/sismo-connect-server";
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
      slug: "proof-of-liveness",
      envs: ["Demo", "Prod"],
      spreadsheetId: "1i1xC7C1I8dBxTYcxtg5Wzz3v55Lt_j_JoJbz_riswUE",
      authRequests: [{ authType: AuthType.VAULT }],
      demo: {
        spreadsheetId: "1i1xC7C1I8dBxTYcxtg5Wzz3v55Lt_j_JoJbz_riswUE"
      },
      congratulationsMessage: {
        title: "Congratulations",
        description:
          "You have successfully prove your liveness.",
      },
    }
  ],
};
