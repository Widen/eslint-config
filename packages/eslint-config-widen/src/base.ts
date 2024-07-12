import js from '@eslint/js'
import prettier from 'eslint-plugin-prettier'
import sort from 'eslint-plugin-sort'
import widen from 'eslint-plugin-widen'
import babelParser from '@babel/eslint-parser'
import sharedGlobals from './sharedGlobals.js'

export default [
  {
    languageOptions: {
      globals: sharedGlobals,
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
      },
    },
    plugins: {
      prettier,
      sort,
      widen,
    },
    rules: {
      'default-param-last': 'error',
      'dot-notation': 'error',
      eqeqeq: [
        'error',
        'always',
        {
          null: 'ignore',
        },
      ],
      'no-console': ['error', { allow: ['error'] }],
      'no-dupe-args': 'error',
      'no-duplicate-imports': 'error',
      'no-else-return': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-extra-bind': 'error',
      'no-param-reassign': 'error',
      'no-return-await': 'error',
      'no-template-curly-in-string': 'error',
      'no-unneeded-ternary': 'error',
      'no-unused-expressions': 'off',
      'no-unused-vars': [
        'error',
        {
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
        },
      ],
      'no-useless-computed-key': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-const': [
        'error',
        {
          destructuring: 'all',
        },
      ],
      'require-await': 'error',
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
            { order: 5, regex: '^\\.+' },
            { order: 2, type: 'dependency' },
            { order: 4, type: 'other' },
          ],
        },
      ],
    },
  },
  js.configs.recommended,
  {
    plugins: {
      prettier,
    },
    rules: {
      ...prettier.configs.recommended.rules,
    },
  },
]
