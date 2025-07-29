import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import firefox from 'selenium-webdriver/firefox.js';

class LoginTest {
  constructor() {
    this.driver = null;
    this.baseUrl = 'http://localhost:3000';
    this.isHeaded = process.argv.includes('--headed');
  }

  async setup() {
    console.log('🔧 Setting up Selenium WebDriver...');
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
    console.log('✅ WebDriver setup complete');
  }

  async teardown() {
    if (this.driver) {
      console.log('🧹 Cleaning up WebDriver...');
      await this.driver.quit();
      console.log('✅ WebDriver cleanup complete');
    }
  }

  async testValidLogin() {
    console.log('🧪 Testing valid login...');
    
    try {
      await this.driver.get(`${this.baseUrl}/login`);
      console.log('📍 Navigated to login page');
      
      // Fill in valid credentials
      const usernameInput = await this.driver.findElement(By.css('[data-testid="username-input"]'));
      const passwordInput = await this.driver.findElement(By.css('[data-testid="password-input"]'));
      const loginButton = await this.driver.findElement(By.css('[data-testid="login-button"]'));
      
      console.log('📝 Filling in credentials...');
      await usernameInput.sendKeys('admin');
      await passwordInput.sendKeys('password123');
      
      console.log('🖱️  Clicking login button...');
      await loginButton.click();
      
      // Wait for redirect to dashboard
      console.log('⏳ Waiting for redirect...');
      await this.driver.wait(until.urlIs(`${this.baseUrl}/`), 5000);
      
      // Verify dashboard is loaded
      const dashboardHeading = await this.driver.findElement(By.css('h1'));
      const headingText = await dashboardHeading.getText();
      
      if (headingText.includes('My Todos')) {
        console.log('✅ Valid login test passed');
      } else {
        throw new Error(`Dashboard not loaded after valid login. Heading: ${headingText}`);
      }
    } catch (error) {
      console.error('❌ Valid login test failed:', error.message);
      throw error;
    }
  }

  async testInvalidLogin() {
    console.log('🧪 Testing invalid login...');
    
    try {
      await this.driver.get(`${this.baseUrl}/login`);
      
      // Fill in invalid credentials
      const usernameInput = await this.driver.findElement(By.css('[data-testid="username-input"]'));
      const passwordInput = await this.driver.findElement(By.css('[data-testid="password-input"]'));
      const loginButton = await this.driver.findElement(By.css('[data-testid="login-button"]'));
      
      await usernameInput.sendKeys('wronguser');
      await passwordInput.sendKeys('wrongpass');
      await loginButton.click();
      
      // Wait for error message
      await this.driver.wait(until.elementLocated(By.css('.bg-red-50')), 5000);
      
      const errorElement = await this.driver.findElement(By.css('.bg-red-50'));
      const errorText = await errorElement.getText();
      
      if (errorText.includes('Invalid credentials')) {
        console.log('✅ Invalid login test passed');
      } else {
        throw new Error(`Error message not displayed for invalid login. Found: ${errorText}`);
      }
    } catch (error) {
      console.error('❌ Invalid login test failed:', error.message);
      throw error;
    }
  }

  async testEmptyFieldsValidation() {
    console.log('🧪 Testing empty fields validation...');
    
    try {
      await this.driver.get(`${this.baseUrl}/login`);
      
      const loginButton = await this.driver.findElement(By.css('[data-testid="login-button"]'));
      await loginButton.click();
      
      // Wait for validation messages
      await this.driver.wait(until.elementLocated(By.css('p.text-red-600')), 5000);
      
      const validationMessages = await this.driver.findElements(By.css('p.text-red-600'));
      
      if (validationMessages.length >= 1) {
        console.log('✅ Empty fields validation test passed');
      } else {
        throw new Error('Validation messages not displayed for empty fields');
      }
    } catch (error) {
      console.error('❌ Empty fields validation test failed:', error.message);
      throw error;
    }
  }

  async testLoadingState() {
    console.log('🧪 Testing loading state...');
    
    try {
      await this.driver.get(`${this.baseUrl}/login`);
      
      const usernameInput = await this.driver.findElement(By.css('[data-testid="username-input"]'));
      const passwordInput = await this.driver.findElement(By.css('[data-testid="password-input"]'));
      const loginButton = await this.driver.findElement(By.css('[data-testid="login-button"]'));
      
      await usernameInput.sendKeys('admin');
      await passwordInput.sendKeys('password123');
      await loginButton.click();
      
      // Check if button shows loading state briefly
      const buttonText = await loginButton.getText();
      
      if (buttonText.includes('Signing in...') || buttonText.includes('Sign in')) {
        console.log('✅ Loading state test passed');
      } else {
        throw new Error(`Loading state not working properly. Button text: ${buttonText}`);
      }
    } catch (error) {
      console.error('❌ Loading state test failed:', error.message);
      throw error;
    }
  }

  async runAllTests() {
    console.log('🚀 Starting Selenium Login Tests...\n');
    
    try {
      await this.setup();
      
      await this.testValidLogin();
      await this.testInvalidLogin();
      await this.testEmptyFieldsValidation();
      await this.testLoadingState();
      
      console.log('\n🎉 All Selenium login tests passed!');
    } catch (error) {
      console.error('\n❌ Selenium login test failed:', error.message);
      throw error;
    } finally {
      await this.teardown();
    }
  }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const test = new LoginTest();
  test.runAllTests().catch(error => {
    console.error('💥 Test execution failed:', error);
    process.exit(1);
  });
}

export default LoginTest; 