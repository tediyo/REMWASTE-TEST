const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

// In-memory user storage (in production, use a database)
const users = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$10$vSTFgq9.JVG5I1AJ0olfLOk6dTIw32zhNuTyV9l.loHupYRmB3taq', // password123
    email: 'admin@example.com'
  }
];

// Login endpoint
router.post('/login', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors.array().map(err => ({
          param: err.path,
          msg: err.msg,
          value: err.value
        }))
      });
    }

    const { username, password } = req.body;

    // Find user
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout endpoint (client-side token removal)
router.post('/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});

// Get current user info
router.get('/me', (req, res) => {
  // This would typically use the auth middleware
  // For simplicity, we'll return a mock response
  res.json({
    user: {
      id: 1,
      username: 'admin',
      email: 'admin@example.com'
    }
  });
});

module.exports = router; 