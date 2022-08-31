# eslint-config-widen

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
