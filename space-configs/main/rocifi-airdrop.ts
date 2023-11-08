import { SpaceConfig } from "../types";
import { AuthType } from "@sismo-core/sismo-connect-server";

//           UPDATE HERE ↓↓↓
export default {
  metadata: {
    name: "RociFi", // UPDATE HERE
    description:
      "RociFi is the first Onchain Credit Scoring Primitive allowing web3 users to monetize their onchain history via lower borrowing rates, higher loan-to-value ratios, or boosted token rewards.", // UPDATE HERE
    image: "rocif_logo.png", // UPDATE HERE
    socialLinks: [
      {
        type: "link",
        link: "https://roci.fi/", // UPDATE HERE
      },
    ],
  },
  apps: [
    
  {

    type: "zkForm",
    metadata: {
      slug: "rocifi-airdrop",
      name: "RociFi Airdrop",
      description:
        "Enter your wallet to claim your $ROCI airdrop - without doxxing it ✨",
      tags: ["Airdrop"],
      image: "roci-airdrop.png",
      createdAt: new Date("2023-09-01T00:00:00.000Z"),
    },
    sismoConnectRequest: {
      appId: "0x7727b025ffc8fa2897c54d982b4f5abd",
      authRequests: [{ authType: AuthType.VAULT }],
      claimRequests: [
        {
          groupId: "0x2fbd9c11cf287736d3af749b5cc4910d", // RociFi NFCS holders On Base
          value: 1,
          isOptional: true
        },
        {
          groupId: "0xa7184fb811f39cf8880347fd32f7c9dd", // RociFi NFCS holders On Polygon
          value: 1,
          isOptional: true
        },
        {
          groupId: "0xb3ac412738ed399acab21fbda9add42c", // Rocifi Credit Score < 8
          value: 1,
        }
      ]
//      impersonateAddresses: ["0xEc2bb1d7A0F551709010E091319Ed52186BA913b", "0x8ab1760889F26cBbf33A75FD2cF1696BFccDc9e6", "dhadrien.sismo.eth", "0xA4C94A6091545e40fc9c3E0982AEc8942E282F38", "0x1b9424ed517f7700e7368e34a9743295a225d889", "0x82fbed074f62386ed43bb816f748e8817bf46ff7", "0xc281bd4db5bf94f02a8525dca954db3895685700", "telegram:dhadrien:1234", "github:dhadrien", "twitter:dhadrien_:2390703980"]
    },
    templateConfig: {
      step2CtaText: "Get onboard!",
      fields: [
        {
          type: "short-text",
          label: "Wallet address",
          placeholder: "0x123...",
          isRequired: true,
          helperText: "We need this so we can drop your ROCI tokens",
        },
        {
          type: "short-text",
          label: "(Optional) Email",
          placeholder: "johndoe@protonmail.com",
          helperText: "Add your email to be in touch and receive offers from us",
          isRequired: false,
        },
        {
          type: "short-text",
          label: "(Optional) Questions or comments",
          placeholder: "",
          isRequired: false,
        },
      ],
      congratulationsMessage: {
        title: "Congratulations!",
        description: "You will receive your ROCI soon 🚀",
      },
      output: {
        destination: {
          type: "google_sheet",
          spreadsheetId: "1ynNXkvf-ugIJiMqh2UwFKowca7sqxJyD5aLI2qt1THM",
        },
        saveAuths: true,
        saveClaims: true,
      },
    },
    options: {
      isFeatured: true,
      endDate: new Date("2023-09-01T10:00")
    },
  },

  ],
} as SpaceConfig;