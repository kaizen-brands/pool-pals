import { expect, test } from '@playwright/test';

test('homepage renders the public quote path', async ({ page }) => {
  const response = await page.goto('/', { waitUntil: 'domcontentloaded' });

  expect(response, 'homepage response should exist').not.toBeNull();
  expect(response!.status(), 'homepage should return a successful status').toBeLessThan(400);

  await expect(page).toHaveTitle(/Pool Pals/i);
  await expect(page.getByRole('heading', { name: /Sparkling pools/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Get instant quote/i })).toBeVisible();
});
