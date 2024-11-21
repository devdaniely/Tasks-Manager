const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    '@vercel/style-guide/eslint/node',
    '@vercel/style-guide/eslint/browser',
    '@vercel/style-guide/eslint/typescript',
    '@vercel/style-guide/eslint/react',
    '@vercel/style-guide/eslint/next',
    'eslint-config-turbo',
    'eslint-config-prettier',
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  // add rules configurations here
  rules: {
    'import/no-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'react/jsx-pascal-case': ['error', { allowAllCaps: true }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
    ],
    'unicorn/filename-case': [
      'error',
      {
        case: 'pascalCase',
        ignore: [
          /^page\./,
          /^layout\./,
          /^not-found\./,
          /^error\./,
          /^global-error\./,
          /^use/,
          /BIM/,
          /PDF/,
        ],
      },
    ],
    'react/jsx-curly-brace-presence': [
      'warn',
      { props: 'always', children: 'never', propElementValues: 'always' },
    ],
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],

    '@typescript-eslint/no-non-null-assertion': 'off',

    // TOO FIX
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',

    //typing
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',

    'react/jsx-no-leaked-render': 'off', // not working correctly
    'import/no-cycle': 'off',
    '@typescript-eslint/no-unsafe-enum-comparison': 'off',

    //accessibility
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/label-has-associated-control': 'off',

    'no-alert': 'off',
  },
};
