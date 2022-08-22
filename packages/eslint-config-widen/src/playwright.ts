export = {
  overrides: [
    {
      extends: ['plugin:playwright/playwright-test'],
      plugins: ['playwright'],
      rules: {
        // TODO: Uncomment when these rules are released
        // 'playwright/prefer-lowercase-title': [
        //   'warn',
        //   { ignoreTopLevelDescribe: true },
        // ],
        // 'playwright/require-top-level-describe': 'warn',
      },
    },
  ],
}
