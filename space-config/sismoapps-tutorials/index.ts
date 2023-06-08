// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType, ClaimType  } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

export const sismoAppsTutorialsConfig: SpaceConfig = {
  slug: "sismoapps-tutorials",
  name: "Sismo Apps Tutorials",
  description: "This Sismo Apps Tutorials space serves to showcase offchain and onchain tutorials to Sismo Builders. Offchain Tutorial - Build a sybil-resistant gated merch lottery: https://www.notion.so/sismo/Offchain-Tutorial-build-a-sybil-resistant-gated-merch-lottery-372fc1c22fe4481199a4971b4e659ee2.",
  profileImage: "space_sismo_pfp_400x400.png",
  coverImage: "space_sismo_cover_1740x540.png",
  socialLinks: [
    {
      type: "link",
      link: "https://www.sismo.io/",
    },
    {
      type: "twitter",
      link: "https://twitter.com/Sismo_eth",
    },
    {
      type: "discord",
      link: "https://discord.com/invite/sismo",
    },
    {
      type: "github",
      link: "https://github.com/sismo-core",
    },
  ],
  envs: ["Prod"],
  hidden: false,
  apps: [
    {
      type: "zksub",
      name: "Offchain Tutorial",
      description:
        "Enter the Sybil-resistant lottery to get a chance to be among the 100 lucky winners to receive exclusive merch.",
      tags: ["Merch", "Lottery"],
      image: "sismoapps_swag_lotery_1014x720.png",
      CTAText: "Win merch in our lottery",
      fields: [
        {
            type: "short-text",
            label: "First name",
            isRequired: true,
        },
        {
            type: "short-text",
            label: "Family name",
            isRequired: true,
        },
        {
            type: "short-text",
            label: "Postal address",
            isRequired: true,
        }
      ],
      congratulationsMessage: {
        title: "Fingers crossed",
        description:
          "We hope to have you as a lucky winner 🙂",
      },
      failedMessage: {
        title: "Sorry",
        description:
          "You were too late this time 🥲",
      },
      startDate: new Date("2023-06-07T18:00"),
      endDate: new Date("2023-07-07T18:00"),
      slug: "swag",
      demo: {
        spreadsheetId: "1EfapTqtkVZv_2hLe3sL4HgkiDHCVDCgglm5TLYfxC-U",
        appId: "0x040a317391d3a897e9910ee31c9b88ba",
      },
      output: "google_sheet",
      appId: "null",
      spreadsheetId: null,
      claimRequests: [
        {
          groupId: "0x311ece950f9ec55757eb95f3182ae5e2",
        },
        {
          groupId: "0x1cde61966decb8600dfd0749bd371f12",
          claimType: ClaimType.GTE,
          value: 15,
        }
      ],
      userSelection: { type: "Lottery", maxNumberOfEntries: null, numberOfWinners: 100 },
      authRequests: [{ authType: AuthType.VAULT }],
      envs: ["Prod"],
    }
  ],
};