export default {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePaths: ["src", "test"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-transformer-svg",
  },
  collectCoverage: true,
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  setupFiles: ["<rootDir>/jest.polyfills.ts"],
  coveragePathIgnorePatterns: [
    "styles.ts",
    "<rootDir>/src/services",
    "<rootDir>/mocks",
    "helpers.ts",
  ],
};
