import { test, expect } from '@playwright/test';

const login = async (page: import('@playwright/test').Page) => {
  await page.goto('/login');
  await page.getByTestId('email-input').fill('e2e@example.com');
  await page.getByTestId('password-input').fill('password1');
  await page.getByTestId('submit-button').click();
};

test('Flow 1: login executes and redirects to the dashboard', async ({ page }) => {
  await login(page);
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByTestId('dashboard')).toBeVisible();
  await expect(page.getByTestId('profile-name')).toHaveText('e2e');
});

test('Flow 1: session survives a reload', async ({ page }) => {
  await login(page);
  await expect(page.getByTestId('dashboard')).toBeVisible();
  await page.reload();
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByTestId('dashboard')).toBeVisible();
});

test('Flow 2: manual URL access is redirected to /login when unauthenticated', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByTestId('login-form')).toBeVisible();
});

test('Flow 2: logout clears the session and blocks protected routes', async ({ page }) => {
  await login(page);
  await page.getByTestId('logout-button').click();
  await expect(page).toHaveURL(/\/login$/);
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/login$/);
});
