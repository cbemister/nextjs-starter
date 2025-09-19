import { sql } from './connection';
import { User } from '@/lib/auth/auth-service';
import bcrypt from 'bcryptjs';

// User-related database operations
export class UserQueries {
  // Create a new user
  static async createUser(email: string, passwordHash: string, name?: string): Promise<User> {
    const result = await sql`
      INSERT INTO users (email, name, password_hash)
      VALUES (${email}, ${name || null}, ${passwordHash})
      RETURNING id, email, name, avatar_url, created_at, updated_at
    `;

    if (result.length === 0) {
      throw new Error('Failed to create user');
    }

    const user = result[0];
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar_url,
      createdAt: new Date(user.created_at),
      updatedAt: new Date(user.updated_at),
    };
  }

  // Find user by email
  static async findUserByEmail(email: string): Promise<(User & { passwordHash: string }) | null> {
    const result = await sql`
      SELECT id, email, name, password_hash, avatar_url, created_at, updated_at
      FROM users
      WHERE email = ${email}
      LIMIT 1
    `;

    if (result.length === 0) {
      return null;
    }

    const user = result[0];
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar_url,
      passwordHash: user.password_hash,
      createdAt: new Date(user.created_at),
      updatedAt: new Date(user.updated_at),
    };
  }

  // Find user by ID
  static async findUserById(id: string): Promise<User | null> {
    const result = await sql`
      SELECT id, email, name, avatar_url, created_at, updated_at
      FROM users
      WHERE id = ${id}
      LIMIT 1
    `;

    if (result.length === 0) {
      return null;
    }

    const user = result[0];
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar_url,
      createdAt: new Date(user.created_at),
      updatedAt: new Date(user.updated_at),
    };
  }

  // Update user information
  static async updateUser(id: string, updates: Partial<Pick<User, 'name' | 'avatar'>>): Promise<User> {
    const setClause = [];
    const values: any[] = [];

    if (updates.name !== undefined) {
      setClause.push(`name = $${setClause.length + 1}`);
      values.push(updates.name);
    }

    if (updates.avatar !== undefined) {
      setClause.push(`avatar_url = $${setClause.length + 1}`);
      values.push(updates.avatar);
    }

    if (setClause.length === 0) {
      throw new Error('No updates provided');
    }

    const result = await sql`
      UPDATE users
      SET ${sql(setClause.join(', '))}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, email, name, avatar_url, created_at, updated_at
    `;

    if (result.length === 0) {
      throw new Error('User not found');
    }

    const user = result[0];
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar_url,
      createdAt: new Date(user.created_at),
      updatedAt: new Date(user.updated_at),
    };
  }

  // Verify user password
  static async verifyPassword(email: string, password: string): Promise<User | null> {
    const user = await this.findUserByEmail(email);
    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return null;
    }

    // Return user without password hash
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // Hash password
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }
}

// Session-related database operations
export class SessionQueries {
  // Create a new session
  static async createSession(userId: string, tokenHash: string, expiresAt: Date): Promise<string> {
    const result = await sql`
      INSERT INTO user_sessions (user_id, token_hash, expires_at)
      VALUES (${userId}, ${tokenHash}, ${expiresAt})
      RETURNING id
    `;

    if (result.length === 0) {
      throw new Error('Failed to create session');
    }

    return result[0].id;
  }

  // Find session by token hash
  static async findSessionByToken(tokenHash: string): Promise<{ userId: string; expiresAt: Date } | null> {
    const result = await sql`
      SELECT user_id, expires_at
      FROM user_sessions
      WHERE token_hash = ${tokenHash} AND expires_at > NOW()
      LIMIT 1
    `;

    if (result.length === 0) {
      return null;
    }

    const session = result[0];
    return {
      userId: session.user_id,
      expiresAt: new Date(session.expires_at),
    };
  }

  // Delete session
  static async deleteSession(tokenHash: string): Promise<void> {
    await sql`
      DELETE FROM user_sessions
      WHERE token_hash = ${tokenHash}
    `;
  }

  // Delete all sessions for a user
  static async deleteAllUserSessions(userId: string): Promise<void> {
    await sql`
      DELETE FROM user_sessions
      WHERE user_id = ${userId}
    `;
  }

  // Clean up expired sessions
  static async cleanupExpiredSessions(): Promise<number> {
    const result = await sql`
      DELETE FROM user_sessions
      WHERE expires_at <= NOW()
      RETURNING id
    `;

    return result.length;
  }
}

// Profile-related database operations
export class ProfileQueries {
  // Create user profile
  static async createProfile(userId: string, profileData: {
    bio?: string;
    location?: string;
    websiteUrl?: string;
    githubUsername?: string;
    twitterUsername?: string;
    linkedinUsername?: string;
    preferences?: Record<string, any>;
  }): Promise<void> {
    await sql`
      INSERT INTO user_profiles (
        user_id, bio, location, website_url, github_username, 
        twitter_username, linkedin_username, preferences
      )
      VALUES (
        ${userId}, ${profileData.bio || null}, ${profileData.location || null},
        ${profileData.websiteUrl || null}, ${profileData.githubUsername || null},
        ${profileData.twitterUsername || null}, ${profileData.linkedinUsername || null},
        ${JSON.stringify(profileData.preferences || {})}
      )
    `;
  }

  // Get user profile
  static async getProfile(userId: string): Promise<any | null> {
    const result = await sql`
      SELECT bio, location, website_url, github_username, twitter_username, 
             linkedin_username, preferences, created_at, updated_at
      FROM user_profiles
      WHERE user_id = ${userId}
      LIMIT 1
    `;

    if (result.length === 0) {
      return null;
    }

    const profile = result[0];
    return {
      bio: profile.bio,
      location: profile.location,
      websiteUrl: profile.website_url,
      githubUsername: profile.github_username,
      twitterUsername: profile.twitter_username,
      linkedinUsername: profile.linkedin_username,
      preferences: profile.preferences,
      createdAt: new Date(profile.created_at),
      updatedAt: new Date(profile.updated_at),
    };
  }

  // Update user profile
  static async updateProfile(userId: string, updates: {
    bio?: string;
    location?: string;
    websiteUrl?: string;
    githubUsername?: string;
    twitterUsername?: string;
    linkedinUsername?: string;
    preferences?: Record<string, any>;
  }): Promise<void> {
    const setClause = [];
    const values: any[] = [];

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        const dbKey = key === 'websiteUrl' ? 'website_url' :
                     key === 'githubUsername' ? 'github_username' :
                     key === 'twitterUsername' ? 'twitter_username' :
                     key === 'linkedinUsername' ? 'linkedin_username' : key;
        
        setClause.push(`${dbKey} = $${setClause.length + 1}`);
        values.push(key === 'preferences' ? JSON.stringify(value) : value);
      }
    });

    if (setClause.length === 0) {
      return;
    }

    await sql`
      UPDATE user_profiles
      SET ${sql(setClause.join(', '))}, updated_at = NOW()
      WHERE user_id = ${userId}
    `;
  }
}

