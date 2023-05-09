import { AuthRequest, ClaimRequest } from "@sismo-core/sismo-connect-react";

export type SpaceConfig = {
  slug: string; // your unique slug
  name: string;
  description: string;
  logo?: string; // can be an url or local file
  banner?: string; // can be an url or local file
  publicContacts?: {
    type: PublicContactType;
    link: string;
  }[];
  demoEnabled?: boolean; // default false
  hidden?: boolean; // default false
  apps?: App[];
};

export type App = ZkSubAppConfig | ZkDropAppConfig | ExternalAppConfig;

type PublicContactType = "twitter" | "discord" | "link" | "github" | "telegram";

// Every App will inherit this type
type AppCommonConfig = {
  name: string;
  description: string;
  image: string; // can be an url or local file
  
  tags: string[];
  claimRequests?: ClaimRequest[];
  authRequests?: AuthRequest[];
  buttonText: string;
  callbackMessage?: {
    title: string;
    description: string;
  };
  disabled?: boolean; // default false
};

export type ExternalAppConfig = AppCommonConfig & {
  type: "external-app";
  link: string;
};

// Will be in the ZkDrop app folder
export type ZkDropAppConfig = AppCommonConfig & {
  type: "zkdrop-app";
  contractAddress: string;
  chainId: number;
};

// Will be in the ZkSub app folder
export type ZkSubAppConfig = AppCommonConfig & {
  type: "zksub-app";
  inputs?: (InputText | InputAddress)[]; // if type is custom then inputs are required
  output: "google_sheet";
};

type InputCommon = {
  name: string; // you can customize the name of the input that will be displayed in the form
  initialValue?: string; // you can set an initial value for the input
  tooltip?: string; // you can add a tooltip next to the input
  isRequired?: boolean; // you can set the input as required
};

type InputAddress = InputCommon & {
  type: "street-address";
};

type InputText = InputCommon & {
  type:
    | "text"
    | "number"
    | "email"
    | "url"
    | "twitter"
    | "github"
    | "discord"
    | "telegram"
    | "evm-address";
  placeholder?: string; // You can customize the placeholder of the input
};
