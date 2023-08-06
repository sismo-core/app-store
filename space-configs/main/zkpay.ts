// COPY FROM HERE

{
  // NO UPDATE. Template type
  type: "zkDrop",
  // UPDATE. App information
  metadata: {
    name: "ZKPay", // UPDATE HERE
    description:
      "Space dedicated to ZKPay.finance.", // UPDATE HERE
    slug: "zk-drop-zkpay-badge",
    image: "zkpay_space_pfp.png", // UPDATE HERE
    tags: ["NFT"], // UPDATE. Add one or two tags to describe your app
    createdAt: new Date("2023-08-06T00:00:00.000Z"), // UPDATE. Edit the date here to today's date YYYY-MM-DD
    socialLinks: [
      {
        type: "link", 
        link: "https://zkpay.finance/", // UPDATE HERE
      },
      {
        type: "twitter",
        link: "https://twitter.com/zk_pay",
      },
      {
        type: "discord",
        link: "https://discord.gg/C96BBnQU8A",
      }
    ],
  }
  // UPDATE. Sismo Connect request, see "Cheatsheet: Build Your Sismo Connect Request"
  sismoConnectRequest: {
    appId: "{{ auto-fill }}",
    authRequests: [{ authType: AuthType.VAULT }],
    claimRequests: [{ groupId: "0xb7820343e1799c26e526ead8747a9745" },],
  },
  // UPDATE. Config for zkForm
  templateConfig: {
    owner: "{{ evm address }}", // UPDATE OR REMOVE. Evm address owner of the contract. If empty, Sismo is owner by default. Owner will have rights to update NFT metadata and expiry date.
    isTransferable: false, // UPDATE. Make the NFT transferable or not
    nftMetadata: {
      name: "ZKPay Quest Badge",
      description: "Prove you have completed the ZKPay Quest. Find the quest at https://zkpay.finance/quest",
      image: "zkpay_quest_500x500.png",
      symbol: "ZKPayQuest",
    },
    chains: [
      {
        contractAddress: "{{ auto-fill }}", // The contract address will be automatically created based on your chain name
        name: "gnosis", // UPDATE. Your chain name: "gnosis", "mainnet", "arbitrum", "optimism", "polygon", “mumbai”, “arbitrum-goerli”, “goerli”, “optimism-goerli”
        relayerEnabled: true, // UPDATE. Relayer enabled or not to pay fees for users and ensure full privacy-preserving claiming, set to false by default.
      },
    ],
    step1CtaText: "Prove you are Eligible", // UPDATE OR REMOVE. 1st step text when users click on the app, "Sign in with Sismo" by default
    step2CtaText: "Claim your ZKPay Quest Badge", // UPDATE. 2nd step button text, on submitting the form
  },
  // UPDATE OR REMOVE. App dates
  options: {
    //startDate: new Date("2023-05-12T18:00"), // UPDATE OR REMOVE. Your start date YYYY-MM-DD
    //endDate: new Date("2024-05-19T18:00"), // UPDATE OR REMOVE. Your end date YYYY-MM-DD
  },
}, 

// UNTIL HERE