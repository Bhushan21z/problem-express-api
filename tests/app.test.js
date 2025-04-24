const request = require('supertest');
const app = require('../app');

describe('Express API Routes', () => {
  it('should return welcome message on /home', async () => {
    const res = await request(app).get('/home');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Welcome to Express API' });
  });

  it('should return empty users array', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('should add a new user with valid data', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'John Doe', age: 25 });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user).toEqual({ name: 'John Doe', age: 25 });
  });

  it('should return 400 if name is missing', async () => {
    const res = await request(app).post('/users').send({ age: 30 });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Name is required');
  });

  it('should return 400 if age is not a number', async () => {
    const res = await request(app).post('/users').send({ name: 'Alice', age: 'twenty' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Age must be a number');
  });
});
