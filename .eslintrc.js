module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    project: "tsconfig.json",
  },
  plugins: [
    '@typescript-eslint',
    'jest',
  ],
  ignorePatterns: [
    ".eslintrc.js",
    "jest.config.js",
    "doc/**/*.js",
    "playground.ts"
  ],
  rules: {
    'no-console': 'off',
    'max-classes-per-file': 'off',
    'no-plusplus': 'off',
    'func-names': 'off',
    'no-restricted-syntax': ['off', 'ForOfStatement'],
  },
  overrides: [
    {
      // test-specific config
      files: '*.test.ts',
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
      parserOptions: {
        project: "tsconfig.test.json",
      },
    }
  ],
};