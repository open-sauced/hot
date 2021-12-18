process.env.NODE_ENV = 'development';

module.exports = {
  extends: [
    '@astronomer/eslint-config-astro',
  ],
  ignorePatterns: [
    'build',
    'public',
    'stories',
  ],
  rules: {
    'no-restricted-globals': [1],
  },
};
