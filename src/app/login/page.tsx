'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Layout } from '@/components/Layout/Layout';
import { Button } from '@/components/Button/Button';
import { Form, FormField, Label, Input, FormError } from '@/components/Form/Form';
import styles from './page.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Sign In</h1>
            <p className={styles.subtitle}>
              Welcome back! Please sign in to your account.
            </p>
          </div>

          <Form onSubmit={handleSubmit}>
            {error && <FormError message={error} />}
            
            <FormField>
              <Label htmlFor="email" required>
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
            </FormField>

            <FormField>
              <Label htmlFor="password" required>
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </FormField>

            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              loading={isLoading}
            >
              Sign In
            </Button>
          </Form>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              Don't have an account?{' '}
              <Link href="/register" className={styles.link}>
                Sign up
              </Link>
            </p>
          </div>

          <div className={styles.demoInfo}>
            <h3>Demo Credentials</h3>
            <p>Email: <code>demo@example.com</code></p>
            <p>Password: <code>any password (6+ characters)</code></p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

