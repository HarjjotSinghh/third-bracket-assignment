import axios from 'axios';
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE'; payload: { error: string } }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

const getInitialAuthState = (): AuthState => {
  const token = localStorage.getItem('token');
  // We don't know user yet, so user remains null, but loading should start if token exists
  return {
    user: null,
    token: token,
    isLoading: !!token,
    isAuthenticated: false,
    error: null,
  };
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload.error,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: ReactNode;
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, getInitialAuthState());
  const navigate = useNavigate();

  // Only run token check on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !state.isAuthenticated) {
      verifyToken(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyToken = async (tokenParam?: string | null) => {
    const token = tokenParam || state.token || localStorage.getItem('token');
    if (!token) {
      dispatch({ type: 'LOGOUT' });
      return;
    }
    dispatch({ type: 'LOGIN_START' });
    try {
      // @ts-expect-error - import.meta.env is not defined
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (
        response.status === 200 &&
        response.data?.data?.user &&
        response.data?.data?.token
      ) {
        const { user, token: newToken } = response.data.data;
        localStorage.setItem('token', newToken);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user,
            token: newToken,
          },
        });
      } else {
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
      }
    } catch (error: unknown) {
      console.error('Token verification error:', error);
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
    }
  };

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // @ts-expect-error - import.meta.env is not defined
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      const data = response.data;

      if (response.status === 200 && data.user && data.token) {
        localStorage.setItem('token', data.token);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: data.user,
            token: data.token,
          },
        });
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        // Set error to returned message even if login succeeded
        dispatch({ type: 'LOGIN_FAILURE', payload: { error: data.message || 'Login failed' } });
        toast.error(data.message || 'Login failed');
      }
    } catch (error: unknown) {
      console.error('Login error:', error);
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Network error. Please try again.'
        : 'An unexpected error occurred.';
      dispatch({ type: 'LOGIN_FAILURE', payload: { error: errorMessage } });
      toast.error(errorMessage);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // @ts-expect-error - import.meta.env is not defined
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
        name,
        email,
        password,
      });

      const data = response.data;

      if (response.status === 200 && data.data?.user && data.data?.token) {
        localStorage.setItem('token', data.data.token);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: data.data.user,
            token: data.data.token,
          },
        });
        toast.success('Registration successful!');
        navigate('/dashboard');
      } else {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: { error: data.error?.message || 'Registration failed' },
        });
        toast.error(data.error?.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Network error. Please try again.'
        : 'An unexpected error occurred.';
      dispatch({ type: 'LOGIN_FAILURE', payload: { error: errorMessage } });
      toast.error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError,
  };

  // Remove debug logs for production, but can log for troubleshooting
  // console.log('AuthProvider value', value);
  // console.log('AuthProvider state', state);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;