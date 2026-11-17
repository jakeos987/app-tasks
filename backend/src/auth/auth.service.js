const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error('JWT_SECRET is required');
}

const login = (username, password) => {
  if (username !== process.env.JWT_USER || password !== process.env.JWT_PASSWORD) {
    return null;
  }
  return jwt.sign({ username }, secret, { expiresIn: '1h' });
};

const verify = (token) => jwt.verify(token, secret);

module.exports = { login, verify };
