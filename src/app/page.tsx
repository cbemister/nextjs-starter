'use client';

import { useAuth } from '@/hooks/useAuth';
import { Layout } from '@/components/Layout/Layout';
import { Button } from '@/components/Button/Button';
import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <Layout>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
            Welcome to <span className={styles.highlight}>Next.js Starter</span>
          </h1>
          <p className={styles.description}>
            A comprehensive starter template with authentication, database integration,
            and modern development tools.
          </p>
          
          <div className={styles.features}>
            <div className={styles.feature}>
              <h3>🔐 Authentication</h3>
              <p>Mock and real authentication with NextAuth.js</p>
            </div>
            <div className={styles.feature}>
              <h3>🗄️ Database</h3>
              <p>Neon PostgreSQL integration with TypeScript</p>
            </div>
            <div className={styles.feature}>
              <h3>🎨 Styling</h3>
              <p>CSS Modules with light/dark theme support</p>
            </div>
            <div className={styles.feature}>
              <h3>📱 Responsive</h3>
              <p>Mobile-first design principles</p>
            </div>
            <div className={styles.feature}>
              <h3>🚀 CI/CD</h3>
              <p>GitHub Actions and Netlify deployment</p>
            </div>
            <div className={styles.feature}>
              <h3>🧪 Testing</h3>
              <p>Jest and React Testing Library setup</p>
            </div>
          </div>

          <div className={styles.actions}>
            {isAuthenticated ? (
              <div className={styles.welcomeBack}>
                <p>Welcome back, {user?.name || user?.email}!</p>
                <Link href="/dashboard">
                  <Button variant="primary" size="large">
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            ) : (
              <div className={styles.authActions}>
                <Link href="/login">
                  <Button variant="primary" size="large">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="secondary" size="large">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}

