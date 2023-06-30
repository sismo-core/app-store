// add an images folder in your space folder if you would like Sismo to host your images

import { AuthType } from "@sismo-core/sismo-connect-client";
import { SpaceConfig } from "../types";

export const theMergeContributorsConfigMain: SpaceConfig = {
  metadata: {
    name: "The Merge Contributors",
    slug: "the-merge-contributors",
    description: "Tribute to contributors to the Ethereum Merge.",
    profileImage: "pfp_Space_TheMergeContributors_400x400.png",
    coverImage: "Cover_Space_TheMergeContributors_1160x340.png",
  },
  apps: [
    {
      type: "external",
      metadata: {
        name: "Mergooor Pass",
        slug: "zkbadge-mergooor",
        description: "Claim your Mergooor Pass NFT - open to contributors to The Merge.",
        tags: ["NFT"],
        image: "Mergooor_NFT_1014x720px.png",
        ctaText: "Get NFT",
      },
      sismoConnectRequest: {
        authRequests: [
          {
            authType: AuthType.VAULT,
          },
        ],
        claimRequests: [{ groupId: "0x42c768bb8ae79e4c5c05d3b51a4ec74a" }],
      },
      templateConfig: {
        link: "https://claim.zkdrop.io/mergooor-pass",
      },
    },
    {
      type: "zkForm",
      metadata: {
        name: "EthCC ticket exclusive access",
        slug: "ethcc-tickets",
        description:
          "Register your email address to receive exclusive tickets for web3 events - open to contributors to The Merge.",
        tags: ["Event"],
        image: "EthCCtickets_1014x720px.png",
        ctaText: "Register to get tickets",
      },
      sismoConnectRequest: {
        appId: "0x0f38b4eb4d51fbd7906c9c7574df075e",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0xd4cdaae916464870f7413a03b1fe8c31" }], // Mergooor contributor groupID "0x42c768bb8ae79e4c5c05d3b51a4ec74a"
      },
      templateConfig: {
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
        output: {
          destination: {
            type: "google_sheet",
            spreadsheetId: "1y94lpA5kWbGi_u50C-GlYKpeJp8aYxhI37D2GDVg--w",
          },
        },
      },
    },
  ],
};
