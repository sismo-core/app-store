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
        appId: "0x86929cc52b44482a7da0aac26f05a6ef",
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
            contractAddress: "0x498310AD2c30349143DcBa65cd6e055d7D68cB4B",
            name: "gnosis", // UPDATE HERE choose your chain name
            relayerEnabled: true,
          },
          {
            contractAddress: "0x498310AD2c30349143DcBa65cd6e055d7D68cB4B",
            name: "optimism", // UPDATE HERE choose your chain name
            relayerEnabled: false,
          },
          {
            contractAddress: "0x65D478De77a161CC9824e4c40cc9B979deDED366",
            name: "arbitrum", // UPDATE HERE choose your chain name
            relayerEnabled: false,
          },
          {
            contractAddress: "0x4744189928214fF879646a24B3FB2A2080152351",
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
