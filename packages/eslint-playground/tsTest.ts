/**
 * contains some failing rules to test typescript eslint config
 */
export function test(input = 'test', hey: TestType) {
  try {
    console.log('test')
  } catch (e) {
    throw e
  }
}

type TestType = 'zoo' | 'foo' | 'bar'

interface TestInterface {
  test: string
  input: number
}
