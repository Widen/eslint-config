import tsParser from '@typescript-eslint/parser'
import { RuleTester } from 'eslint'
import heredoc from 'tsheredoc'
import rule from '../src/rules/jsx-fragments'

RuleTester.setDefaultConfig({
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      sourceType: 'module',
    },
  },
})

new RuleTester().run('jsx-fragments', rule, {
  invalid: [
    {
      code: heredoc`
        import React from 'react';
        <>foo</>
      `,
      errors: [{ messageId: 'longForm' }],
      output: heredoc`
        import React from 'react';
        <React.Fragment>foo</React.Fragment>
      `,
    },
    {
      code: heredoc`
        import * as React from 'react';
        <>foo</>
      `,
      errors: [{ messageId: 'longForm' }],
      output: heredoc`
        import * as React from 'react';
        <React.Fragment>foo</React.Fragment>
      `,
    },
    {
      code: heredoc`
        import { Fragment } from 'react';
        <>foo</>
      `,
      errors: [{ messageId: 'longForm' }],
      output: heredoc`
        import { Fragment } from 'react';
        <Fragment>foo</Fragment>
      `,
    },
    {
      code: heredoc`
        import { Fragment as Frag } from 'react';
        <>foo</>
      `,
      errors: [{ messageId: 'longForm' }],
      output: heredoc`
        import { Fragment as Frag } from 'react';
        <Frag>foo</Frag>
      `,
    },
    {
      code: heredoc`
        /** @jsx jsx */
        import { jsx } from '@emotion/react';
        <>foo</>
      `,
      errors: [{ messageId: 'missingImport' }, { messageId: 'longForm' }],
      output: heredoc`
        /** @jsx jsx */
        import { jsx } from '@emotion/react';
        import { Fragment } from 'react';
        <Fragment>foo</Fragment>
      `,
    },
    {
      code: heredoc`
        const a = 1;
        <>foo</>
      `,
      errors: [{ messageId: 'missingImport' }, { messageId: 'longForm' }],
      output: heredoc`
        import { Fragment } from 'react';
        const a = 1;
        <Fragment>foo</Fragment>
      `,
    },
    {
      code: heredoc`
        /** @jsx jsx */
        import { jsx } from '@emotion/react';
        import { useEffect } from 'react';
        <>foo</>
      `,
      errors: [{ messageId: 'missingImport' }, { messageId: 'longForm' }],
      output: heredoc`
        /** @jsx jsx */
        import { jsx } from '@emotion/react';
        import { useEffect, Fragment } from 'react';
        <Fragment>foo</Fragment>
      `,
    },
  ],
  valid: [
    `
      import React from 'react';
      <React.Fragment>foo</React.Fragment>
    `,
    `
      import * as React from 'react';
      <React.Fragment>foo</React.Fragment>
    `,
    `
      import { Fragment } from 'react';
      <Fragment>foo</Fragment>
    `,
    `
      import { Fragment as Frag } from 'react';
      <Frag>foo</Frag>
    `,

    // No fragments
    'const a = 1',
    "import { useEffect } from 'react'",
  ],
})
