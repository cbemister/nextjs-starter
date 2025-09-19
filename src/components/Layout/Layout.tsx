'use client';

import React from 'react';
import { Navigation } from '@/components/Navigation/Navigation';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
}

export function Layout({ children, showNavigation = true }: LayoutProps) {
  return (
    <div className={styles.layout}>
      {showNavigation && <Navigation />}
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}

