// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";
import { Network } from "@/src/libs/contracts/networks";
// test
export default {
  metadata: {
    name: "Leo",
    description: "This Leo space.",
    image: "leo_zk_badge.svg",
    socialLinks: [
      {
        type: "twitter",
        link: "https://twitter.com/leo21_eth",
      },
    ],
  },
  apps: [
    {
      type: "zkBadge",
      metadata: {
        name: "Leo ZK Badge",
        slug: "leo-zk-badge",
        description: "ZK Badge for leos friends",
        tags: ["Badge"],
        image: "leo_zk_badge.svg",
        createdAt: new Date("2023-07-09T18:00"),
      },
      sismoConnectRequest: {
        appId: "0x3cd083f134b5d767d1a64fed9c2c3f58",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0xd4cdaae916464870f7413a03b1fe8c31" }],
      },
      templateConfig: {
        step2CtaText: "Claim with Sismo",
        tokenId: "40000003",
        badgeMetadata: {
          name: "Leo ZK Badge",
          description: "ZK Badge for leos friends",
          image: "leo_zk_badge.svg"
        },
        chains: [{
          name: Network.Gnosis
        }]
      }
    }
  ],
} as SpaceConfig;
