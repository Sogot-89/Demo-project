import { test, expect } from '@playwright/test';

const signIn = async (page: import('@playwright/test').Page) => {
  await page.goto('/login');
  await page.getByTestId('email-input').fill('e2e@example.com');
  await page.getByTestId('password-input').fill('password1');
  await page.getByTestId('submit-button').click();
  await expect(page.getByTestId('dashboard')).toBeVisible();
};

test('Flow 3: desktop viewport shows the expanded sidebar', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await signIn(page);
  await expect(page.getByTestId('sidebar')).toHaveAttribute('data-collapsed', 'false');
  await expect(page.getByTestId('nav-overview')).toBeVisible();
});

test('Flow 3: sidebar toggles collapsed state', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await signIn(page);
  await page.getByTestId('sidebar-toggle').click();
  await expect(page.getByTestId('sidebar')).toHaveAttribute('data-collapsed', 'true');
});

test('Flow 3: mobile viewport keeps metrics and charts readable', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await signIn(page);
  await expect(page.getByTestId('metric-revenue')).toBeVisible();
  await expect(page.getByTestId('line-chart')).toBeVisible();
  await expect(page.getByTestId('events-table')).toBeVisible();
});
