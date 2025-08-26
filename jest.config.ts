export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  testPathIgnorePatterns: ["/node_modules/"],
  coverageDirectory: "./coverage",
  coveragePathIgnorePatterns: ["node_modules"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};
