# Todo App with Automated Testing

A simple Todo application with React frontend and Node.js backend, featuring comprehensive automated testing.

## Features

- **Frontend**: React application with user authentication and CRUD operations for todos
- **Backend**: Node.js/Express API with JWT authentication
- **Testing**: Comprehensive test suite including UI automation and API testing

## Quick Setup (1-2 minutes)

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

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

## Application Overview

### Frontend (React)
- User authentication (login/logout)
- Create, read, update, delete todos
- Responsive design with modern UI
- Real-time updates

### Backend (Node.js/Express)
- RESTful API with JWT authentication
- MongoDB database (in-memory for simplicity)
- CRUD operations for todos
- Input validation and error handling

## Testing Strategy

### 1. UI Automation (Playwright)
- **Login scenarios**: Valid/invalid credentials
- **CRUD operations**: Create, edit, delete todos
- **Data validation**: Assert expected data presence
- **Cross-browser testing**: Chrome, Firefox, Safari

### 2. API Testing (Supertest)
- **Authentication**: Login/logout endpoints
- **CRUD operations**: All todo endpoints
- **Error handling**: Invalid inputs, unauthorized access
- **Data validation**: Response structure and content

### 3. Test Coverage
- **Frontend**: 90%+ component coverage
- **Backend**: 95%+ API endpoint coverage
- **Integration**: End-to-end user workflows

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   ├── tests/             # UI automation tests
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   ├── tests/             # API tests
│   └── package.json
├── docs/                   # Test documentation
├── .github/               # CI/CD workflows
└── package.json           # Root package.json
```

## Running Tests

### UI Tests (Playwright)
```bash
npm run test:ui
```

### API Tests (Supertest)
```bash
npm run test:api
```

### All Tests
```bash
npm test
```

### Test Reports
- HTML coverage reports: `coverage/`
- Playwright reports: `test-results/`
- API test results: Console output

## CI/CD Integration

GitHub Actions workflow automatically runs:
- Unit tests
- API tests
- UI automation tests
- Code coverage reporting
- Test result artifacts

## Technologies Used

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- JWT authentication
- MongoDB (in-memory)

### Testing
- **UI**: Playwright (cross-browser automation)
- **API**: Supertest + Jest
- **Coverage**: Istanbul/nyc
- **CI/CD**: GitHub Actions

## Default Credentials

- **Username**: `admin`
- **Password**: `password123`

## API Endpoints

- `POST /api/auth/login` - User authentication
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## License

MIT License - feel free to use this project for learning and testing purposes. 