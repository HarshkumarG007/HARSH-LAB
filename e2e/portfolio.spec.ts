import { test, expect } from '@playwright/test';

test.describe('HARSH LAB Portfolio', () => {
  test('should load the FCP loader and then the main app', async ({ page }) => {
    await page.goto('/');
    
    // Expect the title to be correct
    await expect(page).toHaveTitle(/HARSH LAB/);

    // Expect the initial loader to be present
    const loader = page.locator('#initial-loader');
    await expect(loader).toBeVisible();

    // Expect the loader to disappear eventually
    await expect(loader).toBeHidden({ timeout: 10000 });
  });

  test('should open the contact modal when clicking the contact button in mobile fallback', async ({ page, isMobile }) => {
    // Only run this test for mobile viewports
    if (!isMobile) return;

    await page.goto('/');
    
    // Wait for loader to disappear
    await expect(page.locator('#initial-loader')).toBeHidden({ timeout: 10000 });

    const contactLink = page.getByRole('link', { name: /Initialize Contact/i });
    await expect(contactLink).toBeVisible();
    await expect(contactLink).toHaveAttribute('href', 'mailto:contact@example.com');
  });

  test('should successfully switch versions via VersionSwitcher', async ({ page, isMobile }) => {
    // Version switcher is available everywhere
    await page.goto('/');
    await expect(page.locator('#initial-loader')).toBeHidden({ timeout: 10000 });

    const switcherButton = page.getByLabel('Switch design version');
    await expect(switcherButton).toBeVisible();
    await switcherButton.click();

    // Select the V4 Evidence version
    const v4Option = page.getByRole('button', { name: /Evidence/i }).first();
    await expect(v4Option).toBeVisible();
    await v4Option.click();

    // Wait for the route/view to change - the "Radical Transparency" text is in the Evidence version
    await expect(page.locator('text=Radical Transparency')).toBeVisible({ timeout: 10000 });
  });
});
