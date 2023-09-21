import { SpaceConfig } from "../types";
import { AuthType } from "@sismo-core/sismo-connect-server";

//           UPDATE HERE ↓↓↓
export default {
  metadata: {
    name: "Robs cave", // UPDATE HERE
    description:
      "Welcome to my cave, don't expect much but feel free to dig around.", // UPDATE HERE
    image: "Abel_E_bunny_400x400.png", // UPDATE HERE
    socialLinks: [
      {
        type: "twitter", 
        link: "https://twitter.com/robsvensek", // UPDATE HERE
      },
            {
        type: "github", 
        link: "https://github.com/robsven", // UPDATE HERE
      },
    ],
  },
  apps: [
{
  // NO UPDATE. Template type
  type: "zkForm",
  // UPDATE. App information
  metadata: {
    name: "Virtual hug", // UPDATE. Your app name
    slug: "virtual-hug", // UPDATE. Your app name in the form of a slug (no spaces allowed). It will be the last part in the URL, eg: apps.sismo.io/sismo/swag-lottery
    description:
      "Get yourself a virtual hug by proving that you are part of Sismo Comunity", // UPDATE. The description is used for SEO and social media preview of your app
    image: "Abel_E_bunny_500x500", // UPDATE. Image for your app, to be placed in the images folder
    tags: ["Free hugs"], // UPDATE. Add one or two tags to describe your app
  	createdAt: new Date("2023-09-21T00:00:00.000Z"), // UPDATE. Edit the date here to today's date YYYY-MM-DD
  	lastUpdateAt: new Date("2023-09-21T00:00:00.000Z"), // UPDATE OR REMOVE. Edit the date here to last update date YYYY-MM-DD
  },
  // UPDATE. Sismo Connect request, see "Cheatsheet: Build Your Sismo Connect Request"
  sismoConnectRequest: {
    appId: "{{ auto-fill }}", // NO UPDATE. Sismo Connect appId is automatically created based on your app metadata
    authRequests: [
      { 
      authType: AuthType.VAULT,
      },
      { 
      authType: AuthType.TWITTER, 
      isOptional: true,
      },
    ], 
    claimRequests: [
      {
      // Sismo comunity member
      groupId: "0xd630aa769278cacde879c5c0fe5d203c",
      isSelectableByUser: true, 
      },
      {
      // gitcoin-passport-holders
      groupId: "0x1cde61966decb8600dfd0749bd371f12",
      value: 10, 
      },
      signature: { message: "I want a hug" }
    ],
  },
  // UPDATE. Config for zkForm
  templateConfig: {
    step1CtaText: "Prove you are Eligible", // UPDATE OR REMOVE. 1st step text when users click on the app, "Sign in with Sismo" by default
    step2CtaText: "Get hug", // UPDATE. 2nd step button text, on submitting the form
    fields: [ 
      {
        type: "long-text", // NO UPDATE. Your field type
        label: "Say hi", // UPDATE. Your field name
        placeholder: "Don't be shy", // UPDATE OR REMOVE. Your helper text
        isRequired: true, // UPDATE OR REMOVE. Field required or not, true by default
      },
    ],
    // UPDATE OR REMOVE. Success form message
    congratulationsMessage: {
      title: "Here you go, a free virtual hug", // UPDATE. Your title
      description: "", // UPDATE. Your message
    },
    // UPDATE. Data storage
    output: {
      destination: {
        type: "google_sheet", // NO UPDATE.
        spreadsheetId: "1cJKfEvrvfvjjA0J3ZtcTYKw-tESP0REvRHKX5fk2g9Y", // UPDATE. See "Add your App in the Sismo App Store"
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

],
} as SpaceConfig;
