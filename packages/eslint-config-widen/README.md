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

In your `.eslintrc` file, add the following four entries to your extends list.
If you don't need a specific configuration, simply remove it from the list.

```json
{
  "extends": ["widen", "widen/typescript", "widen/react"],
  "overrides": [
    {
      "files": ["e2e/**"],
      "extends": "widen/playwright"
    },
    {
      "files": ["frontend/**/*.spec.js"],
      "extends": "widen/jest"
    }
  ]
}
```
