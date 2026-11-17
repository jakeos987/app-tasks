const authService = require('./auth.service');

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = header.slice('Bearer '.length);
  try {
    req.user = authService.verify(token);
    next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
