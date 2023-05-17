import nextJest from "next/jest";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-node-single-context",
  preset: "ts-jest",
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
  // moduleDirectories: ["node_modules", "src"],
  // testEnvironment: "jest-environment-node-single-context",
};

process.env = {
  ...process.env,
    // These env vars needs to be defined for the aws sdk to work
    AWS_REGION: "eu-west-1",
    AWS_ACCESS_KEY_ID: "minioadmin",
    AWS_SECRET_ACCESS_KEY: "minioadmin",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
