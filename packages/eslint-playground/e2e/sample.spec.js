import { expect, test } from 'fixtures'

/**
 * Basic test with errors to test playwright eslint config
 */
test.describe('Sample', () => {
  test('should pass', async ({ page }) => {
    console.log('wow')
    await page.goto('https://playwright.dev/')
  })
})
