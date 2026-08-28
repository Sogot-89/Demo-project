import { expect, test } from '@playwright/test'

test('counter increments and decrements on click', async ({ page }) => {
  await page.goto('/')

  const value = page.getByTestId('count-value')
  await expect(value).toHaveText('0')

  await page.getByRole('button', { name: 'Increment' }).click()
  await page.getByRole('button', { name: 'Increment' }).click()
  await expect(value).toHaveText('2')

  await page.getByRole('button', { name: 'Decrement' }).click()
  await expect(value).toHaveText('1')
})
