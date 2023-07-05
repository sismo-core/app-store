// add an images folder in your space folder if you would like Sismo to host your images

import { AuthType } from "@sismo-core/sismo-connect-client";
import { SpaceConfig } from "../types";

export const theMergeContributorsConfigDemo: SpaceConfig = {
  metadata: {
    name: "The Merge Contributors",
    slug: "the-merge-contributors",
    description: "Tribute to contributors to the Ethereum Merge.",
    profileImage: "pfp_Space_TheMergeContributors_400x400.png",
  },
  apps: [
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
        createdAt: new Date("2022-07-01T00:00:00.000Z"),
      },
      sismoConnectRequest: {
        appId: "0x0f38b4eb4d51fbd7906c9c7574df075e",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0x42c768bb8ae79e4c5c05d3b51a4ec74a" }], // Mergooor contributor groupID "0x42c768bb8ae79e4c5c05d3b51a4ec74a"
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
            spreadsheetId: "1Wrh8gFPWuUfdip1wuOxBx_0bZQ_OJb2JsI5A-loRa-Y",
          },
        },
      },
      options: {
        isFeatured: true,
      },
    },
  ],
};
