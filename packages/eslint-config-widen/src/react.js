import eslintReact from 'eslint-plugin-react'
import eslintReactHooks from 'eslint-plugin-react-hooks'
import eslintJsxA11y from 'eslint-plugin-jsx-a11y'

export default [
  eslintReact.configs.recommended,
  eslintReactHooks.configs.recommended,
  eslintJsxA11y.configs.recommended,
  {
    files: ['*.tsx', '*.{spec,test}.{js,jsx}'],
    rules: {
      'react/prop-types': 'off',
    },
  },
  {
    files: ['*.{spec,test}.{tsx,js,jsx}'],
    rules: {
      'react/button-has-type': 'off',
      'react/display-name': 'off',
    },
  },
  {
    files: ['*.tsx', '*.{spec,test}.{js,jsx}'],
    rules: {
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
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]