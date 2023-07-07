// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType, ClaimType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

//           UPDATE HERE ↓↓↓
export const SashaSpace : SpaceConfig = {
  metadata: {
    slug: "another-great-space", // UPDATE HERE
    name: "My second great Space", // UPDATE HERE
    description:
      "This is another test!", // UPDATE HERE
    image: "my_new_space_picture_500x500.png", // UPDATE HERE
    socialLinks: [
      {
        type: "link",
        link: "https://www.sismo.io/", // UPDATE HERE
      },
      {
        type: "twitter",
        link: "https://twitter.com/kugusha", // UPDATE HERE
      },
    ],
  }, 
  apps: [
    {
    	// Type: We use zkForm template here to get a gated form app. Don't change the Type!
      type: "zkForm",
    	// Metadata contains information about your app
      metadata: {
    		// Your app Name
        name: "Happy 26 to me",
    		// Your app name in form of a slug. It will be the last part in the URL. No Spaces allowed 
        slug: "bday-invite",
    		// The description is used for SEO and social media preview of your app
        description:
          "You all are invited!",
    		// Add one or two tags to your app
        tags: ["Invite", "Form"],
    		// Image for you app, to be placed in the image folder of your Space
    		image: "your_app_image_500x500.png",
    		// Edit the date here to today's date YYYY-MM-DD
    		createdAt: new Date("2023-07-06T18:00"),
      },
    	// Customise your request. See tutorial "Customise your Sismo Connect Request"
      sismoConnectRequest: {
        appId: "0xb3e5414249f65a8cd47fa02571e74c2d",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [
          {
            groupId: "0x99bb9f2bd7b79710157c128737d9b100",
          },
        ],
      },
    	// We will cover this in Tutorial 2.1 Step 2
      templateConfig: {
    		// Text that will be shown in the Button for the 2nd Step (on submitting the form)
    		step2CtaText: "Submit your Form",
    		// App description that will be shown in the Sismo App Store
    		appDescription: "If you're my follower, you're invited to my anon bday party!",
        // Define the fields for your form
    		fields: [
          {
            type: "short-text",
            label: "Email",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Full name",
            isRequired: true,
          },
        ],
    		// The message on the success page
        congratulationsMessage: {
          title: "You're in!",
          description: "I'll send you the invite soon. See you on the 29th! ",
        },
    		// We will cover this in Tutorial 2.1 Step 4
        output: {
    			// Contains information on where to store the submitted form data
          destination: {
            type: "google_sheet",
            spreadsheetId: "1rbHP-vOvBpEi-YDbeyk40_9XW7DNRnI73BNBskj63qw",
          },
        },
      },
    },
    {
    	// Type: We use zkTelegramBot template for a gated Telegram Group. Don't change the type!
      type: "zkTelegramBot",
      metadata: {
    		// Your app Name
        name: "Join anon chat",
    		// Your app name in form of a slug. It will be the last part in the URL. No Spaces allowed 
        slug: "anon-tg-chat",
    		// The description is used for SEO and social media preview of your app
        description:
          "Random chat for test.",
        // Add one or two tags to your app
    		tags: ["Telegram", "Chat"],
    		// Image for you app, to be placed in the image folder of your Space
    		image: "your_app_image1_500x500.png",
    		// Edit the date here to today's date YYYY-MM-DD
        createdAt: new Date("2023-07-07T18:00"),
      },
    	// Customise your request. See tutorial "Customise your Sismo Connect Request"
      sismoConnectRequest: {
        appId: "0xa83b7b0d5e268fb4aa3d3582e11700fa",
        claimRequests: [{ groupId: "0xd630aa769278cacde879c5c0fe5d203c", value: 3 }],
      },
    	// We will cover this in Tutorial 2.2 Step 2
      templateConfig: {
    		// Text that will be shown in the Button for the 2nd Step (on opening the link to join).
    		step2CtaText: "Enter the chat",
    		// App description that will be shown in the Sismo App Store
    		appDescription: "Group of anons",
        // This will be covered in the Tutorial Part 2.2 Step 3.
    		telegramGroupId: "-1001689757210",
        telegramInviteLink: "https://t.me/+wUMNNKKfE_U2Mzdi",
      },
    },
  ]
};
