export type SpaceConfig = {
  slug: string; // your unique slug
  name: string;
  description: string;
  logo?: string; // can be an url or local file
  banner?: string; // can be an url or local file
  publicContact?: {
    type: PublicContactType;
    link: string;
  }[];
  apps?: (ZkSubAppConfig | ZkDropAppConfig | ExternalAppConfig)[];
};

type PublicContactType = "twitter" | "discord" | "link" | "github" | "telegram";

// Every App will inherit this type
type AppCommonConfig = {
  name: string;
  description: string;
  image: string; // can be an url or local file
  tags: string[];
  // claimRequests?: ClaimRequest[];
  // authRequests?: AuthRequest[];
  buttonText: string;
  callbackMessage?: {
    title: string;
    description: string;
  };
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
  formGroup: {
    title: string;
    description: string;
    tooltip?: string;
    type: "custom" | "firstname-lastname" | "street-address | social-contacts"; // you can select either a preconfigured form group or a custom one
    inputs?: (InputText | InputDropdown | InputOther)[]; // if type is custom then inputs are required
  }[];
  output: "google_sheet";
};

type InputCommon = {
  name: string; // you can customize the name of the input that will be displayed in the form
  initialValue?: string; // you can set an initial value for the input
  tooltip?: string; // you can add a tooltip next to the input
  isRequired?: boolean; // you can set the input as required
};

type InputText = InputCommon & {
  type:
    | "text"
    | "textarea"
    | "number"
    | "email"
    | "tel"
    | "url"
    | "twitter"
    | "github"
    | "discord"
    | "telegram"
    | "evm-address";
  placeholder?: string; // You can customize the placeholder of the input
  validationRules?: {
    regEx: string;
    regExErrorMessage: string;
  }[]; // You can add validation rules to the input and error messages
};

type InputDropdown = InputCommon & {
  type: "dropdown";
  placeholder: string;
  options: {
    name: string;
  }[];
};

type InputOther = InputCommon & {
  type:
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "month"
    | "time"
    | "week";
};

// From sismo connect package
// type ClaimRequest = {
//   claimType?: ClaimType;
//   groupId?: string;
//   groupTimestamp?: number | "latest";
//   value?: number;

// 	isOptional?: boolean;
//   isSelectableByUser?: boolean;

//   extraData?: any;
// };

// config file => interface metiers

// config-tech
