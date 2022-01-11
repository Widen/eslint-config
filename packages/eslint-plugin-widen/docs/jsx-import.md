# Ensure jsx from @emotion/react is imported (widen/jsx-import)

🔧 The `--fix` option on the command line can automatically fix the problems
reported by this rule.

Enforces all files to use the `jsx` pragma from `@emotion/react` when using the
`css` prop. This rule is based on the identically named rule from the
`eslint-plugin-emotion` with a few handy extras:

1. If the react import is no longer needed, it will be automatically removed.
1. If an `@emotion/react` import already exists, `jsx` will be imported from the
   existing declaration.

## Rule Details

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
