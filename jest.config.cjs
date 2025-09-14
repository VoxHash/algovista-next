module.exports = {
  testEnvironment: "jsdom",
  transform: { "^.+\\.(t|j)sx?$": ["ts-jest", { tsconfig: "tsconfig.json" }] },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"]
};
