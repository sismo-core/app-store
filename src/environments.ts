
if (process.env.IS_DEMO && process.env.IS_DEMO !== "false" && process.env.IS_DEMO !== "true") {
    throw new Error(`IS_DEMO cannot be different than "true" or "false"`);
}

type Environment = {
    isDemo: boolean
    hubApiUrl: string
};

const env: Environment = {
    isDemo: process.env.IS_DEMO ? JSON.parse(process.env.IS_DEMO) : false,
    hubApiUrl: process.env.HUB_API_URL
}

if (env.isDemo) {
    console.log("Mode Demo");
}


export default env;