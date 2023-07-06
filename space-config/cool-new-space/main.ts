// add an images folder in your space folder if you would like Sismo to host your images
import { AuthType, ClaimType } from "@sismo-core/sismo-connect-server";
import { SpaceConfig } from "../types";

//           UPDATE HERE ↓↓↓
export const CoolNewSpace : SpaceConfig = {
  metadata: {
    slug: "cool-new-space", // UPDATE HERE
    name: "Sasha's Cool New Space", // UPDATE HERE
    description:
      "This Space is very cool. https://sismo.mirror.xyz/z-hka-hlI3wiJE8zmr2E3KviwYGh6QymzHiBH5BMOwM", // UPDATE HERE
    profileImage: "my_new_space_picture_400x400.png", // UPDATE HERE
    socialLinks: [
      {
        type: "link",
        link: "https://www.sismo.io/", // UPDATE HERE
      },
    ],
  }, 
  apps: [
    {
      // Type: We use zkForm template here to get a gated form app.
      type: "zkForm",
      // metadata contains information about your app
      metadata: {
        // Your App Name
        name: "Feedback Form for App Testers",
        // Your App name in form of a slug. It will be the last part in the URL. No Spaces allowed 
        slug: "feedback-form-my-app-testers",
        // Enter a description for you App here, what is this app for? 
        // This is used for SEO and rich social media content
        description:
          "Provide feedback on my app through the gated form.",
        // Add one or two tags to your App
        tags: ["Feedback"],
        // Image for you App, to be placed in the image folder of your Space
        image: "your_app_image_500x500.png.png",
        // Edit date here to today
        createdAt: new Date("2023-07-06T09:00"),
      },
      // Customise your request. See tutorial "Customise your Sismo Connect Request"
      sismoConnectRequest: {
        appId: "0xd4fa88e79072e6e54f6a5a3c9ceb6bb3",
        authRequests: [{ authType: AuthType.TWITTER }],
        claimRequests: [
          {
      groupId: "0x1cde61966decb8600dfd0749bd371f12",  
            claimType: ClaimType.GTE, // a member of the group with the value greater or equal to 15
            value: 15,
          },
        ],
      },
      // We will cover this in Tutorial 2.1 Step 2
      templateConfig: {
        // Text that will be shown in the Button for the 2nd Step (on submitting the form).
        // step2CtaText: "Submit your feedback",
        // App Description that will be shown in the Sismo App Store
        // appDescription: "Anyone who tested my app can provide feedback and share the wallet with me without linking it to your twitter that was used for testing. I will send you test tokens. ",
        // List of Form field for zkForm
        fields: [
          {
            type: "short-text",
            label: "Email",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Feedback",
            // placeholder: "What is your name?",
            isRequired: true,
          },
          {
            type: "short-text",
            label: "Your EVM wallet",
            placeholder: "Add your wallet or ens",
            isRequired: true,
          },
        ],
        // The Message that will be displayed on successfully submitting the form
        congratulationsMessage: {
          title: "Congratulations!",
          description: "Thank you for your response 💜",
        },
        // We will cover this in Tutorial 2.1 Step 4
        output: {
          // Contains information on where to store the submitted Form data
          destination: {
            type: "google_sheet",
            spreadsheetId: "1T2wYDvJZa8BdwIOE9SNvzIotfHgLpLYSV15pIF8vp7M",
          },
        },
      },
    },
    {
    	// Type: We use zkTelegramBot template for a gated Telegram Group. Don't change the type!
      type: "zkTelegramBot",
      metadata: {
    		// Your app Name
        name: "Join Sasha's freinds chat",
    		// Your app name in form of a slug. It will be the last part in the URL. No Spaces allowed 
        slug: "sashas-tg-chat",
    		// The description is used for SEO and social media preview of your app
        description:
          "Prove my that you're Sismo contributor and we can be freinds.",
        // Add one or two tags to your app
    		tags: ["Telegram", "Chat"],
    		// Image for you app, to be placed in the image folder of your Space
    		image: "your_app_image1_500x500.png",
    		// Edit the date here to today's date YYYY-MM-DD
        createdAt: new Date("2023-07-06T18:00"),
      },
    	// Customise your request. See tutorial "Customise your Sismo Connect Request"
      sismoConnectRequest: {
        appId: "0xbd7ba29c79f672c86f8d0ef333970a90",
        authRequests: [{ authType: AuthType.VAULT }],
        claimRequests: [
          { 
            groupId: "0xd630aa769278cacde879c5c0fe5d203c",
            claimType: ClaimType.GTE,
            value: 1,
          },
        ],
      },
    	// We will cover this in Tutorial 2.2 Step 2
      templateConfig: {
    		// Text that will be shown in the Button for the 2nd Step (on opening the link to join).
    		step2CtaText: "Join my chat",
    		// App description that will be shown in the Sismo App Store
    		appDescription: "Have you contributed to Sismo? Let's be freinds and connect.",
        // This will be covered in the Tutorial Part 2.2 Step 3.
    		telegramGroupId: "1001906796774",
        telegramInviteLink: "https://t.me/+IcDujN3vvr0yODMy",
      },
    },
  ]
};
