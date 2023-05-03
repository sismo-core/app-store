
if (process.env.IS_DEMO && process.env.IS_DEMO !== "false" && process.env.IS_DEMO !== "true") {
    throw new Error(`IS_DEMO cannot be different than "true" or "false"`);
}

type Environment = {
    isDemo: boolean
};

const env: Environment = {
    isDemo: process.env.IS_DEMO ? JSON.parse(process.env.IS_DEMO) : false
}

if (env.isDemo) {
    console.log("Mode Demo");
}


export default env;