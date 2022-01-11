import { RuleTester } from 'eslint'
import rule from '../src/rules/jsx-fragments'

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
      code: `
        import React from 'react';
        <>foo</>
      `.trim(),
      output: `
        import React from 'react';
        <React.Fragment>foo</React.Fragment>
      `.trim(),
      errors: [{ messageId: 'longForm' }],
    },
    {
      code: `
        import * as React from 'react';
        <>foo</>
      `.trim(),
      output: `
        import * as React from 'react';
        <React.Fragment>foo</React.Fragment>
      `.trim(),
      errors: [{ messageId: 'longForm' }],
    },
    {
      code: `
        import { Fragment } from 'react';
        <>foo</>
      `.trim(),
      output: `
        import { Fragment } from 'react';
        <Fragment>foo</Fragment>
      `.trim(),
      errors: [{ messageId: 'longForm' }],
    },
    {
      code: `
        import { Fragment as Frag } from 'react';
        <>foo</>
      `.trim(),
      output: `
        import { Fragment as Frag } from 'react';
        <Frag>foo</Frag>
      `.trim(),
      errors: [{ messageId: 'longForm' }],
    },
    {
      code: `
        /** @jsx jsx */
        import { jsx } from '@emotion/react';
        <>foo</>
      `.trim(),
      output: `
        /** @jsx jsx */
        import { jsx } from '@emotion/react';
        import { Fragment } from 'react';
        <Fragment>foo</Fragment>
      `.trim(),
      errors: [{ messageId: 'missingImport' }, { messageId: 'longForm' }],
    },
    {
      code: `
        const a = 1;
        <>foo</>
      `.trim(),
      output: `
        import { Fragment } from 'react';
        const a = 1;
        <Fragment>foo</Fragment>
      `.trim(),
      errors: [{ messageId: 'missingImport' }, { messageId: 'longForm' }],
    },
    {
      code: `
        /** @jsx jsx */
        import { jsx } from '@emotion/react';
        import { useEffect } from 'react';
        <>output:foo</>
      `.trim(),
      output: `
        /** @jsx jsx */
        import { jsx } from '@emotion/react';
        import { useEffect, Fragment } from 'react';
        <Fragment>foo</Fragment>
      `.trim(),
      errors: [{ messageId: 'missingImport' }, { messageId: 'longForm' }],
    },
  ],
  valid: [
    `
      import React from 'react';
      <React.Fragment>foo</React.Fragment>
    `.trim(),
    `
      import * as React from 'react';
      <React.Fragment>foo</React.Fragment>
    `.trim(),
    `
      import { Fragment } from 'react';
      <Fragment>foo</Fragment>
    `.trim(),
    `
      import { Fragment as Frag } from 'react';
      <Frag>foo</Frag>
    `.trim(),

    // No fragments
    'const a = 1',
    "import { useEffect } from 'react'",
  ],
})
