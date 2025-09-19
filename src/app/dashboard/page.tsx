'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Layout } from '@/components/Layout/Layout';
import { Button } from '@/components/Button/Button';
import styles from './page.module.css';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  if (!user) {
    return (
      <Layout>
        <div className={styles.container}>
          <div className={styles.card}>
            <h1>Access Denied</h1>
            <p>Please log in to access the dashboard.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Welcome back, {user.name || user.email}!</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Profile Information</h2>
            <div className={styles.profileInfo}>
              {user.avatar && (
                <img 
                  src={user.avatar} 
                  alt="Profile" 
                  className={styles.avatar}
                />
              )}
              <div className={styles.userDetails}>
                <p><strong>Name:</strong> {user.name || 'Not provided'}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Member since:</strong> {user.createdAt.toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Quick Actions</h2>
            <div className={styles.actions}>
              <Button variant="primary" size="medium">
                Edit Profile
              </Button>
              <Button variant="outline" size="medium">
                Settings
              </Button>
              <Button variant="ghost" size="medium">
                Help & Support
              </Button>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Recent Activity</h2>
            <div className={styles.activity}>
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>🔐</div>
                <div className={styles.activityContent}>
                  <p className={styles.activityTitle}>Logged in</p>
                  <p className={styles.activityTime}>Just now</p>
                </div>
              </div>
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>👤</div>
                <div className={styles.activityContent}>
                  <p className={styles.activityTitle}>Account created</p>
                  <p className={styles.activityTime}>{user.createdAt.toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Account Management</h2>
            <div className={styles.management}>
              <p className={styles.managementText}>
                Manage your account settings, security preferences, and more.
              </p>
              <div className={styles.managementActions}>
                <Button variant="outline" size="small">
                  Change Password
                </Button>
                <Button variant="danger" size="small" onClick={handleLogout}>
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

