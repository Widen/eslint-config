# Enforce standard form for React fragments (widen/jsx-fragments)

🔧 The `--fix` option on the command line can automatically fix the problems
reported by this rule.

Enforce usage of JSX fragment longhand to allow for compatibility with Emotion.

## Rule Details

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
