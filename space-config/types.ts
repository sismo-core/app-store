import { AuthRequest, ClaimRequest } from "@sismo-core/sismo-connect-react";

export type SpaceConfig = {
  name: string; // 80 characters max
  slug: string; // spaces.sismo.io/[slug]
  description: string; // 300 characters max

  profileImage?: string; // 160x160px can be an url or local file
  coverImage?: string; // 1440x340px can be an url or local file

  socialLinks?: {
    type: SocialType;
    link: string;
  }[];
  
  demoEnabled?: boolean; // default false
  hidden?: boolean; // default false
  apps?: App[];
};

export type App = ZkSubAppConfig | ZkDropAppConfig | ExternalAppConfig | ZkBadgeAppConfig;

type SocialType = "twitter" | "discord" | "link" | "github" | "telegram";

// Every App will inherit this type
type AppCommonConfig = {
  // App Card
  name: string; // 40 characters max
  description: string; // 200 characters max
  image: string; // 550x390px can be an url or local file
  tags: string[];
  CTAText: string;

  // Eligibility
  claimRequests?: ClaimRequest[];
  authRequests?: AuthRequest[];

  // App parameters
  startDate?: Date;
  endDate?: Date;

  disabled?: boolean; // default false
};

export type UserSelection = FirstComeFirstServed | Lottery;

export type Lottery = {
  type: "FCFS";
  maxNumberOfEntries: number;
  numberOfWinners: number;
}

export type FirstComeFirstServed = {
  type: "FCFS"
  maxNumberOfUsers: number;
}

export type ExternalAppConfig = AppCommonConfig & {
  type: "external";
  link: string;
};

export type ZkDropAppConfig = AppCommonConfig & {
  type: "zkdrop";
  chainId: number;
  contractAddress: string;
};


export type ZkBadgeAppConfig = AppCommonConfig & {
  type: "zkbadge";
  chainId: number;
  collectionId: string;
};

export type ZkSubAppConfig = AppCommonConfig & {
  type: "zksub";
  fields?: (ShortText | LongText | Select | Number | Social)[]; 
  congratulationsMessage?: {
    title: string;
    description: string;
  };  
  failedMessage?: {
    title: string;
    description: string;
  };
  userSelection?: UserSelection; // default none
  appId: string;
  output: "google_sheet";
  spreadsheetId?: string;
};

type ShortText = InputCommon & {
  type: "short-text"
}

type LongText = InputCommon & {
  type: "long-text"
}

type Select = InputCommon & {
  type: "select"
  values: { id: string, label: string }[];
}

type Number = InputCommon & {
  type: "number"
}

type Social = InputCommon & {
  type: "social",
  socialType: SocialType;
}

type InputCommon = {
  label: string;
  placeholder?: string;
  initialValue?: string;
  helperText?: string; // 80 characters max
  maxCharacter?: number;
  isRequired?: boolean;
};
