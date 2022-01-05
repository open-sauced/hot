module.exports = {
  "rootDir": '../',
  "roots": [
    "<rootDir>/src/"
  ],
  "verbose": true,
  "notify": true,
  "notifyMode": 'success-change',
  "resetMocks": true,
  "testEnvironment": "jsdom",
  "setupFilesAfterEnv": [
    '<rootDir>/.jest/setupTests.js'
  ],
  "setupFiles": [],
  "testMatch": [
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}'
  ],
  "transform": {
    '^.+\\.[jt]sx?$': '<rootDir>/.jest/jsxTransform.js'
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  "moduleFileExtensions": ['js', 'mjs', 'jsx', 'ts', 'tsx', 'json'],
  "moduleNameMapper": {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy'
  },
  "watchPlugins": [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  "collectCoverageFrom": [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
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
};
