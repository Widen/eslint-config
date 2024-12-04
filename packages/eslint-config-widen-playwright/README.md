# eslint-config-widen-playwright

Widen's shared ESLint config for Playwright.

## Installation

```bash
yarn add -D eslint eslint-config-widen-playwright eslint-plugin-playwright
```

## Usage

In your `eslint.config.mjs` file, add the following four entries to your extends
list.

```js
import playwright from 'eslint-config-widen-playwright'

export default [...[{ files: ['e2e/**'] }, ...playwright]]
```
