const express = require('express');
const { body, param, validationResult } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// In-memory todo storage (in production, use a database)
let todos = [
  {
    id: 1,
    title: 'Learn React Testing',
    description: 'Study Playwright and testing frameworks',
    completed: false,
    userId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Build API Tests',
    description: 'Create comprehensive API test suite',
    completed: true,
    userId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Apply authentication to all todo routes
router.use(authenticateToken);

// GET /api/todos - Get all todos for the authenticated user
router.get('/', (req, res) => {
  try {
    const userTodos = todos.filter(todo => todo.userId === req.user.userId);
    res.json({
      todos: userTodos,
      count: userTodos.length
    });
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// GET /api/todos/:id - Get a specific todo
router.get('/:id', [
  param('id').isInt().withMessage('Todo ID must be a number')
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const todoId = parseInt(req.params.id);
    const todo = todos.find(t => t.id === todoId && t.userId === req.user.userId);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json({ todo });
  } catch (error) {
    console.error('Error fetching todo:', error);
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
});

// POST /api/todos - Create a new todo
router.post('/', [
  body('title').notEmpty().trim().withMessage('Title is required'),
  body('description').optional().trim(),
  body('completed').optional().isBoolean().withMessage('Completed must be a boolean')
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { title, description = '', completed = false } = req.body;
    
    const newTodo = {
      id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
      title: title.trim(),
      description: description.trim(),
      completed,
      userId: req.user.userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    todos.push(newTodo);

    res.status(201).json({
      message: 'Todo created successfully',
      todo: newTodo
    });
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// PUT /api/todos/:id - Update a todo
router.put('/:id', [
  param('id').isInt().withMessage('Todo ID must be a number'),
  body('title').optional().notEmpty().trim().withMessage('Title cannot be empty'),
  body('description').optional().trim(),
  body('completed').optional().isBoolean().withMessage('Completed must be a boolean')
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === todoId && t.userId === req.user.userId);

    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const { title, description, completed } = req.body;
    const updatedTodo = {
      ...todos[todoIndex],
      ...(title !== undefined && { title: title.trim() }),
      ...(description !== undefined && { description: description.trim() }),
      ...(completed !== undefined && { completed }),
      updatedAt: new Date().toISOString()
    };

    todos[todoIndex] = updatedTodo;

    res.json({
      message: 'Todo updated successfully',
      todo: updatedTodo
    });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// DELETE /api/todos/:id - Delete a todo
router.delete('/:id', [
  param('id').isInt().withMessage('Todo ID must be a number')
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === todoId && t.userId === req.user.userId);

    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const deletedTodo = todos[todoIndex];
    todos.splice(todoIndex, 1);

    res.json({
      message: 'Todo deleted successfully',
      todo: deletedTodo
    });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// PATCH /api/todos/:id/toggle - Toggle todo completion status
router.patch('/:id/toggle', [
  param('id').isInt().withMessage('Todo ID must be a number')
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === todoId && t.userId === req.user.userId);

    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todos[todoIndex].completed = !todos[todoIndex].completed;
    todos[todoIndex].updatedAt = new Date().toISOString();

    res.json({
      message: 'Todo toggled successfully',
      todo: todos[todoIndex]
    });
  } catch (error) {
    console.error('Error toggling todo:', error);
    res.status(500).json({ error: 'Failed to toggle todo' });
  }
});

module.exports = router; 