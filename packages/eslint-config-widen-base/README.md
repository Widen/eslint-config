# eslint-config-widen-base

Widen's shared ESLint config base module

## Installation

```bash
yarn add -D eslint eslint-plugin-widen eslint-config-widen-base eslint-plugin-sort @babel/{core,eslint-parser}
```

## Usage

In your `eslint.config.mjs` file, add the following entries to your extends
list.

```js
import base from 'eslint-config-widen-base'

export default [
  ...base,
  ...[
    // you can specify what to ignore by using the `ignores` key before any other rule
    // this will filter out things we dont want this to run on
    { ignores: ['*.test.*'] },
    // you can also override rules by specifying the rule and the new value
    { files: ['*.spec.js'], rules: { 'no-unused-vars': 'off' } },
  ],
]
```
