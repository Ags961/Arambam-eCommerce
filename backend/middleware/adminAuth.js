import { decodeToken } from '../utils/verifyToken.js';

/**
 * Middleware: Confirms if request is from a valid admin user.
 */
const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Token not provided.',
      });
    }

    const decoded = decodeToken(token);

    if (!decoded.admin) {
      return res.status(403).json({
        success: false,
        message: 'Access forbidden. Admins only.',
      });
    }

    next(); // ✅ Token is valid and has admin flag
  } catch (err) {
    console.error('AdminAuth Error:', err.message);
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Invalid or expired token.',
    });
  }
};

export default adminAuth;