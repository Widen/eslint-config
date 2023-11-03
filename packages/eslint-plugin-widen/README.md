# eslint-plugin-widen

[![npm](https://img.shields.io/npm/v/eslint-plugin-widen)](https://www.npmjs.com/package/eslint-plugin-widen)

Widen's own ESLint plugin containing custom lint rules for our code.

## Installation

```bash
yarn add --dev eslint-plugin-widen
```

## Usage

Add the following to your `.eslintrc` file.

```json
{
  "plugins": ["widen"],
  "rules": {
    "widen/jsx-fragments": "error",
    "widen/jsx-import": "error"
  }
}
```

## List of Supported Rules

✔: Enabled in the `recommended` configuration.\
🔧: Fixable with [`eslint --fix`](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems).

| ✔  | 🔧  | Rule                                         | Description                                                                                 |
| :-: | :-: | -------------------------------------------- | ------------------------------------------------------------------------------------------- |
|     | 🔧  | [widen/jsx-fragments](docs/jsx-fragments.md) | Enforce usage of JSX fragment longhand to allow for compatibility with Emotion.             |
|     | 🔧  | [widen/jsx-import](docs/jsx-import.md)       | Enforces all files to use the `jsx` pragma from `@emotion/react` when using the `css` prop. |
