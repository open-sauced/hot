module.exports = {
  "roots": [
    "<rootDir>/src/"
  ],
  "testEnvironment": "jsdom",
  "setupFilesAfterEnv": [
    "<rootDir>/jest.setup.cjs"
  ],
  "transform": {
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "<rootDir>/__mocks__/babelTransform.js",
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/node_modules/",
    "!src/**/*.d.ts"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 30,
      "functions": 30,
      "lines": 30,
      "statements": 30
    }
  },
  "coverageReporters": [
    "text",
    "text-summary"
  ],
  "moduleNameMapper": {
    "^.+\\.module\\.(css|sass|scss|less)$": "identity-obj-proxy",
  },
};
