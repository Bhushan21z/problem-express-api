const express = require('express');
const app = express();
const userRoutes = require('./routes/users');

app.use(express.json());

app.get('/home', (req, res) => {
  res.json({ message: 'Welcome to Express API' });
});

app.use('/users', userRoutes);

module.exports = app;
