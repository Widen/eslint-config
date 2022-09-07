import { RuleTester } from 'eslint'
import rule from '../src/rules/migrations'

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
})

new RuleTester().run('Patterns 18', rule, {
  invalid: [
    // JS variables
    {
      code: 'const style = css`color: ${blue20}`',
      errors: [{ messageId: 'jsColor' }],
    },
    {
      code: "import { white } from '@widen/patterns-style'",
      errors: [{ messageId: 'jsColor' }],
    },
    {
      code: '<div>{focusColor}</div>',
      errors: [{ messageId: 'jsColor' }],
    },
    {
      code: '<div css={{color: blue20}} />',
      errors: [{ messageId: 'jsColor' }],
    },
    // CSS variables
    {
      code: "const foo = 'var(--color-yellow-light)'",
      errors: [{ column: 17, endColumn: 37, messageId: 'cssColor' }],
    },
    {
      code: 'const foo = css`color: var(--color-yellow-light);`',
      errors: [{ column: 27, endColumn: 47, messageId: 'cssColor' }],
    },
    {
      code: `
        const foo = css\`
          background-color: var(--color-yellow-light);
          color: var(--color-yellow-light);
          border-color: var(--color-theme-dark);
        \`
      `,
      errors: [
        { column: 32, endColumn: 52, line: 3, messageId: 'cssColor' },
        { column: 21, endColumn: 41, line: 4, messageId: 'cssColor' },
        { column: 28, endColumn: 46, line: 5, messageId: 'cssColor' },
      ],
    },
    // Props
    {
      code: '<Badge color="purple" />',
      errors: [{ messageId: 'statusProp' }],
      output: '<Badge status="info" />',
    },
    {
      code: '<Badge color="red" />',
      errors: [{ messageId: 'statusProp' }],
      output: '<Badge status="error" />',
    },
    {
      code: '<Badge color="green" />',
      errors: [{ messageId: 'statusProp' }],
      output: '<Badge status="success" />',
    },
    {
      code: '<Badge color="blue" />',
      errors: [{ messageId: 'statusProp' }],
      output: '<Badge status="info" />',
    },
    {
      code: '<Badge color="yellow" />',
      errors: [{ messageId: 'statusProp' }],
      output: '<Badge status="warning" />',
    },
    {
      code: '<Badge color="gray" />',
      errors: [{ messageId: 'statusProp' }],
      output: '<Badge status="inactive" />',
    },
    {
      code: '<Callout color="red" />',
      errors: [{ messageId: 'statusProp' }],
      output: '<Callout status="error" />',
    },
    {
      code: '<Callout color="green" />',
      errors: [{ messageId: 'statusProp' }],
      output: '<Callout status="success" />',
    },
    {
      code: '<Callout color="blue" />',
      errors: [{ messageId: 'statusProp' }],
      output: '<Callout status="info" />',
    },
    {
      code: '<Callout color="yellow" />',
      errors: [{ messageId: 'statusProp' }],
      output: '<Callout status="warning" />',
    },
    // Color panel
    {
      code: '<ColorPanel color="purple" />',
      errors: [{ messageId: 'colorPanelColor' }],
      output: '<ColorPanel />',
    },
    {
      code: '<ColorPanel color="blue" css={panelStyle} />',
      errors: [{ messageId: 'colorPanelColor' }],
      output: '<ColorPanel css={panelStyle} />',
    },
  ],
  valid: [
    'const foo = "bar"',
    'import { foo } from "bar"',
    "const foo = 'var(--p-snackbar-height)'",
    'const foo = css`height: var(--p-snackbar-height);`',
    '<div theme="dark" />',
    '<div color="blue" />',
    '<Badge status="info" />',
    '<Badge />',
    '<Callout status="error" />',
    '<Callout />',
    '<ColorPanel css={foo} />',
    '<ColorPanel />',
  ],
})
