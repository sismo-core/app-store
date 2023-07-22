import { SpaceConfig } from "../types";
import { AuthType } from "@sismo-core/sismo-connect-server";

//           UPDATE HERE ↓↓↓
export default {
  metadata: {
    name: "ErganismEthGlobal", // UPDATE HERE
    description:
      "We are the Erganism Team, we are looking to use Sismo!", // UPDATE HERE
    image: "erganismEthGlobale_picture_400x400.png", // UPDATE HERE
    socialLinks: [
      {
        type: "github",
        link: "https://github.com/Erganic", // UPDATE HERE
      },
      // OTHER TYPE OF LINK YOU CAN USE
      // {
      //   type: "twitter",
      //   link: "https://twitter.com/Sismo_eth",
      // },
      // {
      //   type: "discord",
      //   link: "https://discord.com/invite/sismo",
      // },
      // {
      //   type: "github",
      //   link: "https://github.com/Erganic",
      // },
    ],
  },
  apps: [
    // COPY FROM HERE

    {
      // NO UPDATE. Template type
      type: "zkForm",
      // UPDATE. App information
      metadata: {
        name: "Erganism Project", // UPDATE. Your app name
        slug: "ergnaism", // UPDATE. Your app name in the form of a slug (no spaces allowed). It will be the last part in the URL, eg: apps.sismo.io/sismo/swag-lottery
        description:
          "Using EAS for a new kind of NFTs", // UPDATE. The description is used for SEO and social media preview of your app
        image: "erganismEthGlobale_picture_400x400.png", // UPDATE. Image for your app, to be placed in the images folder
        tags: ["AESNFT"], // UPDATE. Add one or two tags to describe your app
        createdAt: new Date("2023-07-22T00:00:00.000Z"), // UPDATE. Edit the date here to today's date YYYY-MM-DD
        lastUpdateAt: new Date("2023-07-22T00:00:00.000Z"), // UPDATE OR REMOVE. Edit the date here to last update date YYYY-MM-DD
      },
      // UPDATE. Sismo Connect request, see "Cheatsheet: Build Your Sismo Connect Request"
      sismoConnectRequest: {
        appId: "{{ auto-fill }}", // NO UPDATE. Sismo Connect appId is automatically created based on your app metadata
        authRequests: [{ authType: AuthType.VAULT }], // UPDATE OR REMOVE. Select auth
        claimRequests: [{ groupId: "0xc90878eaa974c31bc62c52ad86121765" }], // UPDATE OR REMOVE. Select group
      },
      // UPDATE. Config for zkForm
      templateConfig: {
        step1CtaText: "Prove you are Eligible", // UPDATE OR REMOVE. 1st step text when users click on the app, "Sign in with Sismo" by default
        step2CtaText: "Be able to use our protocol", // UPDATE. 2nd step button text, on submitting the form
        appDescription: "You will prove that you are a member of Sismo Community to participate to this experience by providing your email.", // UPDATE OR REMOVE. Description for your app
        // UPDATE OR REMOVE. Form fields
        fields: [
          {
            type: "short-text", // NO UPDATE. Your field type
            label: "Email", // UPDATE. Your field name
            placeholder: "Double check please!", // UPDATE OR REMOVE. Your helper text
            isRequired: true, // UPDATE OR REMOVE. Field required or not, true by default
          },
        ],
        // UPDATE OR REMOVE. Success form message
        congratulationsMessage: {
          title: "Welcome to this adventure", // UPDATE. Your title
          description: "Thank you for your contribution", // UPDATE. Your message
        },
        // UPDATE. Data storage
        output: {
          destination: {
            type: "google_sheet", // NO UPDATE.
            spreadsheetId: "1WfXRYvcshc4q4Fah8qz8ROE3USk8544ZRQ8KCasO0Hc", // UPDATE. See "Add your App in the Sismo App Store"
          },
          saveAuths: true, // UPDATE OR REMOVE. Save Auths outputs in spreadsheet
          saveClaims: true, // UPDATE OR REMOVE. Save Claims outputs in spreadsheet
        },
      },
      // UPDATE OR REMOVE. App dates
      options: {
        startDate: new Date("2023-05-12T18:00"), // UPDATE OR REMOVE. Your start date YYYY-MM-DD
        endDate: new Date("2024-05-19T18:00"), // UPDATE OR REMOVE. Your end date YYYY-MM-DD
      },
    },

    // UNTIL HERE
  ],
} as SpaceConfig;
