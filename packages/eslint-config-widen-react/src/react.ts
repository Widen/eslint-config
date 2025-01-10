import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import noConditionalCssProp from './rules/no-conditional-css-prop.js'
import sharedGlobals from './sharedGlobals.js'

const languageOptions = {
  globals: sharedGlobals,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
}

const reactVersion = {
  settings: {
    react: {
      version: 'detect',
    },
  },
}

export default [
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions,
    plugins: {
      react,
    },
    rules: {
      ...react.configs.recommended.rules,
    },
    ...reactVersion,
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions,
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions,
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...jsxA11y.configs.recommended.rules,
    },
  },
  {
    files: ['*.tsx', '*.{spec,test}.{js,jsx}'],
    languageOptions,
    rules: {
      'react/prop-types': 'off',
    },
  },
  {
    files: ['*.{spec,test}.{tsx,js,jsx}'],
    languageOptions,
    rules: {
      'react/button-has-type': 'off',
      'react/display-name': 'off',
    },
  },
  {
    files: ['*.tsx', '*.{spec,test}.{js,jsx}'],
    languageOptions,
    rules: {
      'custom/no-conditional-css-prop': noConditionalCssProp,
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          controlComponents: ['TextInput'],
        },
      ],
      'jsx-a11y/no-autofocus': [
        'warn',
        {
          ignoreNonDOM: true,
        },
      ],
      'react/button-has-type': 'warn',
      // https://reactjs.org/docs/jsx-in-depth.html#props-default-to-true
      'react/jsx-boolean-value': ['warn', 'always'],
      'react/jsx-curly-brace-presence': ['warn', 'never'],
      'react/jsx-first-prop-new-line': ['error', 'multiline'],
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-sort-props': [
        'error',
        {
          ignoreCase: true,
          reservedFirst: true,
        },
      ],
      'react/no-find-dom-node': 'warn',
      'react/no-unescaped-entities': 'off',
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
      'react/self-closing-comp': 'warn',
      'react/sort-prop-types': [
        'error',
        {
          ignoreCase: true,
        },
      ],
      'widen/jsx-fragments': 'error',
      'widen/jsx-import': 'error',
    },
  },
]
