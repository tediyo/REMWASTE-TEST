import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

class TodoTest {
  constructor() {
    this.driver = null;
    this.baseUrl = 'http://localhost:3000';
    this.isHeaded = process.argv.includes('--headed');
  }

  async setup() {
    const options = new chrome.Options();
    
    // Set Chrome executable path for Windows
    options.setChromeBinaryPath('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe');
    
    if (!this.isHeaded) {
      options.addArguments('--headless');
    }
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--disable-gpu');
    options.addArguments('--disable-extensions');

    this.driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    await this.driver.manage().window().setRect({ width: 1280, height: 720 });
    await this.driver.manage().setTimeouts({ implicit: 10000, pageLoad: 30000 });
  }

  async teardown() {
    if (this.driver) {
      await this.driver.quit();
    }
  }

  async login() {
    console.log('🔐 Logging in...');
    
    await this.driver.get(`${this.baseUrl}/login`);
    
    const usernameInput = await this.driver.findElement(By.css('[data-testid="username-input"]'));
    const passwordInput = await this.driver.findElement(By.css('[data-testid="password-input"]'));
    const loginButton = await this.driver.findElement(By.css('[data-testid="login-button"]'));
    
    await usernameInput.sendKeys('admin');
    await passwordInput.sendKeys('password123');
    await loginButton.click();
    
    // Wait for dashboard to load
    await this.driver.wait(until.elementLocated(By.css('h1')), 5000);
  }

  async testDashboardLoad() {
    console.log('🧪 Testing dashboard load...');
    
    await this.login();
    
    const heading = await this.driver.findElement(By.css('h1'));
    const headingText = await heading.getText();
    
    if (headingText.includes('My Todos')) {
      console.log('✅ Dashboard load test passed');
    } else {
      throw new Error('Dashboard not loaded properly');
    }
  }

  async testCreateTodo() {
    console.log('🧪 Testing create todo...');
    
    await this.login();
    
    // Click Add Todo button
    const addButton = await this.driver.findElement(By.css('[data-testid="add-todo-button"]'));
    await addButton.click();
    
    // Wait for form to appear
    await this.driver.wait(until.elementLocated(By.css('[data-testid="todo-title-input"]')), 5000);
    
    // Fill in todo form
    const titleInput = await this.driver.findElement(By.css('[data-testid="todo-title-input"]'));
    const descriptionInput = await this.driver.findElement(By.css('[data-testid="todo-description-input"]'));
    const saveButton = await this.driver.findElement(By.css('[data-testid="save-todo-button"]'));
    
    await titleInput.sendKeys('Selenium Test Todo');
    await descriptionInput.sendKeys('This todo was created by Selenium automation');
    await saveButton.click();
    
    // Wait for todo to appear in list
    await this.driver.wait(until.elementLocated(By.xpath("//h3[contains(text(), 'Selenium Test Todo')]")), 5000);
    
    const todoElement = await this.driver.findElement(By.xpath("//h3[contains(text(), 'Selenium Test Todo')]"));
    const todoText = await todoElement.getText();
    
    if (todoText.includes('Selenium Test Todo')) {
      console.log('✅ Create todo test passed');
    } else {
      throw new Error('Todo not created successfully');
    }
  }

  async testEditTodo() {
    console.log('🧪 Testing edit todo...');
    
    await this.login();
    
    // Find and click edit button for first todo
    const editButton = await this.driver.findElement(By.css('[data-testid="edit-todo-1"]'));
    await editButton.click();
    
    // Wait for edit form
    await this.driver.wait(until.elementLocated(By.css('[data-testid="todo-title-input"]')), 5000);
    
    // Update todo title
    const titleInput = await this.driver.findElement(By.css('[data-testid="todo-title-input"]'));
    await titleInput.clear();
    await titleInput.sendKeys('Updated by Selenium');
    
    const saveButton = await this.driver.findElement(By.css('[data-testid="save-todo-button"]'));
    await saveButton.click();
    
    // Wait for updated todo to appear
    await this.driver.wait(until.elementLocated(By.xpath("//h3[contains(text(), 'Updated by Selenium')]")), 5000);
    
    console.log('✅ Edit todo test passed');
  }

