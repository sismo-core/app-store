// add an images folder in your space folder if you would like Sismo to host your images
import { SpaceConfig } from "@/space-configs/types";
import { Network } from "@/src/libs/contracts/networks";
import { AuthType } from "@sismo-core/sismo-connect-server"

export const spaceMock1: SpaceConfig = {
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
      {
        type: "twitter",
        link: "https://twitter.com/space",
      },
      {
        type: "discord",
        link: "https://discord.com/invite/space",
      },
      {
        type: "github",
        link: "https://github.com/space",
      },
    ],
  },
  apps: [
    {
        type: "external",
        metadata: {
          name: "External name",
          slug: "external-slug",
          description:"External description",
          tags: ["External"],
          image: "external.png",
          createdAt: new Date("2023-07-03T18:00"),
        },
        sismoConnectRequest: {
          appId: "0x1",
          authRequests: [{ authType: AuthType.VAULT }],
          claimRequests: [{ groupId: "0x01", value: 3 }],
        },
        templateConfig: {
            link: "external-link"
        }
    },
    {
      type: "zkForm",
      metadata: {
        name: "zkForm name",
        slug: "zk-form-slug",
        description: "zk form description",
        tags: ["Event", "Ticket"],
        image: "zk-form.png",
        createdAt: new Date("2023-07-03T18:00"),
      },
      sismoConnectRequest: {
        appId: "0x2",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0x02", value: 3 }],
      },
      templateConfig: {
        step2CtaText: "zk form step2CtaText",
        fields: [
          {
            type: "short-text",
            label: "First Name",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Last Name",
            isRequired: true,
          },
        ],
        congratulationsMessage: {
          title: "Congratulation Title",
          description: "description",
        },
        failedMessage: {
          title: "Failed Title",
          description: "Failed description",
        },
        output: {
          destination: {
            type: "google_sheet",
            spreadsheetId: "spreadsheetId",
          },
          saveAuths: true,
          saveClaims: true,
        },
        userSelection: { type: "FCFS", maxNumberOfUsers: 40 },
      },
      options: {
        endDate: new Date("2023-07-10T18:00"),
      },
    },
    {
      type: "zkTelegramBot",
      metadata: {
        name: "Zk telegram bot",
        slug: "join-citadel",
        description: "Zk telegram bot description",
        image: "image.png",
        tags: ["Telegram"],
        createdAt: new Date("2023-07-01T18:00"),
      },
      sismoConnectRequest: {
        appId: "0x3",
        claimRequests: [{ groupId: "0x03", value: 3 }],
      },
      templateConfig: {
        step2CtaText: "zkTelegramBot step2CtaText",
        telegramGroupId: "1",
        telegramInviteLink: "invite link",
      },
    },
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
          image: "image.png"
        },
        chains: [{
          name: Network.Gnosis
        }]
      }
    },
    {
      type: "zkDrop",
      metadata: {
        name: "ZK Drop name",
        slug: "zk-drop-slug",
        description: "Zk drop test description",
        tags: ["Drop"],
        image: "image.png",
        createdAt: new Date("2023-07-03T18:00"),
      },
      sismoConnectRequest: {
        appId: "0x4",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0x04" }],
      },
      templateConfig: {
        isTransferable: true,
        nftMetadata: {
          name: "NFT Test",
          description: "This is a test description",
          image: "sismo-zkdrop.png"
        },
        chains: [{
            contractAddress: "{{ auto-fill }}",
            name: Network.Sepolia,
            relayerEnabled: true
        }],
        step1CtaText: "step 1",
        step2CtaText: "step 2",
        appDescription: "App description"
      }
    }
  ],
};


export const spaceMock2: SpaceConfig = {
    metadata: {
      slug: "space2",
      name: "Space2",
      description: "Space description2",
      image: "space.png2",
      socialLinks: [
        {
          type: "link",
          link: "https://www.space2.com",
        },
        {
          type: "twitter",
          link: "https://twitter.com/space2",
        },
        {
          type: "discord",
          link: "https://discord.com/invite/space2",
        },
        {
          type: "github",
          link: "https://github.com/space2",
        },
      ],
    },
    apps: [
      {
          type: "external",
          metadata: {
            name: "External name2",
            slug: "external-slug2",
            description:"External description2",
            tags: ["External"],
            image: "external2.png",
            createdAt: new Date("2023-07-03T18:00"),
          },
          sismoConnectRequest: {
            appId: "0x12",
            authRequests: [{ authType: AuthType.VAULT }],
            claimRequests: [{ groupId: "0x012", value: 3 }],
          },
          templateConfig: {
              link: "external-link2"
          }
      },
      {
        type: "zkForm",
        metadata: {
          name: "zkForm name2",
          slug: "zk-form-slug2",
          description: "zk form description2",
          tags: ["Event", "Ticket"],
          image: "zk-form2.png",
          createdAt: new Date("2023-07-03T18:00"),
        },
        sismoConnectRequest: {
          appId: "0x22",
          authRequests: [{ authType: AuthType.VAULT }],
          claimRequests: [{ groupId: "0x022", value: 3 }],
        },
        templateConfig: {
          step2CtaText: "zk form step2CtaText2",
          fields: [
            {
              type: "short-text",
              label: "First Name2",
              isRequired: true,
            },
            {
              type: "short-text",
              label: "Last Name2",
              isRequired: true,
            },
          ],
          congratulationsMessage: {
            title: "Congratulation Title2",
            description: "description2",
          },
          failedMessage: {
            title: "Failed Title2",
            description: "Failed description2",
          },
          output: {
            destination: {
              type: "google_sheet",
              spreadsheetId: "spreadsheetId2",
            },
            saveAuths: true,
            saveClaims: true,
          },
          userSelection: { type: "FCFS", maxNumberOfUsers: 40 },
        },
        options: {
          endDate: new Date("2023-07-10T18:00"),
        },
      },
      {
        type: "zkTelegramBot",
        metadata: {
          name: "Zk telegram bot2",
          slug: "join-citadel2",
          description: "Zk telegram bot description2",
          image: "image.png",
          tags: ["Telegram"],
          createdAt: new Date("2023-07-01T18:00"),
        },
        sismoConnectRequest: {
          appId: "0x3",
          claimRequests: [{ groupId: "0x03", value: 3 }],
        },
        templateConfig: {
          step2CtaText: "zkTelegramBot step2CtaText2",
          telegramGroupId: "1",
          telegramInviteLink: "invite link2",
        },
      },
      {
        type: "zkBadge",
        metadata: {
          name: "ZK Badge name",
          slug: "sismo-zk-badge-slug",
          description: "Zk badge test description2",
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
          step2CtaText: "zkBadge step2CtaText2",
          tokenId: "40000002",
          badgeMetadata: {
            name: "Badge name2",
            description: "Badge description2",
            image: "image2.png"
          },
          chains: [{
            name: Network.Gnosis
          }]
        }
      }
    ],
  };