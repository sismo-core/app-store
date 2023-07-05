type Environment = {
  isMain: boolean;
  isDemo: boolean;
  isDev: boolean;
  isTest: boolean;
  hubApiUrl: string;
  redirection: string;
  telegramBotToken: string;
};

type EnvNames = "demo" | "dev" | "main" | "test";

export const isEnv = (envName: EnvNames) => {
  return process.env.NEXT_PUBLIC_NODE_ENV === envName;
};

const env: Environment = {
  isDemo: isEnv("demo"),
  isDev: isEnv("dev"),
  isMain: isEnv("main"),
  isTest: isEnv("test"),
  hubApiUrl: process.env.NEXT_PUBLIC_HUB_API_URL,
  redirection: process.env.NEXT_PUBLIC_REDIRECTION,
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
};

if (env.isDemo) {
  console.log("Mode Demo");
}

export default env;
