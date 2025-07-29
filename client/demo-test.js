import { test, expect } from '@playwright/test';

test('Demo: Watch the automation', async ({ page }) => {
  // Navigate to the app
  await page.goto('http://localhost:3000');
  
  // Wait a moment to see the page
  await page.waitForTimeout(2000);
  
  // Fill in login form
  await page.getByTestId('username-input').fill('admin');
  await page.waitForTimeout(500);
  
  await page.getByTestId('password-input').fill('password123');
  await page.waitForTimeout(500);
  
  // Click login button
  await page.getByTestId('login-button').click();
  
  // Wait to see the dashboard
  await page.waitForTimeout(2000);
  
  // Click "Add Todo" button
  await page.getByTestId('add-todo-button').click();
  await page.waitForTimeout(1000);
  
  // Fill in todo form
  await page.getByTestId('todo-title-input').fill('Watch Automation Demo');
  await page.waitForTimeout(500);
  
  await page.getByTestId('todo-description-input').fill('This todo was created by automated testing!');
  await page.waitForTimeout(500);
  
  // Save the todo
  await page.getByTestId('save-todo-button').click();
  await page.waitForTimeout(2000);
  
  // Verify the todo was created
  await expect(page.getByText('Watch Automation Demo')).toBeVisible();
  
  // Wait to see the result
  await page.waitForTimeout(3000);
}); 