import { 
  AuthService, 
  AuthSession, 
  LoginCredentials, 
  RegisterCredentials, 
  User, 
  AuthError 
} from '@/types/auth';

// Mock users for development
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'admin',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Regular User',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    role: 'user',
    createdAt: new Date('2023-01-02'),
    updatedAt: new Date('2023-01-02'),
  },
];

const MOCK_PASSWORDS: Record<string, string> = {
  'admin@example.com': 'admin123',
  'user@example.com': 'user123',
};

export class MockAuthService implements AuthService {
  private currentSession: AuthSession | null = null;
  private readonly STORAGE_KEY = 'mock_auth_session';

  constructor() {
    // Load session from localStorage on initialization
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        try {
          const session = JSON.parse(stored);
          // Check if session is still valid
          if (new Date(session.expiresAt) > new Date()) {
            this.currentSession = {
              ...session,
              expiresAt: new Date(session.expiresAt),
            };
          } else {
            localStorage.removeItem(this.STORAGE_KEY);
          }
        } catch (error) {
          console.error('Failed to parse stored session:', error);
          localStorage.removeItem(this.STORAGE_KEY);
        }
      }
    }
  }

  private async delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private generateToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  private createSession(user: User): AuthSession {
    const session: AuthSession = {
      user,
      accessToken: this.generateToken(),
      refreshToken: this.generateToken(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    };

    this.currentSession = session;
    
    // Store in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(session));
    }

    return session;
  }

  async login(credentials: LoginCredentials): Promise<AuthSession> {
    await this.delay(); // Simulate network delay

    const { email, password } = credentials;
    
    // Find user
    const user = MOCK_USERS.find(u => u.email === email);
    if (!user) {
      throw new AuthError({
        code: 'USER_NOT_FOUND',
        message: 'No user found with this email address',
      });
    }

    // Check password
    if (MOCK_PASSWORDS[email] !== password) {
      throw new AuthError({
        code: 'INVALID_PASSWORD',
        message: 'Invalid password',
      });
    }

    return this.createSession(user);
  }

  async register(credentials: RegisterCredentials): Promise<AuthSession> {
    await this.delay(); // Simulate network delay

    const { email, password, name } = credentials;

    // Check if user already exists
    if (MOCK_USERS.find(u => u.email === email)) {
      throw new AuthError({
        code: 'USER_EXISTS',
        message: 'A user with this email already exists',
      });
    }

    // Create new user
    const newUser: User = {
      id: (MOCK_USERS.length + 1).toString(),
      email,
      name,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add to mock database
    MOCK_USERS.push(newUser);
    MOCK_PASSWORDS[email] = password;

    return this.createSession(newUser);
  }

  async logout(): Promise<void> {
    await this.delay(200); // Simulate network delay

    this.currentSession = null;
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  async getSession(): Promise<AuthSession | null> {
    await this.delay(100); // Simulate network delay

    if (!this.currentSession) {
      return null;
    }

    // Check if session is expired
    if (new Date() > this.currentSession.expiresAt) {
      await this.logout();
      return null;
    }

    return this.currentSession;
  }

  async refreshSession(): Promise<AuthSession> {
    await this.delay(); // Simulate network delay

    if (!this.currentSession) {
      throw new AuthError({
        code: 'NO_SESSION',
        message: 'No active session to refresh',
      });
    }

    // Create new session with extended expiry
    return this.createSession(this.currentSession.user);
  }

  async getCurrentUser(): Promise<User | null> {
    const session = await this.getSession();
    return session?.user || null;
  }

  async updateUser(updates: Partial<User>): Promise<User> {
    await this.delay(); // Simulate network delay

    if (!this.currentSession) {
      throw new AuthError({
        code: 'NOT_AUTHENTICATED',
        message: 'User must be authenticated to update profile',
      });
    }

    const updatedUser: User = {
      ...this.currentSession.user,
      ...updates,
      id: this.currentSession.user.id, // Prevent ID changes
      updatedAt: new Date(),
    };

    // Update in mock database
    const userIndex = MOCK_USERS.findIndex(u => u.id === updatedUser.id);
    if (userIndex !== -1) {
      MOCK_USERS[userIndex] = updatedUser;
    }

    // Update current session
    this.currentSession = {
      ...this.currentSession,
      user: updatedUser,
    };

    // Update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.currentSession));
    }

    return updatedUser;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await this.delay(); // Simulate network delay

    if (!this.currentSession) {
      throw new AuthError({
        code: 'NOT_AUTHENTICATED',
        message: 'User must be authenticated to change password',
      });
    }

    const email = this.currentSession.user.email;
    
    if (MOCK_PASSWORDS[email] !== currentPassword) {
      throw new AuthError({
        code: 'INVALID_PASSWORD',
        message: 'Current password is incorrect',
      });
    }

    MOCK_PASSWORDS[email] = newPassword;
  }

  async resetPassword(email: string): Promise<void> {
    await this.delay(); // Simulate network delay

    const user = MOCK_USERS.find(u => u.email === email);
    if (!user) {
      // Don't reveal if user exists for security
      return;
    }

    // In a real implementation, this would send an email
    console.log(`Password reset email sent to ${email}`);
  }

  async isAuthenticated(): Promise<boolean> {
    const session = await this.getSession();
    return session !== null;
  }
}

// Create a singleton instance
export const mockAuthService = new MockAuthService();

