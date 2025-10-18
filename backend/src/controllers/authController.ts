import { Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { StringValue } from 'ms';
import User, { IUser } from '../models/User';
import { AuthRequest } from '../middleware/auth';

interface RegisterRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

// Generate JWT token
const generateToken = (userId: string): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }

  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN || '24h') as StringValue,
  };

  return jwt.sign({ userId }, jwtSecret, options);
};

// Register new user
export const register = async (req: RegisterRequest, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(409).json({
        success: false,
        error: {
          code: 'DUPLICATE_RESOURCE',
          message: 'Email already exists',
        },
      });
      return;
    }

    // Create new user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password,
    });

    await user.save();

    // Generate token
    const token = generateToken((user._id as any).toString());

    // Return user data without password
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userResponse,
        token,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
      },
    });
  }
};

// Login user
export const login = async (req: LoginRequest, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(401).json({
        success: false,
        error: {
          code: 'AUTHENTICATION_REQUIRED',
          message: 'Invalid credentials',
        },
      });
      return;
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        error: {
          code: 'AUTHENTICATION_REQUIRED',
          message: 'Invalid credentials',
        },
      });
      return;
    }

    // Generate token
    const token = generateToken((user._id as any).toString());

    // Return user data without password
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: userResponse,
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
      },
    });
  }
};

// Logout user
export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // In a stateless JWT implementation, logout is handled client-side
    // by removing the token from storage. However, we provide this endpoint
    // for consistency and potential future token blacklisting.

    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
      },
    });
  }
};

// Verify token and get current user
export const verifyToken = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: {
          code: 'AUTHENTICATION_REQUIRED',
          message: 'Invalid token',
        },
      });
      return;
    }

    const userResponse = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    };

    // Generate new token to extend session
    const token = generateToken((req.user!._id as any).toString());

    res.status(200).json({
      success: true,
      data: {
        user: userResponse,
        token,
      },
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
      },
    });
  }
};