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
        slug: "claim-your-airdrop", // UPDATE HERE
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
        nftMetadata: {
          name: "NFT Claim leo test",  // UPDATE HERE
          description: "This is a leo airdrop test",// UPDATE HERE
          image: "leo_cover_400x400.png" // UPDATE HERE
        },
        chains: [{
          contractAddress: "{{ auto-fill }}",
          name: "sepolia", // UPDATE HERE choose your chain name
          relayerEnabled: true, 
          isTransferable: true
        }, {
          contractAddress: "{{ auto-fill }}",
          name: "goerli", // UPDATE HERE choose your chain name
          relayerEnabled: true, 
          isTransferable: true
        }, {
          contractAddress: "{{ auto-fill }}",
          name: "mumbai", // UPDATE HERE choose your chain name
          relayerEnabled: true, 
          isTransferable: false
        }, {
          contractAddress: "{{ auto-fill }}",
          name: "gnosis", // UPDATE HERE choose your chain name
          relayerEnabled: true, 
          isTransferable: false
        }, {
          contractAddress: "{{ auto-fill }}",
          name: "polygon", // UPDATE HERE choose your chain name
          relayerEnabled: true, 
          isTransferable: true
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
        slug: "claim-your-airdrop", // UPDATE HERE
        description: "Claim your Zk Drp", // UPDATE HERE
        tags: ["Airdrop"],
        image: "leo_cover_400x400.png", // UPDATE HERE
        createdAt: new Date("2023-07-03T18:00"), // UPDATE HERE WITH CURRENT DATE
      },
      sismoConnectRequest: {
        appId: "{{ auto-fill }}",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0xd4cdaae916464870f7413a03b1fe8c31" }],  // UPDATE HERE WITH YOUR GROUP
      },
      templateConfig: {
        nftMetadata: {
          name: "NFT Claim leo test",  // UPDATE HERE
          description: "This is a leo airdrop test",// UPDATE HERE
          image: "leo_cover_400x400.png" // UPDATE HERE
        },
        chains: [{
          contractAddress: "{{ auto-fill }}",
          name: "sepolia", // UPDATE HERE choose your chain name
          relayerEnabled: false, 
          isTransferable: true
        }, {
          contractAddress: "{{ auto-fill }}",
          name: "goerli", // UPDATE HERE choose your chain name
          relayerEnabled: false, 
          isTransferable: true
        }, {
          contractAddress: "{{ auto-fill }}",
          name: "mumbai", // UPDATE HERE choose your chain name
          relayerEnabled: false, 
          isTransferable: false
        }, {
          contractAddress: "{{ auto-fill }}",
          name: "gnosis", // UPDATE HERE choose your chain name
          relayerEnabled: false, 
          isTransferable: false
        }, {
          contractAddress: "{{ auto-fill }}",
          name: "polygon", // UPDATE HERE choose your chain name
          relayerEnabled: false, 
          isTransferable: true
        }],
        step1CtaText: "Prove eligibility", 
        step2CtaText: "Claim!",
        appDescription: "Claim Your airdrop"
      }
}
  ],
} as SpaceConfig;
