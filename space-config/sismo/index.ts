import { SpaceConfig } from "../types";

export const sismoConfig: SpaceConfig = {
  slug: "sismo",
  name: "Sismo",
  description:
    "Sismo is a communication protocol...",
  banner: "banner.png",
  apps: [
    {
      type: "zksub-app",
      name: "Sismo newsletter",
      description: "Join our newsletter",
      tags: ["tag1", "tag2"],
      image: "banner.png",
      buttonText: "register",
      inputs: [{
        name: "Email",
        type: "email"
      }],
      output: "google_sheet"
    }
  ]
};