# Widen ESLint

[![Build](https://github.com/Widen/eslint-config/actions/workflows/build.yml/badge.svg)](https://github.com/Widen/eslint-config/actions/workflows/build.yml)
[![changesets](https://img.shields.io/badge/maintained%20with-changesets-blue)](https://github.com/atlassian/changesets)

Widen's shared ESLint config and plugins.

## Installation

```bash
yarn add -D eslint eslint-{config,plugin}-widen eslint-plugin-sort @babel/{core,eslint-parser}

# If you use TypeScript
yarn add -D typescript-eslint

# If you use React
yarn add -D eslint-plugin-{react,react-hooks,jsx-a11y}

# If you use Playwright
yarn add -D eslint-plugin-playwright

# If you use Jest
yarn add -D eslint-plugin-jest
```

## Usage

In your `eslint.config.mjs` file, add the following four entries to your extends
list. If you don't need a specific configuration, simply remove it from the
list.

```js
import { base, react, jest, playwright, typescript } from 'eslint-config-widen'

export default [
  ...base,
  ...typescript,
  ...react,
  ...[
    // you can specify what to ignore by using the `ignores` key before any other rule
    // this will filter out things we dont want this to run on
    { ignores: ['*.test.*'] },
    ...jest,
    // you can also override rules by specifying the rule and the new value
    { files: ['*.spec.js'], rules: { 'jest/expect-expect': 'off' } },
  ],
  ...[{ files: ['e2e/**'] }, ...playwright],
]
```

Individual packages can be pulled down if only a small subset is needed. Each
package has its own readme that can be referenced for specific dependencies.

```bash
## (base, emotion, jest, playwright, react, typescript)
yarn add eslint-config-widen-*
```
