const jwt = require('jsonwebtoken');
const User = require('./models/User');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).send({ error: 'Authorization header is missing' });
  }

  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'Token is missing' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');  // Replace with your secret key
    console.log('Decoded token:', decoded);  // Debugging line

    const user = await User.findOne({ _id: decoded.userId });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (e) {
    console.error('Error verifying token:', e);  // Debugging line
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authMiddleware;