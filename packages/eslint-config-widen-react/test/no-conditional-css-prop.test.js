import { RuleTester } from 'eslint'
import rule from '../src/rules/no-conditional-css-prop'
import sharedGlobals from '../src/sharedGlobals'

const ruleTester = new RuleTester({
  languageOptions: {
    globals: sharedGlobals,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
})

ruleTester.run('no-conditional-css-prop', rule, {
  invalid: [
    {
      code: '<div css={condition ? { color: "red" } : { color: "blue" }} />',
      errors: [
        {
          message:
            'Avoid using conditionals within the css prop, move them to style.',
        },
      ],
    },
    {
      code: '<div css={condition && { color: "red" }} />',
      errors: [
        {
          message:
            'Avoid using conditionals within the css prop, move them to style.',
        },
      ],
    },
    {
      code: '<div css={condition || { color: "blue" }} />',
      errors: [
        {
          message:
            'Avoid using conditionals within the css prop, move them to style.',
        },
      ],
    },
  ],
  valid: [
    {
      code: '<div css={{ color: "red" }} />',
    },
    {
      code: '<div css={someVariable} />',
    },
    {
      code: '<div css={`color: ${someVariable}`} />',
    },
  ],
})
