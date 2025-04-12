
import jwt from 'jsonwebtoken';

// Middleware to check if user is authenticated
export const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
    req.user = verified;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};
