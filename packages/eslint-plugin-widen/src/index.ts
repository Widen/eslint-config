import jsxFragments from './rules/jsx-fragments'
import jsxImport from './rules/jsx-import'
import migrations from './rules/migrations'

export = {
  rules: {
    'jsx-fragments': jsxFragments,
    'jsx-import': jsxImport,
    migrations,
  },
}
