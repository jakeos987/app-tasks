const authService = require('./auth.service');

const login = (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const token = authService.login(username, password);
  if (!token) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({ token });
};

module.exports = { login };
