import { IAuthService, User, AuthResult } from './auth-service';

// Mock users for development/demo
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'demo@example.com',
    name: 'Demo User',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    email: 'admin@example.com',
    name: 'Admin User',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
];

const STORAGE_KEY = 'mock_auth_user';
const TOKEN_KEY = 'mock_auth_token';

export class MockAuthService implements IAuthService {
  private generateMockToken(user: User): string {
    // Generate a simple mock JWT-like token
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ 
      sub: user.id, 
      email: user.email, 
      name: user.name,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    }));
    const signature = btoa('mock_signature');
    
    return `${header}.${payload}.${signature}`;
  }

  private validateMockToken(token: string): User | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      
      const payload = JSON.parse(atob(parts[1]));
      
      // Check if token is expired
      if (payload.exp < Math.floor(Date.now() / 1000)) {
        return null;
      }
      
      // Find user by ID
      const user = MOCK_USERS.find(u => u.id === payload.sub);
      return user || null;
    } catch (error) {
      return null;
    }
  }

  async login(email: string, password: string): Promise<AuthResult> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find user by email
    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      return {
        success: false,
        error: 'User not found'
      };
    }

    // For demo purposes, accept any password for existing users
    // In a real app, you'd verify the password hash
    if (password.length < 6) {
      return {
        success: false,
        error: 'Password must be at least 6 characters'
      };
    }

    // Generate and store token
    const token = this.generateMockToken(user);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

    return {
      success: true,
      user
    };
  }

  async register(email: string, password: string, name?: string): Promise<AuthResult> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return {
        success: false,
        error: 'User already exists with this email'
      };
    }

    // Validate password
    if (password.length < 6) {
      return {
        success: false,
        error: 'Password must be at least 6 characters'
      };
    }

    // Create new user
    const newUser: User = {
      id: (MOCK_USERS.length + 1).toString(),
      email: email.toLowerCase(),
      name: name || email.split('@')[0],
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add to mock users (in a real app, this would be saved to database)
    MOCK_USERS.push(newUser);

    // Generate and store token
    const token = this.generateMockToken(newUser);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));

    return {
      success: true,
      user: newUser
    };
  }

  async logout(): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(STORAGE_KEY);
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) return null;

      const user = this.validateMockToken(token);
      if (!user) {
        // Token is invalid or expired, clean up
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }

      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  async refreshToken(): Promise<string | null> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) return null;

    const newToken = this.generateMockToken(currentUser);
    localStorage.setItem(TOKEN_KEY, newToken);
    return newToken;
  }
}

