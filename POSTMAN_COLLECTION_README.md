# 📮 Postman Collection for Todo App API Testing

## 🎯 **Collection Overview**

This Postman collection provides **comprehensive API testing** for the Todo App backend, covering all endpoints with **positive and negative test cases**.

### **📋 Collection Features**

✅ **Complete CRUD Operations** - Create, Read, Update, Delete todos  
✅ **Authentication Testing** - Login, logout, token validation  
✅ **Positive Test Cases** - Valid data scenarios  
✅ **Negative Test Cases** - Invalid data, error handling  
✅ **Automated Token Management** - Automatic token extraction and reuse  
✅ **Comprehensive Assertions** - Status codes, response structure, data validation  

---

## 🚀 **Quick Start**

### **Step 1: Import Collection**
1. Open **Postman**
2. Click **Import** button
3. Select the `postman_collection.json` file
4. Click **Import**

### **Step 2: Set Environment Variables**
The collection uses these variables:
- `base_url`: `http://localhost:5000`
- `auth_token`: (automatically set after login)
- `todo_id`: (automatically set from responses)

### **Step 3: Start Backend Server**
```bash
# From root directory
npm run server
```

### **Step 4: Run Tests**
1. Open the collection in Postman
2. Click **Run Collection**
3. Select all tests or specific folders
4. Click **Run**

---

## 📊 **Test Coverage Matrix**

### **Authentication Endpoints**

| Endpoint | Method | Test Case | Status Code | Description |
|----------|--------|-----------|-------------|-------------|
| **POST /api/auth/login** | Login | Valid Credentials | 200 | ✅ admin/password123 |
| **POST /api/auth/login** | Login | Invalid Credentials | 401 | ✅ Wrong username/password |
| **POST /api/auth/login** | Login | Missing Username | 400 | ✅ Validation error |
| **POST /api/auth/login** | Login | Missing Password | 400 | ✅ Validation error |
| **GET /api/auth/me** | User Info | Valid Token | 200 | ✅ Authenticated user data |
| **GET /api/auth/me** | User Info | Invalid Token | 401 | ✅ Token validation |
| **POST /api/auth/logout** | Logout | Valid Token | 200 | ✅ Successful logout |

### **Todo Management Endpoints**

| Endpoint | Method | Test Case | Status Code | Description |
|----------|--------|-----------|-------------|-------------|
| **GET /api/todos** | Get All | Authenticated User | 200 | ✅ Get user's todos |
| **GET /api/todos** | Get All | Unauthenticated | 401 | ✅ Access control |
| **POST /api/todos** | Create | Valid Todo | 201 | ✅ Full todo data |
| **POST /api/todos** | Create | Missing Title | 400 | ✅ Validation error |
| **POST /api/todos** | Create | Minimal Data | 201 | ✅ Title only |
| **PUT /api/todos/:id** | Update | Valid Update | 200 | ✅ Update todo |
| **PUT /api/todos/:id** | Update | Todo Not Found | 404 | ✅ Error handling |
| **DELETE /api/todos/:id** | Delete | Valid Delete | 200 | ✅ Delete todo |
| **DELETE /api/todos/:id** | Delete | Todo Not Found | 404 | ✅ Error handling |
| **DELETE /api/todos/:id** | Delete | Unauthenticated | 401 | ✅ Access control |

---

## 🧪 **Test Scenarios Details**

### **1. POST /api/auth/login - Valid Credentials**

