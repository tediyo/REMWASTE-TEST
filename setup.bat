@echo off
echo 🚀 Setting up Todo App with Automated Testing...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v16 or higher.
    pause
    exit /b 1
)

echo ✅ Node.js version:
node --version

REM Install root dependencies
echo 📦 Installing root dependencies...
call npm install

REM Install server dependencies
echo 📦 Installing server dependencies...
cd server
call npm install
cd ..

REM Install client dependencies
echo 📦 Installing client dependencies...
cd client
call npm install
cd ..

REM Install Playwright browsers
echo 🌐 Installing Playwright browsers...
cd client
call npx playwright install --with-deps
cd ..

echo ✅ Setup complete!
echo.
echo 🎯 Next steps:
echo 1. Start the backend server: npm run server
echo 2. Start the frontend: npm run client
echo 3. Run all tests: npm test
echo.
echo 📚 For more information, see the README.md file
pause 