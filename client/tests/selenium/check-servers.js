import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

async function checkServers() {
  console.log('🔍 Checking if servers are running...\n');
  
  // Check backend API
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'password123'
      })
    });
    
    if (response.ok) {
      console.log('✅ Backend API is running on port 5000');
    } else {
      console.log('❌ Backend API responded with error:', response.status);
    }
  } catch (error) {
    console.log('❌ Backend API is not running on port 5000');
    console.log('💡 Start backend with: npm run server');
  }
  
  // Check frontend
  try {
    const response = await fetch('http://localhost:3000');
    if (response.ok) {
      console.log('✅ Frontend is running on port 3000');
    } else {
      console.log('❌ Frontend responded with error:', response.status);
    }
  } catch (error) {
    console.log('❌ Frontend is not running on port 3000');
    console.log('💡 Start frontend with: npm run dev');
  }
  
  // Test with Selenium
  console.log('\n🧪 Testing with Selenium WebDriver...');
  
  const options = new chrome.Options();
  options.setChromeBinaryPath('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe');
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--disable-gpu');
  options.addArguments('--disable-extensions');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('http://localhost:3000');
    const title = await driver.getTitle();
    console.log('✅ Selenium can access frontend. Title:', title);
    
    // Test login form
    await driver.get('http://localhost:3000/login');
    const usernameInput = await driver.findElement(By.css('[data-testid="username-input"]'));
    const passwordInput = await driver.findElement(By.css('[data-testid="password-input"]'));
    const loginButton = await driver.findElement(By.css('[data-testid="login-button"]'));
    
    console.log('✅ Login form elements found');
    
    // Test login
    await usernameInput.sendKeys('admin');
    await passwordInput.sendKeys('password123');
    await loginButton.click();
    
    // Wait for redirect
    await driver.wait(until.urlIs('http://localhost:3000/'), 5000);
    console.log('✅ Login test successful');
    
  } catch (error) {
    console.error('❌ Selenium test failed:', error.message);
  } finally {
    await driver.quit();
  }
}

// Run the check
checkServers().catch(console.error); 