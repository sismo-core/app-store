import { ZkBadgeChainName, ZkDropChainName } from "@/space-configs/types";
import { ImportedNextImage } from "@/src/utils/getImgSrcFromConfig";
import { AuthRequest, ClaimRequest } from "@sismo-core/sismo-connect-react";

export type SpaceType = {
  name: string; // 80 characters max
  slug: string; // spaces.sismo.io/[slug]
  description: string; // 300 characters max

  profileImage?: string | ImportedNextImage; // 160x160px can be an url or local file
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
  | CustomAppType;

type SocialType = "twitter" | "discord" | "link" | "github" | "telegram";

// Every App will inherit this type
export type AppCommonType = {
  // App Card
  name: string; // 40 characters max
  slug: string;
  description: string; // 200 characters max
  innerDescription?: string;
  image: string | ImportedNextImage; // 550x390px can be an url or local file
  imageFilename: string;
  tags: string[];
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
  appDescription?: string;

  space: {
    slug: string;
    name: string;
    profileImage: string | ImportedNextImage;
  };
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
  type: "zkDrop";
  nftMetadata: {
    name: string;
    description: string;
    image: string;
  };
  chains: {
      contractAddress: `0x${string}`;
      name: ZkDropChainName;
      relayerEnabled?: boolean;
  }[];
  step1CtaText?: string;
  step2CtaText: string;
  appDescription?: string;
};


export type ZkBadgeAppType = AppCommonType & {
  type: "zkBadge";
  step1CtaText?: string;
  step2CtaText: string;
  appDescription?: string;
  tokenId: string;
  badgeMetadata: {
    name: string;
    description: string;
    image: string;
  };
  chains: {
    name: ZkBadgeChainName;
    relayerEnabled?: boolean;
  }[];
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
  step1CtaText: string;
  step2CtaText: string;
  appDescription?: string;
};

export type ZkTelegramBotAppType = AppCommonType & {
  type: "zkTelegramBot";
  telegramGroupId: string;
  telegramInviteLink: string;
  step1CtaText: string;
  step2CtaText: string;
  appDescription?: string;
};

export type CustomAppType = AppCommonType & {
  type: "custom";
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
