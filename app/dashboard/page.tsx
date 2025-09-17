'use client';

import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/layout/Header/Header';
import { Button } from '@/components/ui/Button/Button';
import { useTheme } from '@/hooks/useTheme';
import styles from './page.module.css';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { theme, resolvedTheme } = useTheme();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading dashboard...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <div className={styles.unauthorized}>
            <h1>Access Denied</h1>
            <p>Please log in to access the dashboard.</p>
            <Button variant="primary" onClick={() => window.location.href = '/login'}>
              Go to Login
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.welcome}>
            <h1 className={styles.title}>
              Welcome back, {user?.name || 'User'}! 👋
            </h1>
            <p className={styles.subtitle}>
              Here's your personalized dashboard
            </p>
          </div>

          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>User Profile</h3>
                <span className={styles.cardIcon}>👤</span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.profileInfo}>
                  <p><strong>Name:</strong> {user?.name}</p>
                  <p><strong>Email:</strong> {user?.email}</p>
                  <p><strong>Role:</strong> {user?.role}</p>
                  <p><strong>Member since:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                </div>
                <Button variant="outline" size="small">
                  Edit Profile
                </Button>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Theme Settings</h3>
                <span className={styles.cardIcon}>🎨</span>
              </div>
              <div className={styles.cardContent}>
                <p><strong>Current theme:</strong> {theme}</p>
                <p><strong>Resolved theme:</strong> {resolvedTheme}</p>
                <p className={styles.themeDescription}>
                  The theme system supports light, dark, and system preferences with automatic switching.
                </p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Quick Stats</h3>
                <span className={styles.cardIcon}>📊</span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>1</span>
                    <span className={styles.statLabel}>Active Session</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>0</span>
                    <span className={styles.statLabel}>Notifications</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>100%</span>
                    <span className={styles.statLabel}>Profile Complete</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Recent Activity</h3>
                <span className={styles.cardIcon}>📝</span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.activity}>
                  <div className={styles.activityItem}>
                    <span className={styles.activityIcon}>🔐</span>
                    <div className={styles.activityContent}>
                      <p className={styles.activityTitle}>Logged in</p>
                      <p className={styles.activityTime}>Just now</p>
                    </div>
                  </div>
                  <div className={styles.activityItem}>
                    <span className={styles.activityIcon}>👤</span>
                    <div className={styles.activityContent}>
                      <p className={styles.activityTitle}>Profile viewed</p>
                      <p className={styles.activityTime}>2 minutes ago</p>
                    </div>
                  </div>
                  <div className={styles.activityItem}>
                    <span className={styles.activityIcon}>🎨</span>
                    <div className={styles.activityContent}>
                      <p className={styles.activityTitle}>Theme changed</p>
                      <p className={styles.activityTime}>5 minutes ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <Button variant="primary" size="large">
              Explore Features
            </Button>
            <Button variant="outline" size="large">
              View Documentation
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

