import express from 'express';
import {
  register,
  login,
  logout,
  verifyToken,
} from '../controllers/authController';
import { validate, validateUserRegistration, validateUserLogin } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Register new user
router.post('/register', validate(validateUserRegistration), register);

// Login user
router.post('/login', validate(validateUserLogin), login);

// Logout user
router.post('/logout', authenticateToken, logout);

// Verify token and get current user
router.get('/verify', authenticateToken, verifyToken);

export default router;