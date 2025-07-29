# Todo App with Comprehensive Automated Testing

  Documentation Link: https://docs.google.com/document/d/1ABtxqLwaMLpYrVysGOvJsc6Ns1vCmCqJ1wcxsmVhGak/edit?usp=sharing

A complete Todo application with React frontend and Node.js backend, featuring extensive automated testing with multiple frameworks and comprehensive documentation.

## 🚀 Quick Setup (1-2 minutes)

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Chrome browser (for Selenium tests)

### Installation & Running

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Start the backend server:**
   ```bash
   npm run server
   ```

3. **Start the React frontend:**
   ```bash
   npm run client
   ```

4. **Run all tests:**
   ```bash
   npm test
   ```

## 📋 Project Overview

### Frontend (React)
- User authentication (login/logout)
- Create, read, update, delete todos
- Responsive design with Tailwind CSS
- Real-time updates and form validation

### Backend (Node.js/Express)
- RESTful API with JWT authentication
- In-memory data storage for simplicity
- CRUD operations for todos
- Input validation and comprehensive error handling

## 🧪 Comprehensive Testing Strategy

### 1. UI Automation Testing

#### **Playwright Tests** (`client/tests/`)
- **Cross-browser testing**: Chrome, Firefox, Safari
- **Login scenarios**: Valid/invalid credentials, form validation
- **CRUD operations**: Create, edit, delete, toggle todos
- **Data validation**: Assert expected data presence
- **Error handling**: Form validation, error messages

**Test Files:**
- `client/tests/login.spec.js` - Authentication tests
- `client/tests/todos.spec.js` - Todo management tests
- `client/tests/simple.spec.js` - Basic functionality tests

#### **Selenium WebDriver Tests** (`client/tests/selenium/`)
- **Chrome-based testing** with detailed logging
- **Comprehensive UI automation** with step-by-step execution
- **Debug utilities** for troubleshooting

**Test Files:**
- `client/tests/selenium/login.test.js` - Login automation
- `client/tests/selenium/todos.test.js` - Todo CRUD automation
- `client/tests/selenium/test-runner.js` - Comprehensive test runner
- `client/tests/selenium/check-servers.js` - Server status verification
- `client/tests/selenium/check-frontend.js` - Frontend accessibility check

### 2. API Testing

#### **Supertest + Jest** (`server/tests/`)
- **Authentication endpoints**: Login, logout, token validation
- **CRUD operations**: All todo endpoints with positive/negative cases
- **Error handling**: Invalid inputs, unauthorized access
- **Data validation**: Response structure and content verification

**Test Files:**
- `server/tests/auth.test.js` - Authentication API tests
- `server/tests/todos.test.js` - Todo management API tests

#### **Postman Collection** (`postman_collection.json`)
- **17 comprehensive test cases** covering all endpoints
- **Positive and negative scenarios** with detailed assertions
- **Automated token management** for seamless testing
- **Ready for CI/CD integration** with Newman

### 3. Test Coverage
- **Frontend**: 90%+ component coverage
- **Backend**: 95%+ API endpoint coverage
- **Integration**: End-to-end user workflows
- **Cross-browser**: Multiple browser compatibility

## 📊 Test Reports & Documentation

### **Test Reports Location**

#### **Playwright Reports**
- **HTML Reports**: `client/playwright-report/`
- **Test Results**: `client/test-results/`
- **View Reports**: `npx playwright show-report`

#### **Coverage Reports**
- **HTML Coverage**: `coverage/` (generated after tests)
- **Console Output**: Detailed coverage statistics

#### **Postman Reports**
- **Collection**: `postman_collection.json`
- **Documentation**: `POSTMAN_COLLECTION_README.md`
- **CLI Reports**: Use Newman for automated reporting
- **HTML Extra Reports**: `newman-report.html` (detailed interactive reports)
- **Basic HTML Reports**: `report.html` (standard Newman reports)

### **Documentation Files**

#### **📖 Main Documentation**
- `README.md` - This comprehensive project guide
- `TEST_AUTOMATION_DOCUMENTATION.md` - Detailed test coverage tables and implementation
- `TEST_COVERAGE_SUMMARY.md` - Quick reference for test execution and statistics
- `POSTMAN_COLLECTION_README.md` - Complete Postman collection guide

#### **📁 Project Documentation**
- `docs/test-plan.md` - Detailed test strategy and planning
- `client/tests/selenium/README.md` - Selenium-specific documentation

#### **🔧 Configuration Files**
- `client/playwright.config.js` - Playwright configuration
- `client/vite.config.js` - Vite build configuration
- `.github/workflows/test.yml` - CI/CD pipeline configuration

## 🏗️ Project Structure

