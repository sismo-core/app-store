import { AuthRequest, ClaimRequest } from "@sismo-core/sismo-connect-react";

export type SpaceConfig = {
  metadata: {
    name: string; // 80 characters max
    slug: string; // spaces.sismo.io/[slug]
    description: string; // 300 characters max
    image?: string; // 160x160px can be an url or local file
    socialLinks?: {
      type: SocialType;
      link: string;
    }[];
    tags?: string[];
  };
  apps?: AppConfig[];
  options?: {
    hidden?: boolean; // default false
  };
};

export type Env = "Demo" | "Prod";
export type AppConfig =
  | ZkFormAppConfig
  | ZkDropAppConfig
  | ExternalAppConfig
  | ZkBadgeAppConfig
  | ZkTelegramBotAppConfig;

type SocialType = "twitter" | "discord" | "link" | "github" | "telegram";

// Every App will inherit this type
type AppCommonConfig = {
  metadata: {
    name: string; // 40 characters max
    slug: string;
    description: string; // 200 characters max
    image: string; // 550x390px can be an url or local file
    tags: string[];
    createdAt: Date;
    lastUpdateAt?: Date;
  };
  sismoConnectRequest: {
    appId?: string;
    claimRequests?: ClaimRequest[];
    authRequests?: AuthRequest[];
    impersonateAddresses?: string[];
  };
  options?: {
    startDate?: Date;
    endDate?: Date;
    disabled?: boolean; // default false
    isFeatured?: boolean; // default false
  };
};

export type ExternalAppConfig = AppCommonConfig & {
  type: "external";
  templateConfig: {
    link: string;
  }
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

export type ZkDropAppConfig = AppCommonConfig & {
  type: "zkdrop";
  templateConfig: {
    step1CtaText?: string;
    step2CtaText: string;
    appDescription?: string;
    chainId: number;
    userSelection?: UserSelection; // default none
    contractAddress: string;
  };
};

export type ZkBadgeChainName = "gnosis";
export type ZkBadgeAppConfig = AppCommonConfig & {
  type: "zkBadge";
  templateConfig: {
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
};

export type ZkFormAppConfig = AppCommonConfig & {
  type: "zkForm";
  templateConfig: {
    step1CtaText?: string;
    step2CtaText: string;
    appDescription?: string;
    fields?: Field[];
    congratulationsMessage?: {
      title: string;
      description: string;
    };
    failedMessage?: {
      title: string;
      description: string;
    };
    userSelection?: UserSelection; // default none
    output: {
      destination: {
        type: "google_sheet";
        spreadsheetId: string;
      };
      saveAuths?: boolean;
      saveClaims?: boolean;
    };
  };
};

export type ZkTelegramBotAppConfig = AppCommonConfig & {
  type: "zkTelegramBot";
  templateConfig: {
    step1CtaText?: string;
    step2CtaText: string;
    appDescription?: string;
    telegramGroupId: string;
    telegramInviteLink: string;
  };
};


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