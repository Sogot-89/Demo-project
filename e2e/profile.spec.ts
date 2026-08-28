import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

const PNG_1PX =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

const login = async (page: Page) => {
  await page.goto('/login');
  await page.getByTestId('email-input').fill('e2e@example.com');
  await page.getByTestId('password-input').fill('password1');
  await page.getByTestId('submit-button').click();
  await expect(page.getByTestId('dashboard')).toBeVisible();
};

test('avatar upload: profile page exposes an upload control', async ({ page }) => {
  await login(page);
  await page.getByTestId('profile-link').click();
  await expect(page).toHaveURL(/\/dashboard\/profile$/);
  const card = page.getByTestId('profile-page');
  await expect(card.getByTestId('avatar-upload-button')).toBeVisible();
  await expect(card.getByTestId('avatar-fallback')).toHaveText('E');
});

test('avatar upload: a valid PNG becomes the profile image', async ({ page }) => {
  await login(page);
  await page.goto('/dashboard/profile');

  await page.getByTestId('avatar-input').setInputFiles({
    name: 'avatar.png',
    mimeType: 'image/png',
    buffer: Buffer.from(PNG_1PX, 'base64'),
  });

  const image = page.getByTestId('profile-page').getByTestId('avatar-image');
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute('src', /^data:image\/png/);
});

test('avatar upload: a non-image file is rejected', async ({ page }) => {
  await login(page);
  await page.goto('/dashboard/profile');

  await page.getByTestId('avatar-input').setInputFiles({
    name: 'notes.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('not an image'),
  });

  await expect(page.getByTestId('avatar-error')).toHaveText('Avatar must be a JPG or PNG image');
  await expect(page.getByTestId('profile-page').getByTestId('avatar-image')).toHaveCount(0);
});
