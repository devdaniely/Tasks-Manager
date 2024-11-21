const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

module.exports = {
  extends: [
    '@vercel/style-guide/eslint/node',
    '@vercel/style-guide/eslint/typescript',
    'eslint-config-prettier',
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  overrides: [
    {
      files: ['**/__tests__/**/*'],
      env: {
        jest: true,
      },
    },
  ],
  ignorePatterns: ['node_modules/', 'dist/'],
  // add rules configurations here
  rules: {
    'import/no-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-console': 'off',
    'no-return-await': 'off', //Leave this off, deprecated rule
    'unicorn/filename-case': [
      'error',
      {
        case: 'camelCase',
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
    ],
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'prefer-destructuring': ['error', { object: true, array: false }],
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/no-unsafe-enum-comparison': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',

    // TOO FIX
    '@typescript-eslint/restrict-template-expressions': 'off',
  },
};
