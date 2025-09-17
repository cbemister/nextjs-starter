'use client';

import { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';
import { AuthState, User, AuthSession, LoginCredentials, RegisterCredentials, AuthError } from '@/types/auth';
import { authService } from '@/lib/auth/AuthService';

// Auth actions
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; session: AuthSession } }
  | { type: 'AUTH_ERROR'; payload: AuthError }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'AUTH_UPDATE_USER'; payload: User }
  | { type: 'AUTH_CLEAR_ERROR' };

// Initial state
const initialState: AuthState = {
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
};

// Auth reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        session: action.payload.session,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      };
    
    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        session: null,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        session: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      };
    
    case 'AUTH_UPDATE_USER':
      return {
        ...state,
        user: action.payload,
        session: state.session ? { ...state.session, user: action.payload } : null,
      };
    
    case 'AUTH_CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    
    default:
      return state;
  }
}

// Auth context type
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
  refreshSession: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        dispatch({ type: 'AUTH_START' });
        
        const session = await authService.getSession();
        if (session) {
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: { user: session.user, session },
          });
        } else {
          dispatch({ type: 'AUTH_LOGOUT' });
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        dispatch({
          type: 'AUTH_ERROR',
          payload: {
            code: 'INIT_ERROR',
            message: 'Failed to initialize authentication',
          },
        });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      const session = await authService.login(credentials);
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: session.user, session },
      });
    } catch (error) {
      const authError = error instanceof Error 
        ? { code: 'LOGIN_ERROR', message: error.message }
        : { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred' };
      
      dispatch({ type: 'AUTH_ERROR', payload: authError });
      throw error;
    }
  };

  // Register function
  const register = async (credentials: RegisterCredentials) => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      const session = await authService.register(credentials);
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: session.user, session },
      });
    } catch (error) {
      const authError = error instanceof Error 
        ? { code: 'REGISTER_ERROR', message: error.message }
        : { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred' };
      
      dispatch({ type: 'AUTH_ERROR', payload: authError });
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
      dispatch({ type: 'AUTH_LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if service call fails
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  // Update user function
  const updateUser = async (updates: Partial<User>) => {
    try {
      const updatedUser = await authService.updateUser(updates);
      dispatch({ type: 'AUTH_UPDATE_USER', payload: updatedUser });
    } catch (error) {
      const authError = error instanceof Error 
        ? { code: 'UPDATE_ERROR', message: error.message }
        : { code: 'UNKNOWN_ERROR', message: 'Failed to update user' };
      
      dispatch({ type: 'AUTH_ERROR', payload: authError });
      throw error;
    }
  };

  // Change password function
  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      await authService.changePassword(currentPassword, newPassword);
    } catch (error) {
      const authError = error instanceof Error 
        ? { code: 'PASSWORD_ERROR', message: error.message }
        : { code: 'UNKNOWN_ERROR', message: 'Failed to change password' };
      
      dispatch({ type: 'AUTH_ERROR', payload: authError });
      throw error;
    }
  };

  // Reset password function
  const resetPassword = async (email: string) => {
    try {
      await authService.resetPassword(email);
    } catch (error) {
      const authError = error instanceof Error 
        ? { code: 'RESET_ERROR', message: error.message }
        : { code: 'UNKNOWN_ERROR', message: 'Failed to reset password' };
      
      dispatch({ type: 'AUTH_ERROR', payload: authError });
      throw error;
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: 'AUTH_CLEAR_ERROR' });
  };

  // Refresh session function
  const refreshSession = async () => {
    try {
      const session = await authService.refreshSession();
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: session.user, session },
      });
    } catch (error) {
      const authError = error instanceof Error 
        ? { code: 'REFRESH_ERROR', message: error.message }
        : { code: 'UNKNOWN_ERROR', message: 'Failed to refresh session' };
      
      dispatch({ type: 'AUTH_ERROR', payload: authError });
      throw error;
    }
  };

  // Context value
  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateUser,
    changePassword,
    resetPassword,
    clearError,
    refreshSession,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

