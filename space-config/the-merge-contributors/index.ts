// add an images folder in your space folder if you would like Sismo to host your images

import { SpaceConfig } from "../types";

export const theMergeContributorsConfig: SpaceConfig = {
  slug: "the-merge-contributors",
  name: "The Merge Contributors",
  description: "Tribute to contributors to the Ethereum Merge.",
  profileImage: "pfp_Space_TheMergeContributors_400x400.png",
  coverImage: "Cover_Space_TheMergeContributors_1160x340.png",
  envs: ["Demo", "Prod"],
  hidden: false,
  apps: [
    {
      type: "external",
      name: "Mergooor Pass",
      description:
        "Claim your Mergooor Pass NFT - open to contributors to The Merge.",
      tags: ["NFT"],
      image: "Mergooor_NFT_1014x720px.png",
      CTAText: "Get NFT",
      link: "https://claim.zkdrop.io/mergooor-pass",
      claimRequests: [{ groupId: "0x42c768bb8ae79e4c5c05d3b51a4ec74a" }],
      slug: "zkbadge-mergooor",
      authRequests: [
        {
          authType: 0,
        }
      ],
    },
    {
      type: "zksub",
      name: "EthCC ticket exclusive access",
      description:
        "Register your email address to receive exclusive tickets for web3 events - open to contributors to The Merge.",
      tags: ["Event"],
      image: "EthCCtickets_1014x720px.png",
      CTAText: "Register to get tickets",
      fields: [
        {
          type: "short-text",
          label: "First name",
          isRequired: true,
        },
        {
          type: "short-text",
          label: "Last name",
          isRequired: true,
        },
        {
          type: "short-text",
          label: "Email",
          isRequired: true,
        },
      ],
      congratulationsMessage: {
        title: "Congratulations",
        description:
          "You have successfully registered to receive exclusive tickets for web3 events.",
      },
      slug: "ethcc-tickets",
      output: "google_sheet",
      appId: "0xffe981d059744847a152d6917b93366a",
      spreadsheetId: "1y94lpA5kWbGi_u50C-GlYKpeJp8aYxhI37D2GDVg--w",
      claimRequests: [{ groupId: /* TMP Sismo contributor */ "0xe9ed316946d3d98dfcd829a53ec9822e" }], // Mergooor contributor groupID "0x42c768bb8ae79e4c5c05d3b51a4ec74a"
      authRequests: [{ authType: 0 }],
      demo: {
        spreadsheetId: "1Wrh8gFPWuUfdip1wuOxBx_0bZQ_OJb2JsI5A-loRa-Y",
        appId: "0xffe981d059744847a152d6917b93366a",
      }
    },
  ],
};
