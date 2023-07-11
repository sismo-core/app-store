import { SpaceConfig } from "../types";
import { AuthType, ClaimType } from "@sismo-core/sismo-connect-server";

//           UPDATE HERE    ↓↓↓
export default {
  metadata: {
    name: "Leo Space", // UPDATE HERE
    description:
      "This Space is dedicated to my new project. It's a great project, you should check it out!", // UPDATE HERE
    image: "leo_cover_400x400.png", // UPDATE HERE
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
        name: "Leo ZK Drop relayer", // UPDATE HERE
        slug: "claim-your-airdrop-relayed", // UPDATE HERE
        description: "Claim your Zk Drp", // UPDATE HERE
        tags: ["Airdrop"],
        image: "leo_cover_400x400.png", // UPDATE HERE
        createdAt: new Date("2023-07-03T18:00"), // UPDATE HERE WITH CURRENT DATE
      },
      sismoConnectRequest: {
        appId: "0x2301cda9ff54957f06fa9750ad537ef5",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0xd4cdaae916464870f7413a03b1fe8c31" }],  // UPDATE HERE WITH YOUR GROUP
      },
      templateConfig: {
        isTransferable: false
        nftMetadata: {
          name: "NFT Claim leo test",  // UPDATE HERE
          description: "This is a leo airdrop test relayed",// UPDATE HERE
          image: "leo_cover_400x400.png" // UPDATE HERE
        },
        chains: [{
          contractAddress: "0x4744189928214fF879646a24B3FB2A2080152351",
          name: "sepolia", // UPDATE HERE choose your chain name
          relayerEnabled: true, 
        }, {
          contractAddress: "0x498310AD2c30349143DcBa65cd6e055d7D68cB4B",
          name: "goerli", // UPDATE HERE choose your chain name
          relayerEnabled: true
        }, {
          contractAddress: "0x498310AD2c30349143DcBa65cd6e055d7D68cB4B",
          name: "mumbai", // UPDATE HERE choose your chain name
          relayerEnabled: true
        }, {
          contractAddress: "0x65D478De77a161CC9824e4c40cc9B979deDED366",
          name: "polygon", // UPDATE HERE choose your chain name
          relayerEnabled: true
        }],
        step1CtaText: "Prove eligibility", 
        step2CtaText: "Claim!",
        appDescription: "Claim Your airdrop"
      }
},
        {
      type: "zkDrop",
      metadata: {
        name: "Leo ZK Drop not relayed", // UPDATE HERE
        slug: "claim-your-airdrop-not-relayed", // UPDATE HERE
        description: "Claim your Zk Drp", // UPDATE HERE
        tags: ["Airdrop"],
        image: "leo_cover_400x400.png", // UPDATE HERE
        createdAt: new Date("2023-07-03T18:00"), // UPDATE HERE WITH CURRENT DATE
      },
      sismoConnectRequest: {
        appId: "0x2ba586941534000c1a5e2248f676904b",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0xd4cdaae916464870f7413a03b1fe8c31" }],  // UPDATE HERE WITH YOUR GROUP
      },
      templateConfig: {
        isTransferable: true,
        nftMetadata: {
          name: "NFT Claim leo test",  // UPDATE HERE
          description: "This is a leo airdrop test not relayed",// UPDATE HERE
          image: "leo_cover_400x400.png" // UPDATE HERE
        },
        chains: [{
          contractAddress: "0x498310AD2c30349143DcBa65cd6e055d7D68cB4B",
          name: "sepolia", // UPDATE HERE choose your chain name
          relayerEnabled: false, 
        }, {
          contractAddress: "0x4744189928214fF879646a24B3FB2A2080152351",
          name: "goerli", // UPDATE HERE choose your chain name
          relayerEnabled: false
        }, {
          contractAddress: "0x4744189928214fF879646a24B3FB2A2080152351",
          name: "mumbai", // UPDATE HERE choose your chain name
          relayerEnabled: false
        }, {
          contractAddress: "0x09519fb0E2363D2253338a4Cdc2911f67fE9A2C4",
          name: "polygon", // UPDATE HERE choose your chain name
          relayerEnabled: false
        }],
        step1CtaText: "Prove eligibility", 
        step2CtaText: "Claim!",
        appDescription: "Claim Your airdrop"
      }
}
  ],
} as SpaceConfig;
