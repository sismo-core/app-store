import { SpaceConfig } from "../types";

//           UPDATE HERE ↓↓↓
export default {
  metadata: {
    name: "Jonny's Space", // UPDATE HERE
    description:
      "Do you care about privacy, anon? Welcome to a world of experiments from the mind of Jonny.", // UPDATE HERE
    image: "jonnys-sismo-space.png", // UPDATE HERE
    socialLinks: [
      {
        type: "link", 
        link: "https://www.jonnyhowle.com/", // UPDATE HERE
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
      //   link: "https://github.com/sismo-core",
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
    name: "Jonny's New Drop", // UPDATE. Your app name
    slug: "jonnys-new-drop", // UPDATE. Your app name in the form of a slug (no spaces allowed). It will be the last part in the URL, eg: apps.sismo.io/sismo/swag-lottery
    description:
      "Prove you have a credential from Jonny and get access to his brain", // UPDATE. The description is used for SEO and social media preview of your app
    image: "sismo_zkform_swag_500x500.png", // UPDATE. Image for your app, to be placed in the images folder
    tags: ["Swag, Jonny"], // UPDATE. Add one or two tags to describe your app
		createdAt: new Date("2023-07-18T00:00:00.000Z"), // UPDATE. Edit the date here to today's date YYYY-MM-DD
  	lastUpdateAt: new Date("2023-07-18T00:00:00.000Z"), // UPDATE OR REMOVE. Edit the date here to last update date YYYY-MM-DD
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
    step2CtaText: "Participate in the world of Jonny", // UPDATE. 2nd step button text, on submitting the form
    appDescription: "You will prove that you are a member of Sismo Community to participate in the world of Jonny.", // UPDATE OR REMOVE. Description for your app
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
      title: "Fingers crossed!", // UPDATE. Your title
      description: "Welcome to the world of Jonny", // UPDATE. Your message
    },
		// UPDATE OR REMOVE. User selection
    userSelection: { type: "Lottery", maxNumberOfEntries: 10, numberOfWinners: 10 }, // UPDATE. Your type: "Lottery" or "FCFS". If "FCFS", only use parameter "maxNumberOfUsers". See Parameters explanation below.
    // UPDATE. Data storage
		output: {
      destination: {
        type: "google_sheet", // NO UPDATE.
        spreadsheetId: "18CkiFWt-JiWovPOh1uwVI830cnxElojV9d2t7-J48TA", // UPDATE. See "Add your App in the Sismo App Store"
      },
			saveAuths: true, // UPDATE OR REMOVE. Save Auths outputs in spreadsheet
      saveClaims: true, // UPDATE OR REMOVE. Save Claims outputs in spreadsheet
    },
  },
	// UPDATE OR REMOVE. App dates
  options: {
    startDate: new Date("2023-07-18T18:00"), // UPDATE OR REMOVE. Your start date YYYY-MM-DD
    endDate: new Date("2024-07-18T18:00"), // UPDATE OR REMOVE. Your end date YYYY-MM-DD
  },
},

// UNTIL HERE
    
  ],
} as SpaceConfig;
