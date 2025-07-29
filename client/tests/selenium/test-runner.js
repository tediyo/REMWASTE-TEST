import LoginTest from './login.test.js';
import TodoTest from './todos.test.js';

class TestRunner {
  constructor() {
    this.results = {
      selenium: { passed: 0, failed: 0, tests: [] },
      playwright: { passed: 0, failed: 0, tests: [] }
    };
  }

  async runSeleniumTests() {
    console.log('\n🚀 Running Selenium WebDriver Tests...\n');
    
    const startTime = Date.now();
    
    try {
      // Run login tests
      const loginTest = new LoginTest();
      await loginTest.runAllTests();
      this.results.selenium.tests.push({ name: 'Login Tests', status: 'PASSED' });
      this.results.selenium.passed++;
    } catch (error) {
      this.results.selenium.tests.push({ name: 'Login Tests', status: 'FAILED', error: error.message });
      this.results.selenium.failed++;
    }

    try {
      // Run todo tests
      const todoTest = new TodoTest();
      await todoTest.runAllTests();
      this.results.selenium.tests.push({ name: 'Todo Tests', status: 'PASSED' });
      this.results.selenium.passed++;
    } catch (error) {
      this.results.selenium.tests.push({ name: 'Todo Tests', status: 'FAILED', error: error.message });
      this.results.selenium.failed++;
    }

    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    console.log(`\n⏱️  Selenium tests completed in ${duration.toFixed(2)}s`);
  }

  async runPlaywrightTests() {
    console.log('\n🎭 Running Playwright Tests...\n');
    
    const { exec } = await import('child_process');
    const { promisify } = await import('util');
    const execAsync = promisify(exec);

    try {
      const { stdout, stderr } = await execAsync('npx playwright test --reporter=json');
      
      // Parse Playwright results (simplified)
      const lines = stdout.split('\n');
      let passed = 0;
      let failed = 0;
      
      lines.forEach(line => {
        if (line.includes('PASS')) passed++;
        if (line.includes('FAIL')) failed++;
      });

      this.results.playwright.passed = passed;
      this.results.playwright.failed = failed;
      
      console.log(`✅ Playwright tests completed: ${passed} passed, ${failed} failed`);
    } catch (error) {
      console.error('❌ Playwright tests failed:', error.message);
      this.results.playwright.failed++;
    }
  }

  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST AUTOMATION SUMMARY');
    console.log('='.repeat(60));

    // Selenium Results
    console.log('\n🤖 SELENIUM WEBDRIVER TESTS:');
    console.log(`   ✅ Passed: ${this.results.selenium.passed}`);
    console.log(`   ❌ Failed: ${this.results.selenium.failed}`);
    console.log(`   📋 Total: ${this.results.selenium.passed + this.results.selenium.failed}`);
    
    this.results.selenium.tests.forEach(test => {
      const status = test.status === 'PASSED' ? '✅' : '❌';
      console.log(`   ${status} ${test.name}`);
      if (test.error) {
        console.log(`      Error: ${test.error}`);
      }
    });

    // Playwright Results
    console.log('\n🎭 PLAYWRIGHT TESTS:');
    console.log(`   ✅ Passed: ${this.results.playwright.passed}`);
    console.log(`   ❌ Failed: ${this.results.playwright.failed}`);
    console.log(`   📋 Total: ${this.results.playwright.passed + this.results.playwright.failed}`);

    // Overall Summary
    const totalPassed = this.results.selenium.passed + this.results.playwright.passed;
    const totalFailed = this.results.selenium.failed + this.results.playwright.failed;
    const totalTests = totalPassed + totalFailed;

    console.log('\n🎯 OVERALL SUMMARY:');
    console.log(`   ✅ Total Passed: ${totalPassed}`);
    console.log(`   ❌ Total Failed: ${totalFailed}`);
    console.log(`   📋 Total Tests: ${totalTests}`);
    console.log(`   📈 Success Rate: ${((totalPassed / totalTests) * 100).toFixed(1)}%`);

    console.log('\n' + '='.repeat(60));
  }

  async runAllTests() {
    console.log('🧪 Starting Comprehensive UI Automation Test Suite...\n');
    
    await this.runSeleniumTests();
    await this.runPlaywrightTests();
    this.printSummary();
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const runner = new TestRunner();
  runner.runAllTests().catch(console.error);
}

export default TestRunner; 