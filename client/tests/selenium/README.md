# Selenium WebDriver UI Automation Tests

This directory contains Selenium WebDriver tests that complement the Playwright tests for comprehensive UI automation.

## 🚀 Quick Start

### Prerequisites
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the frontend:
   ```bash
   npm run dev
   ```

3. Start the backend:
   ```bash
   npm run server
   ```

### Running Tests

#### Run All Selenium Tests
```bash
npm run test:selenium
```

#### Run Selenium Tests with Visible Browser
```bash
npm run test:selenium:headed
```

#### Run Comprehensive Test Suite (Selenium + Playwright)
```bash
npm run test:comprehensive
```

## 📋 Test Coverage

### Login Tests (`login.test.js`)
- ✅ Valid login with correct credentials
- ✅ Invalid login with wrong credentials
- ✅ Form validation for empty fields
- ✅ Loading state during login

### Todo Management Tests (`todos.test.js`)
- ✅ Dashboard loading and display
- ✅ Create new todos
- ✅ Edit existing todos
- ✅ Toggle todo completion status
- ✅ Delete todos with confirmation
- ✅ Form validation for empty titles
- ✅ Logout functionality

## 🛠️ Test Structure

### Class-Based Architecture
Each test file uses a class-based approach for better organization:

```javascript
class LoginTest {
  constructor() {
    this.driver = null;
    this.baseUrl = 'http://localhost:3000';
  }

  async setup() {
    // Initialize WebDriver
  }

  async teardown() {
    // Clean up WebDriver
  }

  async testValidLogin() {
    // Test implementation
  }
}
```

### Key Features
- **Headless/Headed Mode**: Tests can run with or without visible browser
- **Automatic Setup/Teardown**: WebDriver is properly initialized and cleaned up
- **Error Handling**: Comprehensive error handling and reporting
- **Data Test IDs**: Uses `data-testid` attributes for reliable element selection
- **Wait Strategies**: Proper waits for elements and page loads

## 🔧 Configuration

### Browser Options
- **Chrome**: Default browser with optimized options
- **Headless Mode**: Default for CI/CD environments
- **Headed Mode**: Available with `--headed` flag for debugging

### Timeouts
- **Implicit Wait**: 10 seconds
- **Page Load**: 30 seconds
- **Element Wait**: 5 seconds for specific elements

## 📊 Test Results

### Individual Test Output
```
🧪 Testing valid login...
✅ Valid login test passed
🧪 Testing invalid login...
✅ Invalid login test passed
🎉 All Selenium login tests passed!
```

### Comprehensive Report
```
============================================================
📊 TEST AUTOMATION SUMMARY
============================================================

🤖 SELENIUM WEBDRIVER TESTS:
   ✅ Passed: 2
   ❌ Failed: 0
   📋 Total: 2
   ✅ Login Tests
   ✅ Todo Tests

🎭 PLAYWRIGHT TESTS:
   ✅ Passed: 37
   ❌ Failed: 0
   📋 Total: 37

🎯 OVERALL SUMMARY:
   ✅ Total Passed: 39
   ❌ Total Failed: 0
   📋 Total Tests: 39
   📈 Success Rate: 100.0%
============================================================
```

## 🎯 Comparison: Selenium vs Playwright

| Feature | Selenium WebDriver | Playwright |
|---------|-------------------|------------|
| **Browser Support** | Chrome, Firefox, Safari | Chromium, Firefox, WebKit |
| **Speed** | Slower, more stable | Faster, modern |
| **Setup** | Requires WebDriver | Built-in browsers |
| **Syntax** | WebDriver API | Modern async/await |
| **Parallel** | Manual setup | Built-in parallelization |
| **Reports** | Basic console | Rich HTML reports |
| **Debugging** | Browser DevTools | Built-in debugging |

## 🚀 Benefits of Dual Testing

1. **Cross-Validation**: Two different tools testing the same functionality
2. **Browser Coverage**: Different browser engines and rendering
3. **Tool Diversity**: Reduces dependency on single testing framework
4. **CI/CD Flexibility**: Can run either or both based on needs
5. **Learning**: Demonstrates multiple automation approaches

## 🔍 Debugging

### Run with Visible Browser
```bash
npm run test:selenium:headed
```

### Run Single Test File
```bash
node tests/selenium/login.test.js --headed
```

### Add Debug Logging
```javascript
// Add to test methods
console.log('Current URL:', await this.driver.getCurrentUrl());
console.log('Page title:', await this.driver.getTitle());
```

## 📈 Integration with CI/CD

The Selenium tests can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions step
- name: Run Selenium Tests
  run: |
    cd client
    npm run test:selenium
```

## 🎯 Best Practices

1. **Use Data Test IDs**: All elements have `data-testid` for reliable selection
2. **Proper Waits**: Use explicit waits instead of `sleep()`
3. **Error Handling**: Comprehensive try-catch blocks
4. **Cleanup**: Always clean up WebDriver in `teardown()`
5. **Reporting**: Clear console output for test results

## 🔧 Troubleshooting

### Common Issues

1. **ChromeDriver not found**: Install Chrome browser
2. **Port conflicts**: Ensure no other browser automation is running
3. **Element not found**: Check if frontend is running on port 3000
4. **Timeout errors**: Increase wait times or check network connectivity

### Debug Commands
```bash
# Check if frontend is running
curl http://localhost:3000

# Check if backend is running
curl http://localhost:5000/api/auth/login

# Run with verbose logging
DEBUG=* npm run test:selenium
``` 