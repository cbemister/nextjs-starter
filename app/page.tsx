import { Header } from '@/components/layout/Header/Header';
import { Button } from '@/components/ui/Button/Button';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Header />
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
              <p>Mock and real authentication providers with session management</p>
            </div>
            <div className={styles.feature}>
              <h3>🗄️ Database</h3>
              <p>Neon PostgreSQL integration with migrations and type safety</p>
            </div>
            <div className={styles.feature}>
              <h3>🎨 CSS Modules</h3>
              <p>Styled with CSS modules, dark/light themes, and responsive design</p>
            </div>
            <div className={styles.feature}>
              <h3>🚀 CI/CD</h3>
              <p>GitHub Actions and Netlify deployment pipeline</p>
            </div>
          </div>
          <div className={styles.actions}>
            <Link href="/login">
              <Button variant="primary" size="large">
                Get Started
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary" size="large">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

