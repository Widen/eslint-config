export = {
  overrides: [
    {
      extends: ['plugin:jest/recommended'],
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
      plugins: ['jest'],
    },
  ],
}
