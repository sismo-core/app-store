// add an images folder in your space folder if you would like Sismo to host your images
import { SpaceConfig } from "../types";

export const synapsConfig: SpaceConfig = {
  slug: "synaps",
  name: "Synaps",
  description: "This Space is a tribute to users willing to prove their liveness with Synaps - a crypto-native identity verification provider. Proof of Liveness is performed through a liveness verification session, where a privacy-preserving encrypted vector graph is generated. It contains no biometric data and cannot be used to recreate your face.",
  profileImage: "synaps_pfp.png",
  coverImage: "synaps_cover.png",
  envs: ["Demo", "Prod"],
  hidden: false,
  apps: [
    {
      type: "custom",
      name: "Liveness Verification",
      appId: "0x5b379992e5da74bfa4aaff4d3e52d6a8",
      description: "Perform liveness verification with Synaps to join the 'Proof of Liveness' Data Group and access Sismo Apps that request to be part of it. This liveness session stores no personal data.",
      tags: ["Liveness"],
      image: "synaps_liveness_img.png",
      CTAText: "Prove your Liveness",
      slug: "proof-of-liveness",
      envs: ["Demo", "Prod"],
      authRequests: [{ authType: 0 }],
      path: "/synaps/proof-of-liveness",
      extraData: {
        api: "https://synaps-integration.vercel.app/api/proof-of-liveness",
        congratulationsMessage: {
          title: "Congratulations!",
          description: "Your Proof of Liveness will be available in your Sismo Data Vault within 24 hours.",
        }
      }
    }
  ],
};
