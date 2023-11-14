// add an images folder in your space folder if you would like Sismo to host your images
import { SpaceConfig } from "../types";

export default {
  metadata: {
    name: "Synaps",
    description:
      "This Space is a tribute to users willing to prove their liveness with Synaps - a crypto-native identity verification provider. Proof of Liveness is performed through a liveness verification session, where a privacy-preserving encrypted vector graph is generated. It contains no biometric data and cannot be used to recreate your face.",
    image: "space_synaps_pfp.png",
  },
  apps: [
    {
      type: "custom",
      metadata: {
        name: "Liveness Verification",
        description:
          "Perform liveness verification with Synaps to join the 'Proof of Liveness' Data Group and access Sismo Apps that request to be part of it. This liveness session stores no personal data.",
        tags: ["Liveness"],
        image: "synaps_liveness.png",
        slug: "proof-of-liveness",
        createdAt: new Date("2023-07-05T18:00"),
      },
      sismoConnectRequest: {
        appId: "0x5b379992e5da74bfa4aaff4d3e52d6a8",
        authRequests: [{ authType: 0 }],
      },
      templateConfig: {
        step2CtaText: "Prove your Liveness",
        api: "https://synaps-integration.vercel.app/api/proof-of-liveness",
        congratulationsMessage: {
          title: "Congratulations",
          description:
            "You have successfully proven your liveliness. Your proof of liveliness will be available in your Sismo Vault within 24 hours.",
        },
      },
    },
  ],
  options: {
    hidden: false,
  },
} as SpaceConfig;
