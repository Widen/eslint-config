# eslint-config-widen

Widen's shared ESLint config.

## Installation

```bash
yarn add -D eslint eslint-{config,plugin}-widen eslint-plugin-sort @babel/{core,eslint-parser}

# If you use TypeScript
yarn add -D @typescript-eslint/{eslint-plugin,parser}

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
import { base, typescript, react, playwright, jest } from 'eslint-config-widen'

export default [
  // Base Widen configurations
  base,
  typescript,
  react,

  // Overrides for specific directories
  {
    files: ['e2e/**'],
    ...playwright,
  },
  {
    files: ['frontend/**'],
    ...jest,
  },
]
```
