export = {
  overrides: [
    {
      extends: ['plugin:playwright/playwright-test'],
      plugins: ['playwright'],
      rules: {
        'playwright/prefer-lowercase-title': [
          'warn',
          { ignoreTopLevelDescribe: true },
        ],
        'playwright/prefer-to-have-length': 'warn',
        'playwright/require-top-level-describe': 'warn',
      },
    },
  ],
}