**Request:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com"
  }
}
```

**Tests:**
- ✅ Status code is 200
- ✅ Response has token property
- ✅ Response has user data
- ✅ Token is automatically saved for other requests

### **2. POST /api/auth/login - Invalid Credentials**

**Request:**
```json
{
  "username": "wronguser",
  "password": "wrongpass"
}
```

**Expected Response:**
```json
{
  "error": "Invalid credentials"
}
```

**Tests:**
- ✅ Status code is 401
- ✅ Error message is correct

### **3. GET /api/todos - Authenticated User**

**Headers:**
```
Authorization: Bearer {{auth_token}}
```

**Expected Response:**
```json
{
  "todos": [
    {
      "id": 1,
      "title": "Learn React Testing",
      "description": "Study Playwright and testing frameworks",
      "completed": false,
      "userId": 1,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

**Tests:**
- ✅ Status code is 200
- ✅ Response has todos array
- ✅ Response has count property
- ✅ First todo ID is saved for other tests

### **4. POST /api/todos - Valid Todo**

**Request:**
```json
{
  "title": "Test Todo",
  "description": "This is a test todo",
  "completed": false
}
```

**Expected Response:**
```json
{
  "todo": {
    "id": 3,
    "title": "Test Todo",
    "description": "This is a test todo",
    "completed": false,
    "userId": 1,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Tests:**
- ✅ Status code is 201
- ✅ Response has todo object
- ✅ Todo data is correct
- ✅ New todo ID is saved

### **5. PUT /api/todos/:id - Valid Update**

**Request:**
```json
{
  "title": "Updated Todo Title",
  "description": "Updated description",
  "completed": true
}
```

**Expected Response:**
```json
{
  "todo": {
    "id": 1,
    "title": "Updated Todo Title",
    "description": "Updated description",
    "completed": true,
    "userId": 1,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Tests:**
- ✅ Status code is 200
- ✅ Todo updated correctly

### **6. DELETE /api/todos/:id - Valid Delete**

**Expected Response:**
```json
{
  "message": "Todo deleted successfully"
}
```

**Tests:**
- ✅ Status code is 200
- ✅ Delete message is correct

---

## 🔧 **Collection Variables**

### **Automatic Variables**
- `auth_token`: Set automatically after successful login
- `todo_id`: Set automatically from GET /api/todos response

### **Manual Variables**
- `base_url`: Set to `http://localhost:5000`

### **Variable Usage**
```javascript
// In request headers
Authorization: Bearer {{auth_token}}

// In request URLs
{{base_url}}/api/todos/{{todo_id}}
```

---

## 🎯 **Running Tests**

### **Method 1: Run Entire Collection**
1. Open collection in Postman
2. Click **Run Collection**
3. Select all tests
4. Click **Run**

### **Method 2: Run by Folder**
1. Right-click on folder (Authentication/Todo Management)
2. Select **Run Folder**
3. Click **Run**

### **Method 3: Run Individual Tests**
1. Open specific test
2. Click **Send**
3. View results in **Test Results** tab

### **Method 4: Newman CLI**
```bash
# Install Newman
npm install -g newman

# Run collection
newman run postman_collection.json

# Run with environment
newman run postman_collection.json -e environment.json

# Run with detailed output
newman run postman_collection.json --reporter-html-export report.html
```

---

## 📊 **Expected Test Results**

### **Successful Run**
```
✅ POST /api/auth/login - Valid Credentials (200)
✅ POST /api/auth/login - Invalid Credentials (401)
✅ POST /api/auth/login - Missing Username (400)
✅ POST /api/auth/login - Missing Password (400)
✅ GET /api/auth/me - Valid Token (200)
✅ GET /api/auth/me - Invalid Token (401)
✅ POST /api/auth/logout - Valid Token (200)
✅ GET /api/todos - Authenticated User (200)
✅ GET /api/todos - Unauthenticated (401)
✅ POST /api/todos - Valid Todo (201)
✅ POST /api/todos - Missing Title (400)
✅ POST /api/todos - Minimal Data (201)
✅ PUT /api/todos/:id - Valid Update (200)
✅ PUT /api/todos/:id - Todo Not Found (404)
✅ DELETE /api/todos/:id - Valid Delete (200)
✅ DELETE /api/todos/:id - Todo Not Found (404)
✅ DELETE /api/todos/:id - Unauthenticated (401)
```

### **Test Statistics**
- **Total Tests**: 17
- **Authentication Tests**: 7
- **Todo Management Tests**: 10
- **Positive Test Cases**: 9
- **Negative Test Cases**: 8

---

## 🔍 **Troubleshooting**

### **Common Issues**

#### **1. Connection Refused**
```
Error: connect ECONNREFUSED 127.0.0.1:5000
```
**Solution:** Start the backend server with `npm run server`

#### **2. Authentication Failed**
```
Error: 401 Unauthorized
```
**Solution:** Run the login test first to get a valid token

#### **3. Todo Not Found**
```
Error: 404 Todo not found
```
**Solution:** Create a todo first, then use its ID for update/delete tests

#### **4. Validation Errors**
```
Error: 400 Validation failed
```
**Solution:** Check request body format and required fields

### **Debug Steps**
1. **Check Server Status**: Ensure backend is running on port 5000
2. **Verify Variables**: Check that `base_url` is set correctly
3. **Run Login First**: Always run authentication tests before todo tests
4. **Check Token**: Verify `auth_token` is set after login
5. **Review Response**: Check actual response vs expected response

---

## 📈 **Advanced Features**

### **Pre-request Scripts**
```javascript
// Automatically set Authorization header
if (pm.environment.get("auth_token")) {
    pm.request.headers.add({
        key: "Authorization",
        value: "Bearer " + pm.environment.get("auth_token")
    });
}
```

### **Test Scripts**
```javascript
// Comprehensive response validation
pm.test("Response structure validation", function () {
    const response = pm.response.json();
    pm.expect(response).to.have.property('token');
    pm.expect(response.token).to.be.a('string');
    pm.expect(response.token.length).to.be.greaterThan(10);
});
```

### **Environment Management**
```javascript
// Save token after successful login
if (pm.response.code === 200) {
    const response = pm.response.json();
    pm.environment.set("auth_token", response.token);
}
```

---

## 🎉 **Benefits**

✅ **Comprehensive Coverage** - All endpoints and scenarios tested  
✅ **Automated Token Management** - No manual token handling  
✅ **Positive & Negative Cases** - Complete error testing  
✅ **Easy to Use** - Import and run immediately  
✅ **CI/CD Ready** - Works with Newman for automation  
✅ **Detailed Assertions** - Thorough response validation  
✅ **Professional Quality** - Production-ready test suite  

**This Postman collection provides complete API testing coverage for your Todo App backend!** 🚀 