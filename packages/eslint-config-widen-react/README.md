# eslint-config-widen-react

Widen's shared ESLint config.

## Installation

```bash
yarn add -D eslint eslint-config-widen-react eslint-plugin-{react,react-hooks,jsx-a11y}
```

## Usage

In your `eslint.config.mjs` file, add the following four entries to your extends
list. If you don't need a specific configuration, simply remove it from the
list.

```js
import react from 'eslint-config-widen-react'

export default [
  ...react,
  ...[
    // you can specify what to ignore by using the `ignores` key before any other rule
    // this will filter out things we dont want this to run on
    { ignores: ['*.test.*'] },
    // you can also override rules by specifying the rule and the new value
    { files: ['*.spec.js'], rules: { 'no-unused-vars': 'off' } },
  ],
]
```
