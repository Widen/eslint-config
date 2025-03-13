# eslint-config-widen

## 6.0.0

### Minor Changes

- 279e6bb: Fix ts references.

### Patch Changes

- Updated dependencies [279e6bb]
  - eslint-config-widen-base@4.0.0
  - eslint-config-widen-jest@2.2.0
  - eslint-config-widen-playwright@2.2.0
  - eslint-config-widen-react@2.3.0
  - eslint-config-widen-typescript@2.3.0
  - eslint-plugin-widen@3.2.0

## 5.0.0

### Minor Changes

- d2edd5e: Fix release script.

### Patch Changes

- Updated dependencies [d2edd5e]
  - eslint-config-widen-base@3.0.0
  - eslint-config-widen-jest@2.1.0
  - eslint-config-widen-playwright@2.1.0
  - eslint-config-widen-react@2.2.0
  - eslint-config-widen-typescript@2.2.0
  - eslint-plugin-widen@3.1.0

## 4.0.4

### Patch Changes

- Updated dependencies [8f9d5f7]
  - eslint-config-widen-typescript@2.1.0
  - eslint-config-widen-react@2.1.0

## 4.0.3

### Patch Changes

- 1913360: Correctly specify react version and fix typescript overrides.

## 4.0.2

### Patch Changes

- 7443c84: Upgrade the typescript-eslint package away from the legacy config
  setups.

## 4.0.1

### Patch Changes

- fd5844c: Fix config and update examples.

## 4.0.0

### Major Changes

- 601e5bd: Update to eslint 9, apps will need to be on eslint 9+ alongside this
  update. They will also need to convert their .eslintrc and .eslintignore into
  the new format of eslint.config.mjs. Here is a migration guide that goes over
  the basics https://eslint.org/docs/latest/use/configure/migration-guide. For
  general usage and a sample eslint.config.mjs see the updated readme in this
  repo.

### Patch Changes

- Updated dependencies [601e5bd]
  - eslint-plugin-widen@3.0.0

## 3.0.0

### Major Changes

- d6e4c92: Updates all versions to latest with major version updates for
  @typescript-eslint and eslint-plugin-jest

### Patch Changes

- Updated dependencies [d6e4c92]
  - eslint-plugin-widen@2.0.0

## 2.0.1

### Patch Changes

- 235a3c6: Remove npmRegistryServer
- Updated dependencies [235a3c6]
  - eslint-plugin-widen@1.1.1

## 2.0.0

### Minor Changes

- 485da96: Update versions

### Patch Changes

- Updated dependencies [485da96]
  - eslint-plugin-widen@1.1.0

## 1.1.0

### Minor Changes

- b3d51d5: Add more Playwright rules

## 1.0.3

### Patch Changes

- 4388b29: Rename `<Badge>` `color` prop to `status`.

## 1.0.2

### Patch Changes

- 79ca703: Ignore errors for `react/no-unknown-property` when using the `css`
  prop.

## 1.0.1

### Patch Changes

- b38d77e: Remove `overrides` from `widen/playwright` configuration which was
  incorrect.

## 1.0.0

### Patch Changes

- Updated dependencies [f358429]
- Updated dependencies [c04b099]
  - eslint-plugin-widen@1.0.0

## 0.7.0

### Minor Changes

- 042b316: Add `widen/playwright` config to allow easily configuring the
  Playwright ESLint config.

## 0.6.2

### Patch Changes

- 004c055: Ignore unused variables in destructuring patterns when they start
  with an underscore. This has worked historically for JavaScript, but it was
  not working properly in TypeScript files.

## 0.6.1

### Patch Changes

- dac6d42: Remove `camelcase` rule which was too noisy.

## 0.6.0

### Minor Changes

- 199c091: Enable a number of new ESLint rules:

  - [camelcase](https://eslint.org/docs/rules/camelcase)
  - [default-param-last](https://eslint.org/docs/rules/default-param-last)
  - [dot-notation](https://eslint.org/docs/rules/dot-notation)
  - [no-console](https://eslint.org/docs/rules/no-console)
  - [no-else-return](https://eslint.org/docs/rules/no-else-return)
  - [no-empty](https://eslint.org/docs/rules/no-empty)
  - [no-param-reassign](https://eslint.org/docs/rules/no-param-reassign)
  - [no-return-await](https://eslint.org/docs/rules/no-return-await)
  - [no-template-curly-in-string](https://eslint.org/docs/rules/no-template-curly-in-string)
  - [no-unneeded-ternary](https://eslint.org/docs/rules/no-unneeded-ternary)
  - [no-useless-computed-key](https://eslint.org/docs/rules/no-useless-computed-key)
  - [require-await](https://eslint.org/docs/rules/require-await)

## 0.5.0

### Minor Changes

- 43fcc99: Enable the `react/jsx-curly-brace-presence` rule to automatically
  remove unnecessary braces from JSX props.

## 0.4.0

### Minor Changes

- 1fd905a: Automatically enable the type property sorting rule.

### Patch Changes

- 1fd905a: Properly detect `.` or `..` as relative imports.
- 1fd905a: Fix issue with relative imports not sorting to the end.

## 0.3.0

### Minor Changes

- 4b10644: Sort `@widen` imports and exports after dependencies.

## 0.2.1

### Patch Changes

- fcb1916: Add missing peer dependency.

## 0.2.0

### Minor Changes

- 35ce5a7: Make `@babel/eslint-parser` and optional peer dependency.

## 0.1.1

### Patch Changes

- 21282be: Add missing files to package output.

## 0.1.0

### Minor Changes

- f3d96fa: Initial release!

### Patch Changes

- Updated dependencies [f3d96fa]
  - eslint-plugin-widen@0.1.0
