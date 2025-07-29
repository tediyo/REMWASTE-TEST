import { test, expect } from '@playwright/test';

test.describe('Todo Management Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    
    // Wait for dashboard to load
    await expect(page.getByRole('heading', { name: 'My Todos' })).toBeVisible();
  });

  test('should display dashboard with initial todos', async ({ page }) => {
    // Check dashboard elements
    await expect(page.getByRole('heading', { name: 'My Todos' })).toBeVisible();
    await expect(page.getByTestId('add-todo-button')).toBeVisible();
    
    // Should show existing todos
    await expect(page.getByText('Learn React Testing')).toBeVisible();
    await expect(page.getByText('Build API Tests')).toBeVisible();
  });

  test('should create a new todo', async ({ page }) => {
    // Click add todo button
    await page.getByTestId('add-todo-button').click();
    
    // Fill in todo form
    await page.getByTestId('todo-title-input').fill('Test Todo');
    await page.getByTestId('todo-description-input').fill('This is a test todo');
    
    // Submit form
    await page.getByTestId('save-todo-button').click();
    
    // Should close form and show new todo
    await expect(page.getByText('Test Todo')).toBeVisible();
    await expect(page.getByText('This is a test todo')).toBeVisible();
    
    // Form should be hidden
    await expect(page.getByTestId('todo-title-input')).not.toBeVisible();
  });

  test('should create todo with minimal data', async ({ page }) => {
    // Click add todo button
    await page.getByTestId('add-todo-button').click();
    
    // Fill only title
    await page.getByTestId('todo-title-input').fill('Minimal Todo');
    
    // Submit form
    await page.getByTestId('save-todo-button').click();
    
    // Should show new todo
    await expect(page.getByText('Minimal Todo')).toBeVisible();
  });

  test('should show validation error for empty title', async ({ page }) => {
    // Click add todo button
    await page.getByTestId('add-todo-button').click();
    
    // Try to submit without title
    await page.getByTestId('save-todo-button').click();
    
    // Should show validation error
    await expect(page.getByText('Title is required')).toBeVisible();
  });

  test('should edit an existing todo', async ({ page }) => {
    // Find and click edit button for first todo
    const editButton = page.getByTestId('edit-todo-1');
    await editButton.click();
    
    // Should show edit form
    await expect(page.getByTestId('todo-title-input')).toBeVisible();
    await expect(page.getByTestId('todo-title-input')).toHaveValue('Learn React Testing');
    
    // Update todo
    await page.getByTestId('todo-title-input').fill('Updated Todo Title');
    await page.getByTestId('todo-description-input').fill('Updated description');
    
    // Submit changes
    await page.getByTestId('save-todo-button').click();
    
    // Should show updated todo
    await expect(page.getByText('Updated Todo Title')).toBeVisible();
    await expect(page.getByText('Updated description')).toBeVisible();
  });

  test('should toggle todo completion status', async ({ page }) => {
    // Find first todo checkbox
    const checkbox = page.getByTestId('todo-checkbox-1');
    
    // Get initial state
    const initialChecked = await checkbox.isChecked();
    
    // Toggle checkbox
    await checkbox.click();
    
    // Should have opposite state
    await expect(checkbox).toBeChecked(!initialChecked);
    
    // Should show completion status
    if (!initialChecked) {
      await expect(page.getByText('✓ Completed')).toBeVisible();
    }
  });

  test('should delete a todo', async ({ page }) => {
    // Find delete button for first todo
    const deleteButton = page.getByTestId('delete-todo-1');
    
    // Click delete button
    await deleteButton.click();
    
    // Should show confirmation dialog
    await expect(page.getByText('Are you sure you want to delete this todo?')).toBeVisible();
    
    // Confirm deletion
    await page.getByRole('button', { name: 'OK' }).click();
    
    // Todo should be removed
    await expect(page.getByText('Learn React Testing')).not.toBeVisible();
  });

  test('should cancel todo deletion', async ({ page }) => {
    // Find delete button for first todo
    const deleteButton = page.getByTestId('delete-todo-1');
    
    // Click delete button
    await deleteButton.click();
    
    // Should show confirmation dialog
    await expect(page.getByText('Are you sure you want to delete this todo?')).toBeVisible();
    
    // Cancel deletion
    await page.getByRole('button', { name: 'Cancel' }).click();
    
    // Todo should still be visible
    await expect(page.getByText('Learn React Testing')).toBeVisible();
  });

  test('should close todo form', async ({ page }) => {
    // Click add todo button
    await page.getByTestId('add-todo-button').click();
    
    // Should show form
    await expect(page.getByTestId('todo-title-input')).toBeVisible();
    
    // Click close button
    await page.getByTestId('close-form-button').click();
    
    // Form should be hidden
    await expect(page.getByTestId('todo-title-input')).not.toBeVisible();
  });

  test('should show empty state when no todos', async ({ page }) => {
    // Delete all existing todos
    const deleteButtons = page.getByTestId(/delete-todo-/);
    const count = await deleteButtons.count();
    
    for (let i = 0; i < count; i++) {
      await deleteButtons.first().click();
      await page.getByRole('button', { name: 'OK' }).click();
    }
    
    // Should show empty state
    await expect(page.getByText('No todos yet')).toBeVisible();
    await expect(page.getByText('Create your first todo to get started!')).toBeVisible();
  });

  test('should handle form validation', async ({ page }) => {
    // Click add todo button
    await page.getByTestId('add-todo-button').click();
    
    // Try to submit empty form
    await page.getByTestId('save-todo-button').click();
    
    // Should show validation error
    await expect(page.getByText('Title is required')).toBeVisible();
    
    // Fill title and try again
    await page.getByTestId('todo-title-input').fill('Valid Todo');
    await page.getByTestId('save-todo-button').click();
    
    // Should create todo successfully
    await expect(page.getByText('Valid Todo')).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    // Click logout button
    await page.getByTestId('logout-button').click();
    
    // Should redirect to login page
    await expect(page).toHaveURL('/login');
    
    // Should show login form
    await expect(page.getByTestId('username-input')).toBeVisible();
  });
}); 