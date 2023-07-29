import { SpaceConfig } from "../types";
import { AuthType } from "@sismo-core/sismo-connect-server";

//           UPDATE HERE ↓↓↓
export default {
  metadata: {
    name: "OP Citizen", // UPDATE HERE
    description:
      "Space dedicated to OP Citizen. This badge celebrate fullfilment of KYC still preserving your privacy.", // UPDATE HERE
    image: "opcitizen_space_pfp.png", // UPDATE HERE
    socialLinks: [
      {
        type: "link", 
        link: "https://www.optimism.io/", // UPDATE HERE
      },
      {
        type: "twitter", 
        link: "https://twitter.com/optimismFND/", // UPDATE HERE
      },
      {
        type: "discord", 
        link: "https://discord.gg/optimism/", // UPDATE HERE
      },
    ],
  },
  apps: [
      {
      // NO UPDATE. Template type
      type: "zkForm",
      // UPDATE. App information
      metadata: {
        name: "OP Citizen", // UPDATE. Your app name
        slug: "op-citizen", // UPDATE. Your app name in the form of a slug (no spaces allowed). It will be the last part in the URL, eg: apps.sismo.io/sismo/swag-lottery
        description:
          "Prove you have completed KCY and clain the badge.", // UPDATE. The description is used for SEO and social media preview of your app
        image: "op-citizen.png", // UPDATE. Image for your app, to be placed in the images folder
        tags: ["Optimism", "OP Citizen"], // UPDATE. Add one or two tags to describe your app
      	createdAt: new Date("2023-07-29T00:00:00.000Z"), // UPDATE. Edit the date here to today's date YYYY-MM-DD
      	// lastUpdateAt: new Date("2022-07-01T00:00:00.000Z"), // UPDATE OR REMOVE. Edit the date here to last update date YYYY-MM-DD
      },
      // UPDATE. Sismo Connect request, see "Cheatsheet: Build Your Sismo Connect Request"
      sismoConnectRequest: {
        appId: "0x18aefc6c64fd2be0f4cb4cc0d16c9792", // NO UPDATE. Sismo Connect appId is automatically created based on your app metadata
        authRequests: [{ authType: AuthType.VAULT }], // UPDATE OR REMOVE. Select auth
        claimRequests: [{ groupId: "0x3a027cf4f8a0c300a3ba1592caa2cb08" }], // UPDATE OR REMOVE. Select group
      },
      // UPDATE. Config for zkForm
      templateConfig: {
        step1CtaText: "Enter the Sybil-Resistant Lottery", // UPDATE OR REMOVE. 1st step text when users click on the app, "Sign in with Sismo" by default
        step2CtaText: "Get your Optimism Citizen badge", // UPDATE. 2nd step button text, on submitting the form
        appDescription: "Prove that you have KYCed or selected citizen at Optimism Collective.", // UPDATE OR REMOVE. Description for your app
        // UPDATE OR REMOVE. Form fields
        fields: [ 
          {
            type: "short-text", // NO UPDATE. Your field type
            label: "Claiming Address", // UPDATE. Your field name
            placeholder: "Provide the address you will use to claim the NFT.", // UPDATE OR REMOVE. Your helper text
            isRequired: true, // UPDATE OR REMOVE. Field required or not, true by default
          },
        ],
        // UPDATE OR REMOVE. Success form message
        congratulationsMessage: {
          title: "Congrats!", // UPDATE. Your title
          description: "We are lucky to have you among us 💜 ", // UPDATE. Your message
        },
        // UPDATE OR REMOVE. User selection
        // userSelection: { type: "Lottery", maxNumberOfEntries: 10, numberOfWinners: 10 }, // UPDATE. Your type: "Lottery" or "FCFS". If "FCFS", only use parameter "maxNumberOfUsers". See Parameters explanation below.
        // UPDATE. Data storage
        output: {
          destination: {
            type: "google_sheet", // NO UPDATE.
            spreadsheetId: "1Jl_pdYjOlGie8mqLVpRMpY3JDHVEPYKBaP9qOHCcoK0", // UPDATE. See "Add your App in the Sismo App Store"
          },
          // saveAuths: true, // UPDATE OR REMOVE. Save Auths outputs in spreadsheet
          // saveClaims: true, // UPDATE OR REMOVE. Save Claims outputs in spreadsheet
        },
      },
      // UPDATE OR REMOVE. App dates
      options: {
        // startDate: new Date("2023-07-29T18:00"), // UPDATE OR REMOVE. Your start date YYYY-MM-DD
        endDate: new Date("2024-08-29T18:00"), // UPDATE OR REMOVE. Your end date YYYY-MM-DD
      },
    },
  ],
} as SpaceConfig;
