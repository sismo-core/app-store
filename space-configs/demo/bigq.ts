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
    {
      type: "zkForm",
      metadata: {
        slug: "event",
        name: "Cow Event Invitation",
        description:
          "Prove you are a Cow Trader or Holder to register to an invitation-only event organized by Cow Swap, during EthCC week in Paris.",
        tags: ["Event", "Ticket"],
        image: "cowswap_app_store_cow_event_400x400.png",
        createdAt: new Date("2023-07-04T18:00"),
      },
      sismoConnectRequest: {
        appId: "0x42bf819b60a7f4cbe57f2c5617b6a35c",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [
          {
            groupId: "0x70c30e9a9abdb5fd41ba9e9cb7f50173",
            value: 1,
          },
        ],
        impersonateAddresses: [
          "0xb18e3bf33365fd2466c2e99b181e527a165c210c",
          "dhadrien.sismo.eth",
          "0xA4C94A6091545e40fc9c3E0982AEc8942E282F38",
          "0x1b9424ed517f7700e7368e34a9743295a225d889",
          "0x82fbed074f62386ed43bb816f748e8817bf46ff7",
          "0xc281bd4db5bf94f02a8525dca954db3895685700",
          "telegram:dhadrien:1234",
          "github:dhadrien",
          "twitter:dhadrien_:2390703980",
        ],
      },
      templateConfig: {
        step2CtaText: "Register to get your Ticket",
        fields: [
          {
            type: "short-text",
            label: "Email",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Name or Pseudonym",
            isRequired: true,
          },
        ],
        congratulationsMessage: {
          title: "Congratulations!",
          description:
            "Tickets are processed on a first come first serve basis. You will receive an email update in a few days! See you there 💜",
        },
        output: {
          destination: {
            type: "google_sheet",
            spreadsheetId: "1oENmskjo374TPD5dWikjVN5W610YUwIp22WvxrDBYd8",
          },
          saveAuths: true,
        },
      },
    },
  ],
} as SpaceConfig;
