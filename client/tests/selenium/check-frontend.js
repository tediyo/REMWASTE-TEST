import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

async function checkFrontend() {
  console.log('🔍 Checking if frontend is running...');
  
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().addArguments('--headless'))
    .build();

  try {
    await driver.get('http://localhost:3000');
    
    // Wait for page to load
    await driver.wait(until.titleContains('Todo App'), 5000);
    
    const title = await driver.getTitle();
    console.log('✅ Frontend is running! Title:', title);
    
    // Check if we can see the login page
    const currentUrl = await driver.getCurrentUrl();
    console.log('📍 Current URL:', currentUrl);
    
    if (currentUrl.includes('/login')) {
      console.log('✅ Login page is accessible');
    } else {
      console.log('⚠️  Not on login page, redirecting...');
      await driver.get('http://localhost:3000/login');
    }
    
    // Check for login form elements
    try {
      await driver.findElement(By.css('[data-testid="username-input"]'));
      await driver.findElement(By.css('[data-testid="password-input"]'));
      await driver.findElement(By.css('[data-testid="login-button"]'));
      console.log('✅ Login form elements are present');
    } catch (error) {
      console.log('❌ Login form elements not found:', error.message);
    }
    
  } catch (error) {
    console.error('❌ Frontend check failed:', error.message);
    console.log('💡 Make sure to run: npm run dev (in another terminal)');
  } finally {
    await driver.quit();
  }
}

// Run the check
checkFrontend().catch(console.error); 