module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {
    __APP_VERSION__: 'readonly',
  },
  extends: [
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jest-dom/recommended',
    'plugin:testing-library/react',
    'plugin:react/recommended',
    '@astronomer/eslint-config-astro',
  ],
  overrides: [
    {
      files: [
        '*.jsx',
        '*.js',
      ],
    },
    // astro doesn't currently have a parser, only prettier html-format
    // {
    //   files: [
    //     '*.astro',
    //   ],
    //   parser: '@astrojs/compiler',
    //   parserOptions: {
    //     sourceType: 'commonjs',
    //   },
    // },
  ],
  plugins: [
    'jest',
    'jest-dom',
    'testing-library',
    'react',
    'jsx-a11y',
  ],
  ignorePatterns: [
    'build',
    'public',
    'stories',
  ],
  rules: {
    'no-restricted-globals': [1],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'jest-dom/prefer-checked': 'error',
    'jest-dom/prefer-enabled-disabled': 'error',
    'jest-dom/prefer-required': 'error',
    'jest-dom/prefer-to-have-attribute': 'error',
    'testing-library/await-async-query': 'error',
    'testing-library/no-await-sync-query': 'error',
    'testing-library/no-dom-import': 'off',
  },
  env: {
    browser: true,
  },
};
