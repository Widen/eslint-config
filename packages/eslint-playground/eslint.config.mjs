import { base, react, jest, playwright, typescript } from 'eslint-config-widen'

export default [
  ...base,
  ...typescript,
  ...react,
  ...[
    // you can specify what to ignore by using the `ignores` key before any other rule
    // this will filter out things we dont want this to run on
    { ignores: ['*.test.*'] },
    ...jest,
    // you can also override rules by specifying the rule and the new value
    { files: ['*.spec.js'], rules: { 'jest/expect-expect': 'off' } },
  ],
  ...[{ files: ['e2e/**'] }, ...playwright],
]
