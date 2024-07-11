// index.js or index.mjs inside eslint-config-widen package
import baseConfig from './index.js'
import typescriptConfig from './typescript.js'
import reactConfig from './react.js'
import playwrightConfig from './playwright.js'
import jestConfig from './jest.js'
import { Linter } from 'eslint'

export interface EslintConfig {
  base: Linter.FlatConfig[]
  typescript: Linter.FlatConfig[]
  react: Linter.FlatConfig[]
  playwright: Linter.FlatConfig[]
  jest: Linter.FlatConfig[]
}

const configs = {
  base: baseConfig,
  typescript: typescriptConfig,
  react: reactConfig,
  playwright: playwrightConfig,
  jest: jestConfig,
} as unknown as EslintConfig

export default configs
