type Config = {
  spaces: {
    name: string;
    description: string;
    logo: string; // can be an url or local file
    banner: string; // can be an url or local file
    publicContact: {
      type: PublicContactType;
      link: string;
    }[],
    apps: (ZkSubAppConfig | ZkDropAppConfig | ExternalAppConfig)[];
  }[];
};

type SpaceConfig= {
  slug: string;
  name: string;
  description: string;
  logo?: string; // can be an url or local file
  banner?: string; // can be an url or local file
  publicContact?: {
    type: PublicContactType;
    link: string;
  }[],
  apps?: (ZkSubAppConfig | ZkDropAppConfig | ExternalAppConfig)[];
}

type PublicContactType = 'twitter' | 'discord' | 'link' | 'github' | 'telegram';

// Every App will inherit this type
type AppCommonConfig = {
  name: string;
  description: string;
  image: string; // can be an url or local file
  tags: string[]; 
  //claimRequests?: ClaimRequest[];
  //authRequests?: AuthRequest[];
  buttonText: string;
  callbackMessage?: {
    title: string;
    description: string; 
  }
}

type ExternalAppConfig = AppCommonConfig & {
  type: 'external-app';
  link: string;
}

// Will be in the ZkDrop app folder
type ZkDropAppConfig = AppCommonConfig & {
  type: 'zkdrop-app';
  contractAddress: string;
  chainId: number;
};

// Will be in the ZkSub app folder
type ZkSubAppConfig = AppCommonConfig & {
  type: 'zksub-app';
  formGroup: {
    title: string;
    description: string;
    tooltip?: string;
    type : "custom" | "street-address" | "merch" | "contact-details"
    inputs?: (InputCommon | InputText | InputDropdown | InputRadio )[];
  }[];
  output: 'google_sheet';
  };
    

type InputCommon = {
  name: string;
  type: "checkbox" | "color" | "date" | "datetime-local" | "month" | "time" | "week"
  initialValue?: string;
  tooltip?: string;
  isRequired?: boolean; // default false
} 

type InputText = InputCommon & {
    type: "text" | "email" | "number" | "tel" | "url" | "textarea" | "twitter" | "github"
    placeholder: string;
    validationRules?: {
        regEx: string;
        regExErrorMessage: string;
      }[];
}

type InputDropdown = InputCommon & {
    type: "dropdown";
    placeholder: string;
    options: {
        name: string;
      }[]; 
}

type InputRadio = InputCommon & {
    type: "radio";
    value: string;
    // initialValue not applicable to type radio
}

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





