import { test, expect } from '@playwright/test';

test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should display login form with all required elements', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Todo App/);
    
    // Check main heading
    await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
    
    // Check form elements
    await expect(page.getByTestId('username-input')).toBeVisible();
    await expect(page.getByTestId('password-input')).toBeVisible();
    await expect(page.getByTestId('login-button')).toBeVisible();
    
    // Check demo credentials section
    await expect(page.getByText('Demo Credentials:')).toBeVisible();
    await expect(page.getByText('Username: admin')).toBeVisible();
    await expect(page.getByText('Password: password123')).toBeVisible();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    // Fill in valid credentials
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('password123');
    
    // Click login button
    await page.getByTestId('login-button').click();
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/');
    
    // Should show dashboard content
    await expect(page.getByRole('heading', { name: 'My Todos' })).toBeVisible();
    await expect(page.getByTestId('add-todo-button')).toBeVisible();
    
    // Should show welcome message
    await expect(page.getByText('Welcome, admin!')).toBeVisible();
  });

  test('should show error with invalid username', async ({ page }) => {
    // Fill in invalid username
    await page.getByTestId('username-input').fill('invaliduser');
    await page.getByTestId('password-input').fill('password123');
    
    // Click login button
    await page.getByTestId('login-button').click();
    
    // Should show error message
    await expect(page.getByText('Invalid credentials')).toBeVisible();
    
    // Should stay on login page
    await expect(page).toHaveURL('/login');
  });

  test('should show error with invalid password', async ({ page }) => {
    // Fill in invalid password
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('wrongpassword');
    
    // Click login button
    await page.getByTestId('login-button').click();
    
    // Should show error message
    await expect(page.getByText('Invalid credentials')).toBeVisible();
    
    // Should stay on login page
    await expect(page).toHaveURL('/login');
  });

  test('should show validation error with empty username', async ({ page }) => {
    // Leave username empty
    await page.getByTestId('password-input').fill('password123');
    
    // Try to submit form
    await page.getByTestId('login-button').click();
    
    // Should show validation error
    await expect(page.getByText('Username is required')).toBeVisible();
  });

  test('should show validation error with empty password', async ({ page }) => {
    // Leave password empty
    await page.getByTestId('username-input').fill('admin');
    
    // Try to submit form
    await page.getByTestId('login-button').click();
    
    // Should show validation error
    await expect(page.getByText('Password is required')).toBeVisible();
  });

  test('should show loading state during login', async ({ page }) => {
    // Fill in valid credentials
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('password123');
    
    // Click login button
    const loginButton = page.getByTestId('login-button');
    await loginButton.click();
    
    // Button should show loading state briefly
    await expect(loginButton).toHaveText('Signing in...');
    
    // Should eventually redirect to dashboard
    await expect(page).toHaveURL('/');
  });

  test('should redirect to dashboard if already logged in', async ({ page }) => {
    // First login
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    
    // Should be on dashboard
    await expect(page).toHaveURL('/');
    
    // Try to access login page again
    await page.goto('/login');
    
    // Should redirect back to dashboard
    await expect(page).toHaveURL('/');
  });
}); 