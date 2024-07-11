import jest from 'eslint-plugin-jest'

export default [
  {
    files: [
      '*.spec.js',
      '*.test.js',
      '*.spec.jsx',
      '*.test.jsx',
      '*.spec.ts',
      '*.test.ts',
      '*.spec.tsx',
      '*.test.tsx',
    ],
    plugins: {
      jest,
    },
    rules: {
      ...jest.configs.recommended.rules,
    },
  },
]
