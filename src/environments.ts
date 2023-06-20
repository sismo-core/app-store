import { redirect } from "next/dist/server/api-utils";

if (process.env.NEXT_PUBLIC_IS_DEMO && process.env.NEXT_PUBLIC_IS_DEMO !== "false" && process.env.NEXT_PUBLIC_IS_DEMO !== "true") {
    throw new Error(`NEXT_PUBLIC_IS_DEMO cannot be different than "true" or "false"`);
}

type Environment = {
    isDemo: boolean;
    isDev: boolean;
    hubApiUrl: string;
    redirection: string;
    telegramBotToken:string;
};

const env: Environment = {
    isDemo: process.env.NEXT_PUBLIC_IS_DEMO ? JSON.parse(process.env.NEXT_PUBLIC_IS_DEMO) : false,
    isDev: process.env.NEXT_PUBLIC_IS_DEV ? JSON.parse(process.env.NEXT_PUBLIC_IS_DEV) : false,
    hubApiUrl: process.env.HUB_API_URL,
    redirection: process.env.NEXT_PUBLIC_REDIRECTION,
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN
}

if (env.isDemo) {
    console.log("Mode Demo");
}

export default env;