  async testToggleTodo() {
    console.log('🧪 Testing toggle todo...');
    
    await this.login();
    
    // Find first todo checkbox
    const checkbox = await this.driver.findElement(By.css('[data-testid="todo-checkbox-1"]'));
    const initialChecked = await checkbox.isSelected();
    
    // Toggle the checkbox
    await checkbox.click();
    
    // Wait a moment for the change to take effect
    await this.driver.sleep(1000);
    
    const newChecked = await checkbox.isSelected();
    
    if (initialChecked !== newChecked) {
      console.log('✅ Toggle todo test passed');
    } else {
      throw new Error('Todo toggle not working');
    }
  }

  async testDeleteTodo() {
    console.log('🧪 Testing delete todo...');
    
    await this.login();
    
    // Find and click delete button for first todo
    const deleteButton = await this.driver.findElement(By.css('[data-testid="delete-todo-1"]'));
    await deleteButton.click();
    
    // Handle confirmation dialog
    const alert = await this.driver.switchTo().alert();
    await alert.accept();
    
    // Wait for todo to be removed (check that it's not present)
    await this.driver.sleep(2000);
    
    try {
      await this.driver.findElement(By.css('[data-testid="delete-todo-1"]'));
      throw new Error('Todo was not deleted');
    } catch (error) {
      if (error.name === 'NoSuchElementError') {
        console.log('✅ Delete todo test passed');
      } else {
        throw error;
      }
    }
  }

  async testFormValidation() {
    console.log('🧪 Testing form validation...');
    
    await this.login();
    
    // Click Add Todo button
    const addButton = await this.driver.findElement(By.css('[data-testid="add-todo-button"]'));
    await addButton.click();
    
    // Wait for form to appear
    await this.driver.wait(until.elementLocated(By.css('[data-testid="todo-title-input"]')), 5000);
    
    // Try to save without title
    const saveButton = await this.driver.findElement(By.css('[data-testid="save-todo-button"]'));
    await saveButton.click();
    
    // Wait for validation message
    await this.driver.wait(until.elementLocated(By.css('p.text-red-600')), 5000);
    
    const validationMessage = await this.driver.findElement(By.css('p.text-red-600'));
    const messageText = await validationMessage.getText();
    
    if (messageText.includes('Title is required')) {
      console.log('✅ Form validation test passed');
    } else {
      throw new Error('Validation message not displayed');
    }
  }

  async testLogout() {
    console.log('🧪 Testing logout...');
    
    await this.login();
    
    // Click logout button
    const logoutButton = await this.driver.findElement(By.css('[data-testid="logout-button"]'));
    await logoutButton.click();
    
    // Wait for redirect to login page
    await this.driver.wait(until.urlIs(`${this.baseUrl}/login`), 5000);
    
    // Verify we're on login page
    const loginHeading = await this.driver.findElement(By.css('h2'));
    const headingText = await loginHeading.getText();
    
    if (headingText.includes('Sign in to your account')) {
      console.log('✅ Logout test passed');
    } else {
      throw new Error('Logout not working properly');
    }
  }

  async runAllTests() {
    try {
      await this.setup();
      
      await this.testDashboardLoad();
      await this.testCreateTodo();
      await this.testEditTodo();
      await this.testToggleTodo();
      await this.testDeleteTodo();
      await this.testFormValidation();
      await this.testLogout();
      
      console.log('🎉 All Selenium todo tests passed!');
    } catch (error) {
      console.error('❌ Selenium todo test failed:', error.message);
      throw error;
    } finally {
      await this.teardown();
    }
  }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const test = new TodoTest();
  test.runAllTests().catch(console.error);
}

export default TodoTest; 