# Widen ESLint

[![Build](https://github.com/Widen/eslint-config/actions/workflows/build.yml/badge.svg)](https://github.com/Widen/eslint-config/actions/workflows/build.yml)
[![changesets](https://img.shields.io/badge/maintained%20with-changesets-blue)](https://github.com/atlassian/changesets)

Widen's shared ESLint config and plugins.

## Installation

```bash
yarn add -D eslint eslint-{config,plugin}-widen eslint-plugin-sort eslint-plugin-sort-destructure-keys @babel/{core,eslint-parser}

# If you use TypeScript
yarn add -D typescript-eslint

# If you use React
yarn add -D eslint-plugin-{react,react-hooks,jsx-a11y}

# If you use Playwright
yarn add -D eslint-plugin-playwright

# If you use Jest
yarn add -D eslint-plugin-jest

# eslint-config-widen-base requires prettier
yarn add -D eslint-plugin-prettier prettier
```

## Usage

In your `eslint.config.mjs` file, add the following four entries to your extends
list. If you don't need a specific configuration, simply remove it from the
list.

### Using eslint-config-widen

Leftover wrapper from previous eslint setup.

```js
import { base, react, jest, playwright, typescript } from 'eslint-config-widen'

export default [
  ...base,
  ...typescript,
  ...react,
  ...[
    // you can specify what to ignore by using the `ignores` key before any other rule
    // this will filter out things we don't want this to run on
    { ignores: ['*.test.*'] },
    ...jest,
    // you can also override rules by specifying the rule and the new value
    { files: ['*.spec.js'], rules: { 'jest/expect-expect': 'off' } },
  ],
  ...[{ files: ['e2e/**'] }, ...playwright],
]
```

### Using individual packages

Individual packages can be pulled down if only a small subset is needed. Each
package has its own readme that can be referenced for specific dependencies.

Follow installation from above and add on the following:

```bash
## (base, emotion, jest, playwright, react, typescript)
yarn add eslint-config-widen-*
```

Example eslint.config.mjs

```js
import base from 'eslint-config-widen-base'
import jest from 'eslint-config-widen-jest'
import playwright from 'eslint-config-widen-playwright'
import react from 'eslint-config-widen-react'
import typescript from 'eslint-config-widen-typescript'

export default [
  {
    // ignores across project
    ignores: ['build', 'app/web', '**/lib/**', '*.d.ts', '*.{md,mjs,yaml,yml}'],
  },
  ...base,
  ...[
    ...typescript,
    {
      files: ['*.config.{js,mjs,ts}'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off', // allow require in config files, such as webpack.config.js
        'sort/object-properties': 'off', // disable object property sorting in config files
        'sort-keys': 'off', // disable key sorting in config files
      },
    },
  ],
  ...[...react, { ignores: ['widentest/playwright/**'] }],
  ...jest,
  ...[
    {
      // ignores for jest
      ignores: ['config-frontend/**', '**/jest/**', '**/__tests__/**'],
    },
    ...playwright,
  ],
]
```

## Testing

Use `eslint-playground` to test linting rules.

## Pre-releases

Use the GitHub Action for Pre-release to test out eslint changes within projects.
