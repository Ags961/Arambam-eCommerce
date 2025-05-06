import { decodeToken } from '../utils/verifyToken.js';

/**
 * Middleware: Authenticates a regular user using JWT.
 */
const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please log in.',
      });
    }

    const decoded = decodeToken(token);

    // Attach userId to req.body for downstream use
    req.body.userId = decoded.id;

    next(); // ✅ User token is valid
  } catch (err) {
    console.error('authUser Error:', err.message);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please re-authenticate.',
    });
  }
};

export default authenticateUser;