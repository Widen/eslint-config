import { RuleTester } from 'eslint'
import rule from '../src/rules/jsx-import'
import heredoc from 'tsheredoc'

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
      code: heredoc`
        var el = <div css={{}} />
      `,
      output: heredoc`
        /** @jsx jsx */
        import { jsx } from '@emotion/react'
        var el = <div css={{}} />
      `,
    },

    // Adds a missing import even if the pragma exists
    {
      errors: [{ messageId: 'missingPragma' }],
      code: heredoc`
        /** @jsx jsx */
        var el = <div css={{}} />
      `,
      output: heredoc`
        /** @jsx jsx */
        import { jsx } from '@emotion/react'
        var el = <div css={{}} />
      `,
    },
    // Adds the jsx pragma and import with an existing @emotion/react import
    {
      code: heredoc`
        import { css } from '@emotion/react'
        var el = <div css={css\`\`} />
      `,
      output: heredoc`
        /** @jsx jsx */
        import { css, jsx } from '@emotion/react'
        var el = <div css={css\`\`} />
      `,
      errors: [{ messageId: 'missingPragma' }],
    },
    // Adds the jsx pragma and import with a styled import
    {
      code: heredoc`
        import styled from '@emotion/styled'
        var el = <div css={{}} />
      `,
      output: heredoc`
        /** @jsx jsx */
        import { jsx } from '@emotion/react'
        import styled from '@emotion/styled'
        var el = <div css={{}} />
      `,
      errors: [{ messageId: 'missingPragma' }],
    },
    // Multiple elements with the css prop
    {
      code: heredoc`
        var el = <div css={{}} />
        var el = <div css={{}} />
      `,
      output: heredoc`
        /** @jsx jsx */
        import { jsx } from '@emotion/react'
        var el = <div css={{}} />
        var el = <div css={{}} />
      `,
      errors: [{ messageId: 'missingPragma' }],
    },
    // Removes unnecessary react imports
    {
      code: heredoc`
        import React from 'react'
        var el = <div css={{}} />
      `,
      errors: [{ messageId: 'missingPragma' }],
      output: heredoc`
        /** @jsx jsx */
        import { jsx } from '@emotion/react'
        var el = <div css={{}} />
      `,
    },
    {
      code: heredoc`
        import * as React from 'react'
        var el = <div css={{}} />
      `,
      output: heredoc`
        /** @jsx jsx */
        import { jsx } from '@emotion/react'
        var el = <div css={{}} />
      `,
      errors: [{ messageId: 'missingPragma' }],
    },
    {
      code: heredoc`
        import React, { Fragment } from 'react'
        var el = <Fragment><div css={{}} /></Fragment>
      `,
      errors: [{ messageId: 'missingPragma' }],
      output: heredoc`
        /** @jsx jsx */
        import { jsx } from '@emotion/react'
        import { Fragment } from 'react'
        var el = <Fragment><div css={{}} /></Fragment>
      `,
    },
    // Retains react imports even if their usage is after the first css prop
    {
      code: heredoc`
        import React from 'react'
        var el = <div css={{}} />
        React.useEffect()
      `,
      errors: [{ messageId: 'missingPragma' }],
      output: heredoc`
        /** @jsx jsx */
        import { jsx } from '@emotion/react'
        import React from 'react'
        var el = <div css={{}} />
        React.useEffect()
      `,
    },
    {
      code: heredoc`
        import React from 'react'
        var el = <div css={{}} />
        class MyComponent extends React.Component {}
      `,
      errors: [{ messageId: 'missingPragma' }],
      output: heredoc`
        /** @jsx jsx */
        import { jsx } from '@emotion/react'
        import React from 'react'
        var el = <div css={{}} />
        class MyComponent extends React.Component {}
      `,
    },
  ],
  valid: [
    heredoc`
      /** @jsx jsx */
      import { jsx } from '@emotion/react'
      var el = <div css={css\`\`} />
    `,
    heredoc`
      import { css } from '@emotion/react'
      var el = <div className={css\`\`} />
    `,
    heredoc`
      import { css } from 'styled-components'
      var el = <div className={css\`\`} />
    `,
    heredoc`
      /** @jsx jsx */
      import { jsx } from '@emotion/react'
      var el = <div css={{}} />
    `,

    // No applicable code
    'const a = 1',
    "import { useEffect } from 'react'",
    "<div className='hi' />",
  ],
})
