import jsxFragments from './rules/jsx-fragments'
import jsxImport from './rules/jsx-import'

export = {
  configs: {
    recommended: {
      rules: {
        'jsx-fragments': 'error',
        'jsx-import': 'error',
      },
    },
  },
  rules: {
    'jsx-fragments': jsxFragments,
    'jsx-import': jsxImport,
  },
}
