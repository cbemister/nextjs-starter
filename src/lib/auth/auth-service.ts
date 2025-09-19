import { MockAuthService } from './mock-auth';
import { RealAuthService } from './real-auth';

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

export interface IAuthService {
  login(email: string, password: string): Promise<AuthResult>;
  register(email: string, password: string, name?: string): Promise<AuthResult>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  refreshToken?(): Promise<string | null>;
}

export class AuthService implements IAuthService {
  private service: IAuthService;

  constructor() {
    // Determine which auth service to use based on environment
    const useMockAuth = process.env.NEXT_PUBLIC_USE_MOCK_AUTH === 'true' || 
                       process.env.NODE_ENV === 'development';
    
    if (useMockAuth) {
      this.service = new MockAuthService();
    } else {
      this.service = new RealAuthService();
    }
  }

  async login(email: string, password: string): Promise<AuthResult> {
    return this.service.login(email, password);
  }

  async register(email: string, password: string, name?: string): Promise<AuthResult> {
    return this.service.register(email, password, name);
  }

  async logout(): Promise<void> {
    return this.service.logout();
  }

  async getCurrentUser(): Promise<User | null> {
    return this.service.getCurrentUser();
  }

  async refreshToken(): Promise<string | null> {
    if (this.service.refreshToken) {
      return this.service.refreshToken();
    }
    return null;
  }
}

