// add an images folder in your space folder if you would like Sismo to host your images
import { SpaceConfig } from "../types";

export default {
  metadata: {
    name: "Worldcoin",
    description:
      "Worldcoin is building the world's largest identity and financial network as a public utility, giving ownership to everyone.",
    image: "space_worldcoin_pfp.jpeg",
  },
  apps: [
    {
      type: "custom",
      metadata: {
        name: "Proof of personhood",
        description:
          "World ID is a digital passport that lets you prove you are a unique and real person while remaining anonymous.",
        tags: ["Proof of personhood"],
        image: "worldcoin_proof_of_personhood_pfp.png",
        slug: "proof-of-personhood",
        createdAt: new Date("2023-07-05T18:00"),
      },
      sismoConnectRequest: {
        appId: "0x3bcdab2ad3caddb11b90b02bde258f6b",
        authRequests: [{ authType: 0 }],
      },
      templateConfig: {
        step2CtaText: "Prove your are unique",
        api: "https://worldcoin-app-backend.vercel.app/api/proof-of-personhood",
        congratulationsMessage: {
          title: "Congratulations",
          description:
            "You have successfully proven your personhood. Your proof of personhood will be available in your Sismo Vault within 24 hours.",
        },
      },
    },
  ],
  options: {
    hidden: false,
  },
} as SpaceConfig;
