import { SpaceConfig } from "../types";
import { AuthType } from "@sismo-core/sismo-connect-server";

//           UPDATE HERE ↓↓↓
export default {
  metadata: {
    name: "kugusha.eth space", // UPDATE HERE
    description:
      "This is a space of kugusha.eth", // UPDATE HERE
    image: "kugusha_eth_space_pic_pfp.png", // UPDATE HERE
    socialLinks: [
      {
        type: "twitter", 
        link: "https://twitter.com/kugusha", // UPDATE HERE
      },
    ],
  },
  apps: [
      {
      // NO UPDATE. Template type
      type: "zkForm",
      // UPDATE. App information
      metadata: {
        name: "Warpcast invite for EthCC[6] Attendees", // UPDATE. Your app name
        slug: "warpcast-invite", // UPDATE. Your app name in the form of a slug (no spaces allowed). It will be the last part in the URL, eg: apps.sismo.io/sismo/swag-lottery
        description:
          "Prove you have attended EthCC[6] and claim your Warpcast invite.", // UPDATE. The description is used for SEO and social media preview of your app
        image: "warpcaster_invite.png", // UPDATE. Image for your app, to be placed in the images folder
        tags: ["warpcast"], // UPDATE. Add one or two tags to describe your app
      	createdAt: new Date("2022-07-22T00:00:00.000Z"), // UPDATE. Edit the date here to today's date YYYY-MM-DD
      	// lastUpdateAt: new Date("2022-07-01T00:00:00.000Z"), // UPDATE OR REMOVE. Edit the date here to last update date YYYY-MM-DD
      },
      // UPDATE. Sismo Connect request, see "Cheatsheet: Build Your Sismo Connect Request"
      sismoConnectRequest: {
        appId: "{{ auto-fill }}", // NO UPDATE. Sismo Connect appId is automatically created based on your app metadata
        authRequests: [{ authType: AuthType.VAULT }], // UPDATE OR REMOVE. Select auth
        claimRequests: [{ groupId: "0x3a027cf4f8a0c300a3ba1592caa2cb08" }], // UPDATE OR REMOVE. Select group
      },
      // UPDATE. Config for zkForm
      templateConfig: {
        step1CtaText: "Sign in with Sismo", // UPDATE OR REMOVE. 1st step text when users click on the app, "Sign in with Sismo" by default
        step2CtaText: "Get your Warpcast invite", // UPDATE. 2nd step button text, on submitting the form
        appDescription: "Prove that you hold Eth[6] Attendees POAP, share your email and receive an invite to Warpcast.", // UPDATE OR REMOVE. Description for your app
        // UPDATE OR REMOVE. Form fields
        fields: [ 
          {
            type: "short-text", // NO UPDATE. Your field type
            label: "Email", // UPDATE. Your field name
            placeholder: "The invite will be sent to you via email.", // UPDATE OR REMOVE. Your helper text
            isRequired: true, // UPDATE OR REMOVE. Field required or not, true by default
          },
        ],
        // UPDATE OR REMOVE. Success form message
        congratulationsMessage: {
          title: "Congrats!", // UPDATE. Your title
          description: "Your invite will be sent to you via email shortly 💜 ", // UPDATE. Your message
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
        // startDate: new Date("2023-05-12T18:00"), // UPDATE OR REMOVE. Your start date YYYY-MM-DD
        endDate: new Date("2023-08-22T18:00"), // UPDATE OR REMOVE. Your end date YYYY-MM-DD
      },
    },
  ],
} as SpaceConfig;
