import { SpaceConfig } from "../types";
import { AuthType, ClaimType } from "@sismo-core/sismo-connect-server";

//           UPDATE HERE    ↓↓↓
export default {
  metadata: {
    name: "Bigq Space", // UPDATE HERE
    description: "This Space is dedicated to all my friends. Have fun experimenting with ZK y'all", // UPDATE HERE
    image: "tanjiro_bw_958x1200.png", // UPDATE HERE
    socialLinks: [
      {
        type: "link",
        link: "https://www.sismo.io/", // UPDATE HERE
      },
      {
        type: "twitter",
        link: "https://twitter.com/Sismo_eth", // UPDATE HERE
      },
      {
        type: "discord",
        link: "https://discord.com/invite/sismo", // UPDATE HERE
      },
      {
        type: "github",
        link: "https://github.com/sismo-core", // UPDATE HERE
      },
    ],
  },
  apps: [
    {
      type: "zkDrop",
      metadata: {
        name: "Tanjiro ZKDrop", // UPDATE HERE
        slug: "claim-this-tanjiro", // UPDATE HERE
        description: "Claim your Tanjiro NFT", // UPDATE HERE
        tags: ["Airdrop"],
        image: "tanjiro_1280x1280.png", // UPDATE HERE
        createdAt: new Date("2023-07-03T18:00"), // UPDATE HERE WITH CURRENT DATE
      },
      sismoConnectRequest: {
        appId: "{{ auto-fill }}",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0x1af68282b2fea41701d1935d320c9c81" }], // UPDATE HERE WITH YOUR GROUP
      },
      templateConfig: {
        isTransferable: false,
        nftMetadata: {
          name: "Tanjiro NFT gifted from bigq", // UPDATE HERE
          description: "This NFT is only a test. Don't trade it. Nevermind, you can't.", // UPDATE HERE
          image: "tanjiro_1280x1280.png", // UPDATE HERE
        },
        chains: [
          {
            contractAddress: "",
            name: "gnosis", // UPDATE HERE choose your chain name
            relayerEnabled: true,
          },
          {
            contractAddress: "",
            name: "optimism", // UPDATE HERE choose your chain name
            relayerEnabled: false,
          },
          {
            contractAddress: "",
            name: "arbitrum", // UPDATE HERE choose your chain name
            relayerEnabled: false,
          },
          {
            contractAddress: "",
            name: "polygon", // UPDATE HERE choose your chain name
            relayerEnabled: false,
          },
        ],
        step1CtaText: "Prove eligibility",
        step2CtaText: "Claim!",
        appDescription: "Claim Your Tanjiro!",
      },
    },
  ],
} as SpaceConfig;
