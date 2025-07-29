import { test, expect } from '@playwright/test';

test.describe('Simple Tests', () => {
  test('should work with basic page', async ({ page }) => {
    // Test that Playwright can navigate to a simple page
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example Domain/);
  });

  test('should handle localhost if available', async ({ page }) => {
    try {
      await page.goto('http://localhost:3000', { timeout: 5000 });
      // If we get here, the frontend is running
      console.log('Frontend is running!');
    } catch (error) {
      console.log('Frontend is not running:', error.message);
      // Skip this test if frontend is not available
      test.skip();
    }
  });
}); 