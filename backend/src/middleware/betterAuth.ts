import { Request, Response, NextFunction } from 'express';
import { auth } from '../lib/auth-express';

export interface BetterAuthRequest extends Request {
  user?: {
    id: string;
    name: string;
    email: string;
    image?: string;
    emailVerified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  };
}

export const authenticateBetterAuth = async (req: BetterAuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get the session from Better Auth
    const session = await auth.api.getSession({
      headers: req.headers as any,
    });

    if (!session || !session.user) {
      res.status(401).json({
        success: false,
        error: {
          code: 'AUTHENTICATION_REQUIRED',
          message: 'Authentication required',
        },
      });
      return;
    }

    // Attach user to request
    (req.user as any) = session.user;
    next();
  } catch (error) {
    console.error('Better Auth authentication error:', error);
    res.status(401).json({
      success: false,
      error: {
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication failed',
      },
    });
  }
};
