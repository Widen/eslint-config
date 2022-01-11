export = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@widen/recommended', 'prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
  },
  plugins: ['@widen'],
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
  },
}
