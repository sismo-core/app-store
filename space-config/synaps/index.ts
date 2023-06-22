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
      name: "Liveness Verification",
      description: "Perform liveness verification with Synaps to join the 'Proof of Liveness' Data Group to access Sismo Apps that request to be part of it. Through this liveness session, a privacy-preserving encrypted vector graph is generated. It contains no biometric data and cannot be used to recreate your face.",
      tags: ["Liveness"],
      image: "synaps_liveness_img.png",
      CTAText: "Prove your Liveness",
      slug: "proof-of-liveness",
      envs: ["Demo", "Prod"],
      authRequests: [{ authType: AuthType.VAULT }],
      link: "https://synaps-integration.vercel.app"
    }
  ],
};
