const request = require('supertest');
const app = require('../src/server');

describe('Todos API Tests', () => {
  let authToken;
  let createdTodoId;

  beforeAll(async () => {
    // Login to get authentication token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'admin',
        password: 'password123'
      });

    authToken = loginResponse.body.token;
  });

  describe('GET /api/todos', () => {
    it('should get all todos for authenticated user', async () => {
      const response = await request(app)
        .get('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('todos');
      expect(response.body).toHaveProperty('count');
      expect(Array.isArray(response.body.todos)).toBe(true);
      expect(response.body.count).toBeGreaterThanOrEqual(0);
    });

    it('should reject request without authentication token', async () => {
      const response = await request(app)
        .get('/api/todos')
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Access token required');
    });

    it('should reject request with invalid token', async () => {
      const response = await request(app)
        .get('/api/todos')
        .set('Authorization', 'Bearer invalid-token')
        .expect(403);

      expect(response.body).toHaveProperty('error', 'Invalid or expired token');
    });
  });

  describe('GET /api/todos/:id', () => {
    it('should get a specific todo by ID', async () => {
      const response = await request(app)
        .get('/api/todos/1')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('todo');
      expect(response.body.todo).toHaveProperty('id', 1);
      expect(response.body.todo).toHaveProperty('title');
      expect(response.body.todo).toHaveProperty('description');
      expect(response.body.todo).toHaveProperty('completed');
    });

    it('should return 404 for non-existent todo', async () => {
      const response = await request(app)
        .get('/api/todos/999')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Todo not found');
    });

    it('should reject invalid todo ID format', async () => {
      const response = await request(app)
        .get('/api/todos/abc')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation failed');
    });
  });

  describe('POST /api/todos', () => {
    it('should create a new todo with valid data', async () => {
      const newTodo = {
        title: 'Test Todo',
        description: 'This is a test todo',
        completed: false
      };

      const response = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newTodo)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Todo created successfully');
      expect(response.body).toHaveProperty('todo');
      expect(response.body.todo).toHaveProperty('id');
      expect(response.body.todo).toHaveProperty('title', newTodo.title);
      expect(response.body.todo).toHaveProperty('description', newTodo.description);
      expect(response.body.todo).toHaveProperty('completed', newTodo.completed);
      expect(response.body.todo).toHaveProperty('userId');
      expect(response.body.todo).toHaveProperty('createdAt');
      expect(response.body.todo).toHaveProperty('updatedAt');

      createdTodoId = response.body.todo.id;
    });

    it('should create todo with minimal required data', async () => {
      const newTodo = {
        title: 'Minimal Todo'
      };

      const response = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newTodo)
        .expect(201);

      expect(response.body.todo).toHaveProperty('title', 'Minimal Todo');
      expect(response.body.todo).toHaveProperty('description', '');
      expect(response.body.todo).toHaveProperty('completed', false);
    });

    it('should reject todo creation without title', async () => {
      const newTodo = {
        description: 'Todo without title'
      };

      const response = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newTodo)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation failed');
    });

    it('should reject todo creation with empty title', async () => {
      const newTodo = {
        title: '',
        description: 'Todo with empty title'
      };

      const response = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newTodo)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation failed');
    });

    it('should reject todo creation without authentication', async () => {
      const newTodo = {
        title: 'Unauthorized Todo'
      };

      const response = await request(app)
        .post('/api/todos')
        .send(newTodo)
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Access token required');
    });
  });

  describe('PUT /api/todos/:id', () => {
    it('should update an existing todo', async () => {
      const updateData = {
        title: 'Updated Todo Title',
        description: 'Updated description',
        completed: true
      };

      const response = await request(app)
        .put('/api/todos/1')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Todo updated successfully');
      expect(response.body.todo).toHaveProperty('title', updateData.title);
      expect(response.body.todo).toHaveProperty('description', updateData.description);
      expect(response.body.todo).toHaveProperty('completed', updateData.completed);
    });

    it('should update only provided fields', async () => {
      const updateData = {
        completed: false
      };

      const response = await request(app)
        .put('/api/todos/1')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.todo).toHaveProperty('completed', false);
      // Other fields should remain unchanged
      expect(response.body.todo).toHaveProperty('title');
      expect(response.body.todo).toHaveProperty('description');
    });

    it('should reject update with empty title', async () => {
      const updateData = {
        title: ''
      };

      const response = await request(app)
        .put('/api/todos/1')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation failed');
    });

    it('should return 404 for non-existent todo', async () => {
      const updateData = {
        title: 'Non-existent Todo'
      };

      const response = await request(app)
        .put('/api/todos/999')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Todo not found');
    });
  });

  describe('DELETE /api/todos/:id', () => {
    it('should delete an existing todo', async () => {
      const response = await request(app)
        .delete('/api/todos/2')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Todo deleted successfully');
      expect(response.body).toHaveProperty('todo');
      expect(response.body.todo).toHaveProperty('id', 2);
    });

    it('should return 404 for non-existent todo', async () => {
      const response = await request(app)
        .delete('/api/todos/999')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Todo not found');
    });

    it('should reject invalid todo ID format', async () => {
      const response = await request(app)
        .delete('/api/todos/abc')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation failed');
    });
  });

  describe('PATCH /api/todos/:id/toggle', () => {
    it('should toggle todo completion status', async () => {
      // First, get current status
      const getResponse = await request(app)
        .get('/api/todos/1')
        .set('Authorization', `Bearer ${authToken}`);

      const currentStatus = getResponse.body.todo.completed;

      // Toggle the status
      const response = await request(app)
        .patch('/api/todos/1/toggle')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Todo toggled successfully');
      expect(response.body.todo).toHaveProperty('completed', !currentStatus);
    });

    it('should return 404 for non-existent todo', async () => {
      const response = await request(app)
        .patch('/api/todos/999/toggle')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Todo not found');
    });
  });
}); 