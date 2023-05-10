// add an images folder in your space folder if you would like Sismo to host your images

import { SpaceConfig } from "../types";

export const theMergeContributorsConfig: SpaceConfig = {
  slug: "the-merge-contributors",
  name: "The Merge Contributors",
  description: "Tribute to contributors to the Ethereum merge.",
  profileImage: "pfp_Space_TheMergeContributors_400x400.png",
  coverImage: "Cover_Space_TheMergeContributors_1160x340.png",
  demoEnabled: true,
  hidden: false,
  apps: [
    {
      type: "external",
      name: "Mergooor Pass",
      description: "Claim a Mergooor Pass NFT - open to contributors to The Merge.",
      tags: ["NFT"],
      image: "pfp_Space_TheMergeContributors_400x400.png",
      CTAText: "Get NFT",
      link: "https://claim.zkdrop.io/mergooor-pass",

      claimRequests: [{ groupId: "0x42c768bb8ae79e4c5c05d3b51a4ec74a" }]
    },
    {
      type: "zksub",
      name: "EthCC ticket exclusive access",
      description: "Register your email address to receive exclusive tickets for web3 events - open to contributors to The Merge.",
      tags: ["Event"],
      image: "pfp_Space_TheMergeContributors_400x400.png",
      CTAText: "Register to get tickets",
      fields: [
        {
          type: "short-text",
          label: "First name",
          isRequired: true
        },
        {
          type: "short-text",
          label: "Last name",
          isRequired: true
        },
        {
          type: "short-text",
          label: "Email",
          isRequired: true
        }
      ],
      congratulationsMessage: {
        title: "Congratulations",
        description: "You have successfully registered to receive exclusive tickets for web3 events.",
      },
      output: "google_sheet",
      appId: null,
      spreadsheetId: null,
      claimRequests: [{ groupId: "0x42c768bb8ae79e4c5c05d3b51a4ec74a" }]
    },
  ],
};
