process.env.NODE_ENV = "development";

module.exports = {
  "root": true,
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "jsx-a11y",
    "import",
    "react-hooks",
    "@typescript-eslint"
  ],
  "env": {
    "browser": true,
    "node": true,
    "jest": true,
    "es2021": true
  },
  overrides: [
    {
      files: [
        '*.tsx',
        '*.ts',
      ],
    },
  ],
  "globals": {
    "JSX": "readonly"
  },
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      },
      "typescript": {}
    }
  },
  "ignorePatterns": [
    "__mocks__",
    "build",
    "public",
    "stories",
    "/**/node_modules/*"
  ],
  "rules": {
    "no-restricted-globals": [1],
  },
};
