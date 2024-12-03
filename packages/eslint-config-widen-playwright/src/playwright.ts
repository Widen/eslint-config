import playwright from 'eslint-plugin-playwright'

delete playwright.configs['playwright-test'].env

export default [
  {
    plugins: {
      playwright,
    },
    rules: {
      'playwright/missing-playwright-await': [
        'error',
        { customMatchers: ['toBeAccessible', 'toPassAxe'] },
      ],
      'playwright/no-restricted-matchers': [
        'warn',
        {
          toEqualValue: 'Use `toHaveValue` instead.',
          toHaveSelector: 'Use `toBeVisible` instead.',
          toHaveSelectorCount: 'Use `toHaveCount` instead.',
          toMatchAttribute: 'Use `toHaveAttribute` instead.',
          toMatchText: 'Use `toHaveText` instead.',
          toMatchURL: 'Use `toHaveURL` instead.',
          toMatchValue: 'Use `toHaveValue` instead.',
        },
      ],
      'playwright/prefer-lowercase-title': [
        'warn',
        { ignoreTopLevelDescribe: true },
      ],
      'playwright/prefer-strict-equal': 'warn',
      'playwright/prefer-to-be': 'warn',
      'playwright/prefer-to-have-length': 'warn',
      'playwright/require-top-level-describe': 'warn',
    },
  },
  {
    ...playwright.configs['playwright-test'],
    plugins: {
      playwright,
    },
  },
]