```
├── client/                          # React frontend
│   ├── src/                        # React components
│   ├── tests/                      # UI automation tests
│   │   ├── login.spec.js          # Playwright login tests
│   │   ├── todos.spec.js          # Playwright todo tests
│   │   ├── simple.spec.js         # Basic functionality tests
│   │   └── selenium/              # Selenium WebDriver tests
│   │       ├── login.test.js      # Selenium login automation
│   │       ├── todos.test.js      # Selenium todo automation
│   │       ├── test-runner.js     # Comprehensive test runner
│   │       ├── check-servers.js   # Server status verification
│   │       ├── check-frontend.js  # Frontend accessibility
│   │       └── README.md          # Selenium documentation
│   ├── playwright-report/          # Playwright HTML reports
│   ├── test-results/              # Playwright test artifacts
│   └── package.json
├── server/                         # Node.js backend
│   ├── src/                       # Express server code
│   ├── tests/                     # API tests
│   │   ├── auth.test.js          # Authentication API tests
│   │   └── todos.test.js         # Todo management API tests
│   └── package.json
├── docs/                          # Documentation
│   └── test-plan.md              # Detailed test strategy
├── .github/                       # CI/CD workflows
│   └── workflows/
│       └── test.yml              # GitHub Actions pipeline
├── postman_collection.json        # Postman API test collection
├── POSTMAN_COLLECTION_README.md   # Postman documentation
├── TEST_AUTOMATION_DOCUMENTATION.md # Comprehensive test docs
├── TEST_COVERAGE_SUMMARY.md       # Test coverage summary
└── package.json                   # Root package.json
```

## 🚀 Running Tests

### **UI Tests (Playwright)**
```bash
# Run all Playwright tests
npm run test:ui

# Run with specific browser
npx playwright test --project=chromium

# Run with HTML report
npx playwright test --reporter=html

# View HTML report
npx playwright show-report
```

### **Selenium Tests**
```bash
# Run all Selenium tests
npm run test:selenium

# Run with headed browser
npm run test:selenium:headed

# Run comprehensive test suite
npm run test:comprehensive

# Debug Selenium tests
npm run test:selenium:debug
```

### **API Tests (Supertest)**
```bash
# Run all API tests
npm run test:api

# Run with coverage
npm run test:coverage

# Run specific test file
npm run test:api -- tests/auth.test.js
```

### **Postman Tests**
```bash
# Install Newman (Postman CLI)
npm install -g newman

# Run Postman collection
newman run postman_collection.json

# Run with HTML report
newman run postman_collection.json --reporter-html-export report.html

# Run with detailed HTML extra report (recommended)
newman run "postman_collection.json" ^
  --iteration-count 10 ^
  --reporters cli,htmlextra ^
  --reporter-htmlextra-export "newman-report.html"

# Install HTML extra reporter (if not installed)
npm install -g newman-reporter-htmlextra
```

### **All Tests**
```bash
# Run complete test suite
npm test

# Run with coverage
npm run test:coverage
```

## 📈 Test Reports & Artifacts

### **Generated Reports**
- **Playwright HTML Reports**: `client/playwright-report/`
- **Test Results**: `client/test-results/` (screenshots, videos, traces)
- **Coverage Reports**: `coverage/` (after running coverage tests)
- **Postman Reports**: Generated via Newman CLI
  - **HTML Extra Reports**: `newman-report.html` (detailed interactive reports)
  - **Basic HTML Reports**: `report.html` (standard Newman reports)

### **Report Features**
- **Interactive HTML reports** with detailed test logs
- **Screenshots and videos** of test execution
- **Performance metrics** and timing information
- **Error details** with stack traces
- **Cross-browser results** comparison

## 🔄 CI/CD Integration

### **GitHub Actions Workflow** (`.github/workflows/test.yml`)
Automatically runs on every push/PR:
- ✅ **Unit tests** (Jest)
- ✅ **API tests** (Supertest)
- ✅ **UI automation** (Playwright)
- ✅ **Code coverage** reporting
- ✅ **Test artifacts** preservation
- ✅ **Cross-platform** testing (Windows, Linux, macOS)

### **Workflow Features**
- **Parallel execution** for faster results
- **Artifact upload** for test reports
- **Coverage reporting** with thresholds
- **Matrix testing** across Node.js versions
- **Automatic notifications** on test failures

## 🛠️ Technologies Used

### **Frontend**
- React 18 with Hooks
- Vite (fast build tool)
- Tailwind CSS (utility-first styling)
- React Router (navigation)

### **Backend**
- Node.js with Express.js
- JWT authentication (jsonwebtoken)
- Input validation (express-validator)
- Security middleware (helmet, cors)

### **Testing Stack**
- **UI Automation**: Playwright (cross-browser) + Selenium WebDriver (Chrome)
- **API Testing**: Supertest + Jest
- **Coverage**: Istanbul/nyc
- **CI/CD**: GitHub Actions
- **API Collection**: Postman + Newman

## 🔐 Default Credentials

- **Username**: `admin`
- **Password**: `password123`

## 🌐 API Endpoints

### **Authentication**
- `POST /api/auth/login` - User authentication
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - User logout

### **Todo Management**
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## 📚 Documentation Index

### **📖 Main Guides**
- `README.md` - Complete project overview and setup
- `TEST_AUTOMATION_DOCUMENTATION.md` - Detailed test coverage and implementation
- `TEST_COVERAGE_SUMMARY.md` - Quick test execution reference
- `POSTMAN_COLLECTION_README.md` - Postman collection usage guide

### **📁 Technical Documentation**
- `docs/test-plan.md` - Comprehensive test strategy
- `client/tests/selenium/README.md` - Selenium-specific documentation

### **🔧 Configuration**
- `client/playwright.config.js` - Playwright settings
- `client/vite.config.js` - Vite configuration
- `.github/workflows/test.yml` - CI/CD pipeline

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass (UI + API)
5. Update documentation as needed
6. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning and testing purposes.

---

**🎯 This project demonstrates comprehensive automated testing with multiple frameworks, detailed documentation, and CI/CD integration!** 