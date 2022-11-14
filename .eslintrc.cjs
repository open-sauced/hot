module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  plugins: [
    "import",
    "react",
    "react-hooks",
    "jsx-a11y",
    "@typescript-eslint/eslint-plugin",
    "no-loops",
    "no-use-extend-native",
    "promise",
  ],
  extends: [
    "eslint:recommended",
    "plugin:no-use-extend-native/recommended",
    "plugin:promise/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:jsx-a11y/strict",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
  ],
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
    es2021: true,
  },
  ignorePatterns: ["test", "dist", "build", "public", "/**/node_modules/*", ".eslintrc.cjs", "vite.config.ts", "playwright.config.ts"],
  rules: {
    // eslint:recommended
    "arrow-body-style": ["error", "as-needed"],
    "capitalized-comments": [
      "error",
      "never",
      {
        ignorePattern: "pragma|ignored",
        ignoreInlineComments: true,
      },
    ],
    curly: ["error", "all"],
    "dot-notation": "error",
    eqeqeq: ["error", "always"],
    "multiline-comment-style": ["error", "starred-block"],
    "no-confusing-arrow": "error",
    "no-div-regex": "error",
    "no-else-return": [
      "error",
      {
        allowElseIf: false,
      },
    ],
    "no-extra-bind": "error",
    "no-extra-boolean-cast": [
      "error",
      {
        enforceForLogicalOperands: true,
      },
    ],
    "no-extra-label": "error",
    "no-floating-decimal": "error",
    "no-implicit-coercion": [
      "error",
      {
        allow: ["!!"],
      },
    ],
    "no-lonely-if": "error",
    "no-undef-init": "error",
    "no-unneeded-ternary": "error",
    "no-useless-computed-key": [
      "error",
      {
        enforceForClassMembers: true,
      },
    ],
    "no-useless-rename": "error",
    "no-useless-return": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "one-var": ["error", "never"],
    "one-var-declaration-per-line": ["error", "always"],
    "operator-assignment": ["error", "always"],
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "prefer-destructuring": [
      "error",
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: true,
          object: true,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    "prefer-exponentiation-operator": "error",
    "prefer-object-has-own": "error",
    "prefer-object-spread": "error",
    "prefer-template": "error",
    "quote-props": ["error", "as-needed"],
    "sort-vars": "error",
    "spaced-comment": ["error", "always"],
    strict: ["error", "never"],
    yoda: [
      "error",
      "never",
      {
        onlyEquality: true,
      },
    ],
    "array-bracket-newline": ["error", "consistent"],
    "array-bracket-spacing": [
      "error",
      "never",
      {
        arraysInArrays: true,
      },
    ],
    "array-element-newline": ["error", "consistent"],
    "arrow-parens": ["error", "as-needed"],
    "arrow-spacing": "error",
    "block-spacing": ["error", "always"],
    "brace-style": ["error", "1tbs"],
    "comma-dangle": ["error", "always-multiline"],
    "comma-spacing": [
      "error",
      {
        before: false,
        after: true,
      },
    ],
    "comma-style": ["error", "last"],
    "computed-property-spacing": ["error", "never"],
    "dot-location": ["error", "property"],
    "eol-last": ["error", "always"],
    "func-call-spacing": ["error", "never"],
    "function-call-argument-newline": ["error", "consistent"],
    "function-paren-newline": ["error", "multiline-arguments"],
    indent: ["error", 2],
    "jsx-quotes": ["error", "prefer-double"],
    "key-spacing": [
      "error",
      {
        beforeColon: false,
        afterColon: true,
      },
    ],
    "keyword-spacing": [
      "error",
      {
        before: true,
        after: true,
      },
    ],
    "line-comment-position": [
      "error",
      {
        position: "above",
        ignorePattern: "pragma",
        applyDefaultIgnorePatterns: false,
      },
    ],
    "linebreak-style": ["error", "unix"],
    "lines-around-comment": [
      "error",
      {
        beforeBlockComment: true,
        afterBlockComment: true,
        beforeLineComment: true,
        allowBlockStart: true,
        allowBlockEnd: false,
        allowClassStart: true,
        allowObjectStart: true,
        allowObjectEnd: false,
        allowArrayStart: false,
        allowArrayEnd: false,
        applyDefaultIgnorePatterns: false,
      },
    ],
    "lines-between-class-members": [
      "error",
      "always",
      {
        exceptAfterSingleLine: true,
      },
    ],
    "multiline-ternary": ["error", "always-multiline"],
    "new-parens": ["error", "never"],
    "newline-per-chained-call": [
      "error",
      {
        ignoreChainWithDepth: 2,
      },
    ],
    "no-multi-spaces": "error",
    "no-multiple-empty-lines": "error",
    "no-trailing-spaces": "error",
    "no-whitespace-before-property": "error",
    "object-curly-newline": [
      "error",
      {
        multiline: true,
      },
    ],
    "object-curly-spacing": [
      "error",
      "always",
      {
        arraysInObjects: true,
        objectsInObjects: true,
      },
    ],
    "object-property-newline": [
      "error",
      {
        allowAllPropertiesOnSameLine: true,
      },
    ],
    "operator-linebreak": [
      "error",
      "after",
      {
        overrides: {
          "?": "before",
          ":": "before",
        },
      },
    ],
    "padded-blocks": ["error", "never"],
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: ["const", "let", "var"],
        next: "*",
      },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"],
      },
    ],
    quotes: [
      "error",
      "double",
      {
        allowTemplateLiterals: true,
      },
    ],
    "rest-spread-spacing": ["error", "never"],
    semi: [
      "error",
      "always",
      {
        omitLastInOneLineBlock: true,
      },
    ],
    "semi-spacing": [
      "error",
      {
        before: false,
        after: true,
      },
    ],
    "semi-style": ["error", "last"],
    "space-before-blocks": ["error", "always"],
    "space-before-function-paren": ["error", "always"],
    "space-infix-ops": [
      "error",
      {
        int32Hint: false,
      },
    ],
    "space-unary-ops": [
      "error",
      {
        words: true,
        nonwords: false,
      },
    ],
    "switch-colon-spacing": [
      "error",
      {
        after: true,
        before: false,
      },
    ],
    "template-curly-spacing": ["error", "never"],
    "template-tag-spacing": ["error", "always"],
    "unicode-bom": "error",
    "wrap-iife": [
      "error",
      "inside",
      {
        functionPrototypeMethods: true,
      },
    ],
    "wrap-regex": "error",

    // plugin:react/recommended
    "react/destructuring-assignment": [
      "error",
      "always",
      {
        destructureInSignature: "always",
      },
    ],
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/no-arrow-function-lifecycle": "error",
    "react/no-invalid-html-attribute": "error",
    "react/no-unknown-property": "error",
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
    "react/jsx-boolean-value": ["error", "never"],
    "react/jsx-closing-bracket-location": "error",
    "react/jsx-closing-tag-location": "error",
    "react/jsx-curly-brace-presence": ["error", "never"],
    "react/jsx-curly-newline": ["error", "consistent"],
    "react/jsx-equals-spacing": ["error", "never"],
    "react/jsx-first-prop-new-line": ["error", "multiline-multiprop"],
    "react/jsx-fragments": ["error", "syntax"],
    "react/jsx-indent": [
      "error",
      2,
      {
        indentLogicalExpressions: true,
      },
    ],
    "react/jsx-indent-props": [
      "error",
      {
        indentMode: 2,
        ignoreTernaryOperators: true,
      },
    ],
    "react/jsx-max-props-per-line": [
      "error",
      {
        maximum: 1,
      },
    ],
    "react/jsx-newline": [
      "error",
      {
        prevent: false,
      },
    ],
    // "react/jsx-no-leaked-render": ["error", {
    //   "validStrategies": ["coerce"]
    // }],
    "react/jsx-no-useless-fragment": [
      "error",
      {
        allowExpressions: true,
      },
    ],
    "react/jsx-one-expression-per-line": [
      "error",
      {
        allow: "literal",
      },
    ],
    "react/jsx-props-no-multi-spaces": "error",
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
        shorthandFirst: true,
        multiline: "last",
        reservedFirst: true,
      },
    ],
    "react/jsx-tag-spacing": [
      "error",
      {
        closingSlash: "never",
        beforeSelfClosing: "always",
        afterOpening: "never",
        beforeClosing: "allow",
      },
    ],
    "react/jsx-wrap-multilines": "error",

    // @typescript-eslint/strict
    "@typescript-eslint/indent": [
      "error",
      2,
      {
        ignoredNodes: ["PropertyDefinition[decorators]", "TSUnionType"],
      },
    ],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/quotes": [
      "error",
      "double",
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    "object-curly-spacing": "off",
    "@typescript-eslint/object-curly-spacing": ["error", "always"],
    semi: "off",
    "@typescript-eslint/semi": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "no-loops/no-loops": "error",
    "no-async-promise-executor": "error",
    "no-await-in-loop": "error",
    "no-promise-executor-return": "error",
    "require-atomic-updates": "error",
    "max-nested-callbacks": ["error", 3],
    "no-return-await": "error",
    "prefer-promise-reject-errors": "error",
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        paths: ["src"],
      },
    },
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/parsers": {
      "@typescript-eslint/parser": [".js", ".jsx", ".ts", ".tsx"],
    },
  },
};
