// index.js or index.mjs inside eslint-config-widen package
import { Linter } from 'eslint'
import baseConfig from './index.js'
import jestConfig from './jest.js'
import playwrightConfig from './playwright.js'
import reactConfig from './react.js'
import typescriptConfig from './typescript.js'

export interface EslintConfig {
  base: Linter.FlatConfig[]
  typescript: Linter.FlatConfig[]
  react: Linter.FlatConfig[]
  playwright: Linter.FlatConfig[]
  jest: Linter.FlatConfig[]
}

const configs = {
  base: baseConfig,
  jest: jestConfig,
  playwright: playwrightConfig,
  react: reactConfig,
  typescript: typescriptConfig,
} as unknown as EslintConfig

export default configs
