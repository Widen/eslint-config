export = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:sort/recommended', 'prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
  },
  plugins: ['widen'],
  rules: {
    eqeqeq: [
      'error',
      'always',
      {
        null: 'ignore',
      },
    ],
    'no-console': 'off',
    'no-dupe-args': 'error',
    'no-duplicate-imports': 'error',
    'no-extra-bind': 'error',
    'no-unneeded-ternary': 'error',
    'no-unused-expressions': 'off',
    'no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
      },
    ],
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
    'sort/exports': [
      'warn',
      {
        groups: [
          { order: 6, type: 'default' },
          { order: 5, type: 'sourceless' },
          { order: 2, regex: '^@widen\\/' },
          { order: 4, regex: '^\\.+' },
          { order: 1, type: 'dependency' },
          { order: 3, type: 'other' },
        ],
      },
    ],
    'sort/imports': [
      'warn',
      {
        groups: [
          { order: 1, type: 'side-effect' },
          { order: 3, regex: '^@widen\\/' },
          { order: 4, regex: '^\\.+' },
          { order: 2, type: 'dependency' },
          { order: 5, type: 'other' },
        ],
      },
    ],
  },
}
