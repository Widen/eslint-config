import eslint from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import sort from 'eslint-plugin-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: ['**/lib/', '**/packages/eslint-playground/'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  sort.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
      },

      parser: tsParser,
    },

    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
]
