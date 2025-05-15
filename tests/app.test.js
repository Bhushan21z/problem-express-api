const request = require('supertest');
const app = require('../app');

describe('User Management API', () => {
  let userId;

  it('should create a user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'John', age: 30 });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('John');
    expect(res.body.age).toBe(30);
    userId = res.body.id;
  });

  it('should fail to create user with missing name', async () => {
    const res = await request(app).post('/users').send({ age: 25 });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Name is required');
  });

  it('should return all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should return a user by ID', async () => {
    const res = await request(app).get(`/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('John');
  });

  it('should update a user by ID', async () => {
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({ name: 'Johnny' });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Johnny');
  });

  it('should delete a user by ID', async () => {
    const res = await request(app).delete(`/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User deleted');
  });

  it('should return 404 for deleted user', async () => {
    const res = await request(app).get(`/users/${userId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('User not found');
  });
});
