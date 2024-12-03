# eslint-config-widen-jest

Widen's shared ESLint config for Jest.

## Installation

```bash
yarn add -D eslint eslint-config-widen-jest eslint-plugin-jest
```

## Usage

In your `eslint.config.mjs` file, add the following four entries to your extends
list. If you don't need a specific configuration, simply remove it from the
list.

```js
import jest from 'eslint-config-widen-jest'

export default [
  ...[
    // you can specify what to ignore by using the `ignores` key before any other rule
    // this will filter out things we dont want this to run on
    { ignores: ['*.test.*'] },
    ...jest,
    // you can also override rules by specifying the rule and the new value
    { files: ['*.spec.js'], rules: { 'jest/expect-expect': 'off' } },
  ],
]
```
