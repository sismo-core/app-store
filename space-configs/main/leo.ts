// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";
import { Network } from "@/src/libs/contracts/networks";

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
        name: "ZK Badge test",
        slug: "sismo-zk-badge-test",
        description: "Zk badge test description",
        tags: ["Badge"],
        image: "sismo_badge_test.png",
        createdAt: new Date("2023-07-09T18:00"),
      },
      sismoConnectRequest: {
        appId: "{{ auto-fill }}",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0xd4cdaae916464870f7413a03b1fe8c31" }],
      },
      templateConfig: {
        step2CtaText: "Claim with Sismo",
        tokenId: "40000003",
        badgeMetadata: {
          name: "Badge Leo",
          description: "Badge test description",
          image: "leo_zk_badge.svg"
        },
        chains: [{
          name: Network.Gnosis
        }]
      }
    }
  ],
} as SpaceConfig;
