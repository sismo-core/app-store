// add an images folder in your space folder if you would like Sismo to host your images

import { AuthType } from "@sismo-core/sismo-connect-client";
import { SpaceConfig } from "../types";

export default {
  metadata: {
    name: "The Merge Contributors",
    description: "Tribute to contributors to the Ethereum Merge.",
    image: "pfp_Space_TheMergeContributors_400x400.png",
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
        createdAt: new Date("2022-07-01T00:00:00.000Z"),
      },
      sismoConnectRequest: {
        appId: "0x0f38b4eb4d51fbd7906c9c7574df075e",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [{ groupId: "0x42c768bb8ae79e4c5c05d3b51a4ec74a" }], // Mergooor contributor groupID "0x42c768bb8ae79e4c5c05d3b51a4ec74a"
        impersonateAddresses: ["vitalik.eth", "github:vbuterin", "twitter:VitalikButerin:295218901", "dhadrien.sismo.eth", "0xA4C94A6091545e40fc9c3E0982AEc8942E282F38", "0x1b9424ed517f7700e7368e34a9743295a225d889”, “0x82fbed074f62386ed43bb816f748e8817bf46ff7", "0xc281bd4db5bf94f02a8525dca954db3895685700", "telegram:dhadrien:1234", "github:dhadrien", "twitter:dhadrien_:2390703980"],
      },
      templateConfig: {
        step2CtaText: "Register to get tickets",
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
} as SpaceConfig;
