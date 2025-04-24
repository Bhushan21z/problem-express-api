const express = require('express');
const router = express.Router();

const users = [];

router.get('/', (req, res) => {
  res.json(users);
});

router.post('/', (req, res) => {
  const { name, age } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (typeof age !== 'number') {
    return res.status(400).json({ error: 'Age must be a number' });
  }

  const user = { name, age };
  users.push(user);
  res.json({ success: true, user });
});

module.exports = router;
