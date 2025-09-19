import { neon } from '@neondatabase/serverless';

// Database connection configuration
const getDatabaseUrl = (): string => {
  const url = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
  
  if (!url) {
    throw new Error(
      'Database URL not found. Please set DATABASE_URL or NEON_DATABASE_URL environment variable.'
    );
  }
  
  return url;
};

// Create a connection to Neon database
export const sql = neon(getDatabaseUrl());

// Test database connection
export async function testConnection(): Promise<boolean> {
  try {
    const result = await sql`SELECT 1 as test`;
    return result.length > 0;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
}

// Database utility functions
export class DatabaseError extends Error {
  constructor(message: string, public originalError?: unknown) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export async function executeQuery<T = any>(
  query: string,
  params: any[] = []
): Promise<T[]> {
  try {
    // Note: Neon's serverless driver uses template literals, not parameterized queries
    // This is a simplified example - in production, you'd want proper query building
    const result = await sql(query, ...params);
    return result as T[];
  } catch (error) {
    console.error('Database query failed:', error);
    throw new DatabaseError('Query execution failed', error);
  }
}

// Connection pool management (Neon handles this automatically)
export function getConnectionInfo() {
  return {
    provider: 'Neon',
    status: 'connected',
    serverless: true,
  };
}

