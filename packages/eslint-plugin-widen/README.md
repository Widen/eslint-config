# eslint-plugin-widen

> Widen's own ESLint plugin containing custom lint rules for our code.

## Installation

```sh
yarn add --dev eslint-plugin-widen
```

## Usage

The easiest way to use this plugin is with the recommended configuration. Simply
add the following to your `.eslintrc` file. This will enable all sorting rules
as warnings with autofix turned on.

```json
{
  "extends": ["plugin:widen/recommended"],
  "plugins": ["widen"]
}
```

For fine tuned control, you can add rules individually like shown below.

```json
{
  "plugins": ["widen"],
  "rules": {
    "widen/sort-object-keys": "error",
    "widen/sort-pattern-keys": "warn"
  }
}
```

## Rules

### `jsx-import` 🔧

Enforces all files to use the `jsx` pragma from `@emotion/react` when using the
`css` prop. This rule is based on the identically named rule from the
`eslint-plugin-emotion` with a few handy extras:

1. If the react import is no longer needed, it will be automatically removed.
1. If an `@emotion/react` import already exists, `jsx` will be imported from the
   existing declaration.

## Usage

Add the following to your `.eslintrc` file.

```json
{
  "rules": {
    "@widen/jsx-fragments": "error"
  }
}
```

#### Example

Example of **incorrect** code for this rule:

```js
import { css } from '@emotion/react'
import React from 'react'

const buttonStyle = css`
  color: red;
`

function MyComponent() {
  return <button css={buttonStyle}>foo</button>
}
```

Example of **correct** code for this rule:

```js
/** @jsx jsx */
import { css, jsx } from '@emotion/react'

const buttonStyle = css`
  color: red;
`

function MyComponent() {
  return <button css={buttonStyle}>foo</button>
}
```

### `jsx-fragments` 🔧

Enforce usage of JSX fragment longhand to allow for compatibility with
Emotion 10.

## Usage

Add the following to your `.eslintrc` file.

```json
{
  "rules": {
    "@widen/jsx-fragments": "error"
  }
}
```

#### Example

Example of **incorrect** code for this rule:

```js
/** @jsx jsx */
import { jsx } from '@emotion/react'

function MyComponent() {
  return <>foo</>
}
```

Example of **correct** code for this rule:

```js
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { useEffect, Fragment } from 'react'

function MyComponent() {
  return <Fragment>foo</Fragment>
}
```
