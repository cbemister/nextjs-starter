import { AuthService } from '@/types/auth';
import { mockAuthService } from './MockAuthService';
// import { nextAuthService } from './NextAuthService'; // Uncomment when implementing real auth

// Configuration to switch between mock and real authentication
const USE_MOCK_AUTH = process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_USE_MOCK_AUTH === 'true';

// Factory function to get the appropriate auth service
export function getAuthService(): AuthService {
  if (USE_MOCK_AUTH) {
    return mockAuthService;
  }
  
  // Return real auth service in production
  // return nextAuthService;
  
  // For now, fallback to mock auth
  console.warn('Real authentication not implemented yet, using mock auth service');
  return mockAuthService;
}

// Export the auth service instance
export const authService = getAuthService();

