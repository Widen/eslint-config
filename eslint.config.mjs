import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// This is in place until https://github.com/typescript-eslint/typescript-eslint
// updates to v8
const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

export default [
  {
    ignores: ['**/lib/'],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:sort/recommended',
  ),
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
