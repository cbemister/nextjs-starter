import { IAuthService, User, AuthResult } from './auth-service';

export class RealAuthService implements IAuthService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
  }

  async login(email: string, password: string): Promise<AuthResult> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Include cookies for session management
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Login failed'
        };
      }

      // Store token if provided
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
      }

      return {
        success: true,
        user: data.user
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'Network error occurred'
      };
    }
  }

  async register(email: string, password: string, name?: string): Promise<AuthResult> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Registration failed'
        };
      }

      // Store token if provided
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
      }

      return {
        success: true,
        user: data.user
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: 'Network error occurred'
      };
    }
  }

  async logout(): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clean up local storage
      localStorage.removeItem('auth_token');
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return null;

      const response = await fetch(`${this.baseUrl}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        // Token might be expired or invalid
        localStorage.removeItem('auth_token');
        return null;
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Error getting current user:', error);
      localStorage.removeItem('auth_token');
      return null;
    }
  }

  async refreshToken(): Promise<string | null> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        localStorage.removeItem('auth_token');
        return null;
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
        return data.token;
      }

      return null;
    } catch (error) {
      console.error('Token refresh error:', error);
      localStorage.removeItem('auth_token');
      return null;
    }
  }
}

