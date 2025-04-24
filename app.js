const express = require('express');
const app = express();
const userRoutes = require('./routes/users');

app.use(express.json());

app.get('/home', (req, res) => {
  res.json({ message: 'Welcome to Express API' });
});

app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
