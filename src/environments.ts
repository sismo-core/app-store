import { Network } from "./libs/contracts/networks";

type Environment = {
  isMain: boolean;
  isDemo: boolean;
  isDev: boolean;
  isTest: boolean;
  hubApiUrl: string;
  redirection: string;
  telegramBotToken: string;
  defenderAPIKeys: {
    zkDrop: {
      [network in Network]: {
        key: string;
        secret: string;
      };
    };
    zkBadge: {
      [network in Network]: {
        key: string;
        secret: string;
      };
    };
  };
  zkBadgeAddresses: {
    [network in Network]: `0x${string}`;
  };
  pinata: {
    jwtToken?: string;
  };
};

type EnvNames = "demo" | "dev" | "main" | "test";

export const isEnv = (envName: EnvNames) => {
  return getEnvName() === envName;
};

export const getEnvName = () => {
  return process.env.NEXT_PUBLIC_NODE_ENV;
};

const env: Environment = {
  isDemo: isEnv("demo"),
  isDev: isEnv("dev"),
  isMain: isEnv("main"),
  isTest: isEnv("test"),
  hubApiUrl: process.env.NEXT_PUBLIC_HUB_API_URL,
  redirection: process.env.NEXT_PUBLIC_REDIRECTION,
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
  defenderAPIKeys: {
    zkDrop:
      process.env.SH_ZK_DROP_RELAY_DEFENDER_API_KEYS &&
      JSON.parse(process.env.SH_ZK_DROP_RELAY_DEFENDER_API_KEYS),
    zkBadge:
      process.env.SH_ZK_BADGE_RELAY_DEFENDER_API_KEYS &&
      JSON.parse(process.env.SH_ZK_BADGE_RELAY_DEFENDER_API_KEYS),
  },
  zkBadgeAddresses:
    process.env.NEXT_PUBLIC_ZK_BADGE_ADDRESSES &&
    JSON.parse(process.env.NEXT_PUBLIC_ZK_BADGE_ADDRESSES),
  pinata: {
    jwtToken: process.env.PINATA_JWT_TOKEN,
  },
};

if (env.isDemo) {
  console.log("Mode Demo");
}

export default env;
