import jwt from 'jsonwebtoken';

/**
 * Verifies a JWT and returns the decoded payload or throws an error.
 * @param {string} token 
 * @returns {object} decoded payload
 */
export const decodeToken = (token) => {
  if (!token) {
    throw new Error('Token missing');
  }

  return jwt.verify(token, process.env.JWT_SECRET);
};