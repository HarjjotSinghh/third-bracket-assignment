import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authClient } from '../lib/auth-client';

// Define Better Auth error type
interface BetterAuthError {
  message: string;
  status?: number;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  image?: string;
  emailVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  // Use Better Auth's useSession hook
  const { data: session, isPending, error } = authClient.useSession();

  const user = session?.user || null;
  const isLoading = isPending;
  const isAuthenticated = !!user;
  const errorMessage = error?.message || null;

  const login = async (email: string, password: string) => {
    try {
      await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onRequest: () => {
            // Show loading state if needed
          },
          onSuccess: () => {
            toast.success('Login successful!');
            navigate('/dashboard');
          },
          onError: (ctx: { error: BetterAuthError }) => {
            toast.error(ctx.error.message || 'Login failed');
          },
        }
      );
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred during login.');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      await authClient.signUp.email(
        {
          email,
          password,
          name,
        },
        {
          onRequest: () => {
            // Show loading state if needed
          },
          onSuccess: () => {
            toast.success('Registration successful!');
            navigate('/dashboard');
          },
          onError: (ctx: { error: BetterAuthError }) => {
            toast.error(ctx.error.message || 'Registration failed');
          },
        }
      );
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An unexpected error occurred during registration.');
    }
  };

  const logout = async () => {
    try {
      await authClient.signOut(
        {},
        {
          onSuccess: () => {
            toast.success('Logged out successfully');
            navigate('/login');
          },
          onError: (ctx: { error: BetterAuthError }) => {
            toast.error(ctx.error.message || 'Logout failed');
          },
        }
      );
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('An unexpected error occurred during logout.');
    }
  };

  const clearError = () => {
    // Better Auth handles error clearing automatically
    // This is a placeholder for any additional error clearing logic
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    error: errorMessage,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;