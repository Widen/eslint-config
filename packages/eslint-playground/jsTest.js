/**
 * contains some failing rules to test base eslint config
 */
export function test(input = 'test', hey, _) {
  try {
    console.log('test')
  } catch (e) {
    throw e
  }

  const values = Array(4)
    .fill(null)
    .map((_, i) => Date.now().toString() + i)

  console.log(values)
}
