import jwt from 'jsonwebtoken';

/**
 * Generate a user JWT with 7-day expiration.
 */
export const generateUserToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

/**
 * Generate an admin JWT with 1-day expiration.
 */
export const generateAdminToken = () => {
  return jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: '1d' });
};