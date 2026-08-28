import { expect, test } from '@playwright/test'

test('counter increments and decrements on click', async ({ page }) => {
  await page.goto('/')

  const value = page.getByTestId('count-value')
  await expect(value).toHaveText('0')

  await page.getByRole('button', { name: /increment/i }).click()
  await page.getByRole('button', { name: /increment/i }).click()
  await expect(value).toHaveText('2')

  await page.getByRole('button', { name: /decrement/i }).click()
  await expect(value).toHaveText('1')
})

test('navigates between routes', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'About' }).click()
  await expect(page).toHaveURL(/\/about$/)
  await expect(page.getByRole('heading', { name: 'About' })).toBeVisible()
})
