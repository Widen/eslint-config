import { RuleTester } from 'eslint'
import rule from '../src/rules/jsx-import'

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
})

new RuleTester().run('jsx-import', rule, {
  invalid: [
    // Inserts the jsx pragma and import
    {
      errors: [{ messageId: 'missingPragma' }],
      input: `
        var el = <div css={{}} />
      `.trim(),
      output: `
        /** @jsx jsx */
        import { jsx } from '@emotion/react'
        var el = <div css={{}} />
      `.trim(),
    },

    // Adds a missing import even if the pragma exists
    {
      errors: [{ messageId: 'missingPragma' }],
      code: `
        /** @jsx jsx */
        var el = <div css={{}} />
      `.trim(),
      output: `
        /** @jsx jsx */
        import { jsx } from '@emotion/react'
        var el = <div css={{}} />
      `.trim(),
    },
    // Adds the jsx pragma and import with an existing @emotion/react import
    {
      code: `
        import { css } from '@emotion/react'
        var el = <div css={css\`\`} />
      `.trim(),
      output: `
        /** @jsx jsx */
        import { css, jsx } from '@emotion/react'
        var el = <div css={css\`\`} />
      `.trim(),
      errors: [{ messageId: 'missingPragma' }],
    },
    // Adds the jsx pragma and import with a styled import
    {
      code: `
        import styled from '@emotion/styled'
        var el = <div css={{}} />
      `.trim(),
      output: `
        /** @jsx jsx */
        import { jsx } from '@emotion/react'
        import styled from '@emotion/styled'
        var el = <div css={{}} />
      `.trim(),
      errors: [{ messageId: 'missingPragma' }],
    },
    // Multiple elements with the css prop
    {
      code: `
        var el = <div css={{}} />
        var el = <div css={{}} />
      `.trim(),
      output: `
        /** @jsx jsx */
        import { jsx } from '@emotion/react'
        var el = <div css={{}} />
        var el = <div css={{}} />
      `.trim(),
      errors: [{ messageId: 'missingPragma' }],
    },
    // Removes unnecessary react imports
    {
      code: `
        import React from 'react'
        var el = <div css={{}} />
      `.trim(),
      errors: [{ messageId: 'missingPragma' }],
      output: `
        /** @jsx jsx */
        import { jsx } from '@emotion/react'
        var el = <div css={{}} />
      `.trim(),
    },
    {
      code: `
        import * as React from 'react'
        var el = <div css={{}} />
      `.trim(),
      output: `
        /** @jsx jsx */
        import { jsx } from '@emotion/react'
        var el = <div css={{}} />
      `.trim(),
      errors: [{ messageId: 'missingPragma' }],
    },
    {
      code: `
        import React, { Fragment } from 'react'
        var el = <Fragment><div css={{}} /></Fragment>
      `.trim(),
      errors: [{ messageId: 'missingPragma' }],
      output: `
        /** @jsx jsx */
        import { jsx } from '@emotion/react'
        import { Fragment } from 'react'
        var el = <Fragment><div css={{}} /></Fragment>
      `.trim(),
    },
    // Retains react imports even if their usage is after the first css prop
    {
      code: `
        import React from 'react'
        var el = <div css={{}} />
        React.useEffect()
      `.trim(),
      errors: [{ messageId: 'missingPragma' }],
      output: `
        /** @jsx jsx */
        import { jsx } from '@emotion/react'
        import React from 'react'
        var el = <div css={{}} />
        React.useEffect()
      `.trim(),
    },
    {
      code: `
        import React from 'react'
        var el = <div css={{}} />
        class MyComponent extends React.Component {}
      `.trim(),
      errors: [{ messageId: 'missingPragma' }],
      output: `
        /** @jsx jsx */
        import { jsx } from '@emotion/react'
        import React from 'react'
        var el = <div css={{}} />
        class MyComponent extends React.Component {}
      `.trim(),
    },
  ],
  valid: [
    `
      /** @jsx jsx */
      import { jsx } from '@emotion/react'
      var el = <div css={css\`\`} />
    `.trim(),
    `
      import { css } from '@emotion/react'
      var el = <div className={css\`\`} />
    `.trim(),
    `
      import { css } from 'styled-components'
      var el = <div className={css\`\`} />
    `.trim(),
    `
      /** @jsx jsx */
      import { jsx } from '@emotion/react'
      var el = <div css={{}} />
    `.trim(),

    // No applicable code
    'const a = 1',
    "import { useEffect } from 'react'",
    "<div className='hi' />",
  ],
})
