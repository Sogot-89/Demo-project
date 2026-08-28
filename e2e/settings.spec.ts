import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

const login = async (page: Page) => {
  await page.goto('/login');
  await page.getByTestId('email-input').fill('e2e@example.com');
  await page.getByTestId('password-input').fill('password1');
  await page.getByTestId('submit-button').click();
  await expect(page.getByTestId('dashboard')).toBeVisible();
};

test('settings: notification channel toggles render', async ({ page }) => {
  await login(page);
  await page.getByTestId('nav-settings').click();
  await expect(page).toHaveURL(/\/dashboard\/settings$/);

  await expect(page.getByTestId('channel-email')).toBeChecked();
  await expect(page.getByTestId('channel-slack')).not.toBeChecked();
  await expect(page.getByTestId('channel-sms')).not.toBeChecked();
});

test('settings: a toggled channel is saved to a cookie and survives reload', async ({ page }) => {
  await login(page);
  await page.goto('/dashboard/settings');

  await page.getByText('Slack', { exact: true }).click();
  await expect(page.getByTestId('channel-slack')).toBeChecked();

  const cookies = await page.context().cookies();
  const saved = cookies.find((c) => c.name === 'notification.settings');
  expect(saved).toBeTruthy();
  expect(JSON.parse(decodeURIComponent(saved!.value))).toMatchObject({ slack: true });

  await page.reload();
  await expect(page.getByTestId('channel-slack')).toBeChecked();
});
