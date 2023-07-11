import { SpaceConfig } from "@/space-configs/types";
import { Network } from "@/src/libs/contracts/networks";
import { AuthType } from "@sismo-core/sismo-connect-server";

export const spaceMockWithZkBadge: SpaceConfig = {
  metadata: {
    slug: "space",
    name: "Space",
    description: "Space description",
    image: "space.png",
    socialLinks: [
      {
        type: "link",
        link: "https://www.space.com",
      },
    ],
  },
  apps: [
    {
      type: "zkBadge",
      metadata: {
        name: "ZK Badge name",
        slug: "sismo-zk-badge-slug",
        description: "Zk badge test description",
        tags: ["Badge"],
        image: "image.png",
        createdAt: new Date("2023-07-03T18:00"),
      },
      sismoConnectRequest: {
        appId: "0x4",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0x04" }],
      },
      templateConfig: {
        step2CtaText: "zkBadge step2CtaText",
        tokenId: "40000001",
        badgeMetadata: {
          name: "Badge name",
          description: "Badge description",
          image: "space_test_400x400.png",
        },
        chains: [
          {
            name: Network.Gnosis,
          },
        ],
      },
    },
    {
      type: "zkBadge",
      metadata: {
        name: "ZK Badge name not existing",
        slug: "sismo-zk-badge-slug-not-existing",
        description: "Zk badge test description",
        tags: ["Badge"],
        image: "image.png",
        createdAt: new Date("2023-07-03T18:00"),
      },
      sismoConnectRequest: {
        appId: "0x4",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0x04" }],
      },
      templateConfig: {
        step2CtaText: "zkBadge step2CtaText",
        tokenId: "40000002",
        badgeMetadata: {
          name: "Badge name",
          description: "Badge description",
          image: "un_existing_image_400x400.png",
        },
        chains: [
          {
            name: Network.Gnosis,
          },
        ],
      },
    },
  ],
};
