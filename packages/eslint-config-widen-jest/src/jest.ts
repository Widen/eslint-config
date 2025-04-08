import jest from 'eslint-plugin-jest'

export default [
  {
    files: ['*.{test,spec}.{js,jsx,ts,tsx}'],
    plugins: {
      jest,
    },
    rules: {
      ...jest.configs.recommended.rules,
    },
  },
]
