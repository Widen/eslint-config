import { RuleTester } from 'eslint'
import rule from '../src/rules/jsx-fragments'
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

new RuleTester().run('jsx-fragments', rule, {
  invalid: [
    {
      code: heredoc`
        import React from 'react';
        <>foo</>
      `,
      output: heredoc`
        import React from 'react';
        <React.Fragment>foo</React.Fragment>
      `,
      errors: [{ messageId: 'longForm' }],
    },
    {
      code: heredoc`
        import * as React from 'react';
        <>foo</>
      `,
      output: heredoc`
        import * as React from 'react';
        <React.Fragment>foo</React.Fragment>
      `,
      errors: [{ messageId: 'longForm' }],
    },
    {
      code: heredoc`
        import { Fragment } from 'react';
        <>foo</>
      `,
      output: heredoc`
        import { Fragment } from 'react';
        <Fragment>foo</Fragment>
      `,
      errors: [{ messageId: 'longForm' }],
    },
    {
      code: heredoc`
        import { Fragment as Frag } from 'react';
        <>foo</>
      `,
      output: heredoc`
        import { Fragment as Frag } from 'react';
        <Frag>foo</Frag>
      `,
      errors: [{ messageId: 'longForm' }],
    },
    {
      code: heredoc`
        /** @jsx jsx */
        import { jsx } from '@emotion/react';
        <>foo</>
      `,
      output: heredoc`
        /** @jsx jsx */
        import { jsx } from '@emotion/react';
        import { Fragment } from 'react';
        <Fragment>foo</Fragment>
      `,
      errors: [{ messageId: 'missingImport' }, { messageId: 'longForm' }],
    },
    {
      code: heredoc`
        const a = 1;
        <>foo</>
      `,
      output: heredoc`
        import { Fragment } from 'react';
        const a = 1;
        <Fragment>foo</Fragment>
      `,
      errors: [{ messageId: 'missingImport' }, { messageId: 'longForm' }],
    },
    {
      code: heredoc`
        /** @jsx jsx */
        import { jsx } from '@emotion/react';
        import { useEffect } from 'react';
        <>foo</>
      `,
      output: heredoc`
        /** @jsx jsx */
        import { jsx } from '@emotion/react';
        import { useEffect, Fragment } from 'react';
        <Fragment>foo</Fragment>
      `,
      errors: [{ messageId: 'missingImport' }, { messageId: 'longForm' }],
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
