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
        appId: "0x5ed8de79b8920ed9cc7e6a25301a39d4",
        authRequests: [{ authType: AuthType.VAULT }],

        claimRequests: [{ groupId: "0x0f800ff28a426924cbe66b67b9f837e2" }], // UPDATE HERE WITH YOUR GROUP
        impersonateAddresses: ["0xfffeacad725f511211b80fbbf91cdca935ac44b1"],
      },
      templateConfig: {
        isTransferable: false,
        nftMetadata: {
          name: "Tanjiro NFT gifted from bigq", // UPDATE HERE
          description: "This NFT is only a test. Don't trade it. Nevermind, you can't.", // UPDATE HERE
          image: "tanjiro_1280x1280.png", // UPDATE HERE
          symbol: "TAN",
        },
        chains: [
          {
            contractAddress: "0x43CDA5749ACc2B05ec15d37dc7005C33273cec5B",
            name: "base-goerli", // UPDATE HERE choose your chain name
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
