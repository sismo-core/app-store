import { AuthRequest, ClaimRequest } from "@sismo-core/sismo-connect-react";

export type SpaceType = {
  name: string; // 80 characters max
  slug: string; // spaces.sismo.io/[slug]
  description: string; // 300 characters max

  profileImage?: string; // 160x160px can be an url or local file
  coverImage?: string; // 1440x340px can be an url or local file
  tags?: string[];

  socialLinks?: {
    type: SocialType;
    link: string;
  }[];

  hidden?: boolean; // default false
  apps?: ZkAppType[];
};

export type ZkAppType =
  | ExternalAppType
  | ZkFormAppType
  | ZkTelegramBotAppType
  | ZkDropAppType
  | ZkBadgeAppType
  | ZkCustomAppType;

type SocialType = "twitter" | "discord" | "link" | "github" | "telegram";

// Every App will inherit this type
export type AppCommonType = {
  // App Card
  name: string; // 40 characters max
  slug: string;
  description: string; // 200 characters max
  image: string; // 550x390px can be an url or local file
  tags: string[];
  ctaText: string;
  createdAt?: Date;
  lastUpdateAt?: Date;
  isFeatured?: boolean; // default false

  // Eligibility
  appId: string;
  claimRequests?: ClaimRequest[];
  authRequests?: AuthRequest[];
  impersonateAddresses?: string[];

  // App parameters
  startDate?: Date;
  endDate?: Date;

  disabled?: boolean; // default false
};

export type UserSelection = FirstComeFirstServed | Lottery;

export type Lottery = {
  type: "Lottery";
  maxNumberOfEntries: number;
  numberOfWinners: number;
};

export type FirstComeFirstServed = {
  type: "FCFS";
  maxNumberOfUsers: number;
};

export type ExternalAppType = AppCommonType & {
  type: "external";
  link: string;
};

export type ZkDropAppType = AppCommonType & {
  type: "zkdrop";
  chainId: number;
  userSelection?: UserSelection; // default none
  contractAddress: string;
};

export type ZkBadgeAppType = AppCommonType & {
  type: "zkbadge";
  chainId: number;
  collectionId: string;
};

export type ZkFormAppType = AppCommonType & {
  type: "zkForm";
  fields?: Field[];
  saveClaims?: boolean;
  saveAuths?: boolean;
  congratulationsMessage?: {
    title: string;
    description: string;
  };
  failedMessage?: {
    title: string;
    description: string;
  };
  userSelection?: UserSelection; // default none
  output: "google_sheet";
  spreadsheetId?: string;
};

export type ZkTelegramBotAppType = AppCommonType & {
  type: "zkTelegramBot";
  telegramGroupId: string;
  telegramInviteLink: string;
};

export type ZkCustomAppType = AppCommonType & {
  type: "zkCustom";
  extraData: any;
}

export type Field = ShortText | LongText | Select | Number | Social;

export type ShortText = InputCommon & {
  type: "short-text";
};

export type LongText = InputCommon & {
  type: "long-text";
};

export type Select = InputCommon & {
  type: "select";
  values: { id: string; label: string }[];
};

export type Number = InputCommon & {
  type: "number";
};

export type Social = InputCommon & {
  type: "social";
  socialType: SocialType;
};

type InputCommon = {
  label: string;
  placeholder?: string;
  initialValue?: string;
  helperText?: string; // 80 characters max
  maxCharacter?: number;
  isRequired?: boolean;
};
