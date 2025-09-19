// Database type definitions for the Next.js starter

export interface DatabaseUser {
  id: string;
  email: string;
  name: string | null;
  password_hash: string;
  avatar_url: string | null;
  email_verified: boolean;
  email_verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface DatabaseUserSession {
  id: string;
  user_id: string;
  token_hash: string;
  expires_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface DatabaseUserProfile {
  id: string;
  user_id: string;
  bio: string | null;
  location: string | null;
  website_url: string | null;
  github_username: string | null;
  twitter_username: string | null;
  linkedin_username: string | null;
  preferences: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface DatabasePasswordResetToken {
  id: string;
  user_id: string;
  token_hash: string;
  expires_at: Date;
  used_at: Date | null;
  created_at: Date;
}

export interface DatabaseEmailVerificationToken {
  id: string;
  user_id: string;
  token_hash: string;
  expires_at: Date;
  used_at: Date | null;
  created_at: Date;
}

export interface DatabaseOAuthAccount {
  id: string;
  user_id: string;
  provider: string;
  provider_account_id: string;
  access_token: string | null;
  refresh_token: string | null;
  expires_at: Date | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  created_at: Date;
  updated_at: Date;
}

// Application-level types (transformed from database types)
export interface UserProfile {
  bio?: string;
  location?: string;
  websiteUrl?: string;
  githubUsername?: string;
  twitterUsername?: string;
  linkedinUsername?: string;
  preferences: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSession {
  id: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface OAuthAccount {
  id: string;
  userId: string;
  provider: 'google' | 'github' | 'discord' | 'twitter' | string;
  providerAccountId: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
  tokenType?: string;
  scope?: string;
  idToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Query result types
export interface CreateUserResult {
  id: string;
  email: string;
  name?: string;
}

export interface LoginResult {
  user: {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
  };
  session: {
    id: string;
    expiresAt: Date;
  };
}

// Database operation options
export interface QueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Error types
export class DatabaseValidationError extends Error {
  constructor(
    message: string,
    public field: string,
    public code: string
  ) {
    super(message);
    this.name = 'DatabaseValidationError';
  }
}

export class DatabaseConstraintError extends Error {
  constructor(
    message: string,
    public constraint: string,
    public table: string
  ) {
    super(message);
    this.name = 'DatabaseConstraintError';
  }
}

// Utility types
export type DatabaseTable = 
  | 'users'
  | 'user_sessions'
  | 'user_profiles'
  | 'password_reset_tokens'
  | 'email_verification_tokens'
  | 'oauth_accounts';

export type UserUpdateFields = Partial<Pick<DatabaseUser, 'name' | 'avatar_url' | 'email_verified'>>;
export type ProfileUpdateFields = Partial<Omit<DatabaseUserProfile, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;

// Configuration types
export interface DatabaseConfig {
  url: string;
  ssl?: boolean;
  maxConnections?: number;
  connectionTimeout?: number;
  queryTimeout?: number;
}

export interface MigrationInfo {
  version: string;
  name: string;
  appliedAt: Date;
  checksum: string;
}

