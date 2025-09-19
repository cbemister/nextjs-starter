'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/components/ThemeProvider/ThemeProvider';
import { Button } from '@/components/Button/Button';
import styles from './Navigation.module.css';

export function Navigation() {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return '☀️';
      case 'dark': return '🌙';
      case 'system': return '💻';
      default: return '☀️';
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            Next.js Starter
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className={styles.desktop}>
          <div className={styles.links}>
            <Link href="/" className={styles.link}>
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className={styles.link}>
                  Dashboard
                </Link>
                <Link href="/profile" className={styles.link}>
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className={styles.link}>
                  Login
                </Link>
                <Link href="/register" className={styles.link}>
                  Register
                </Link>
              </>
            )}
          </div>

          <div className={styles.actions}>
            <button
              onClick={toggleTheme}
              className={styles.themeToggle}
              title={`Current theme: ${theme}`}
            >
              {getThemeIcon()}
            </button>

            {isAuthenticated ? (
              <div className={styles.userMenu}>
                <span className={styles.userName}>
                  {user?.name || user?.email}
                </span>
                <Button variant="outline" size="small" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="primary" size="small">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileLinks}>
            <Link 
              href="/" 
              className={styles.mobileLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  href="/dashboard" 
                  className={styles.mobileLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/profile" 
                  className={styles.mobileLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className={styles.mobileLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className={styles.mobileLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <div className={styles.mobileActions}>
            <button
              onClick={toggleTheme}
              className={styles.mobileThemeToggle}
              title={`Current theme: ${theme}`}
            >
              {getThemeIcon()} {theme} theme
            </button>

            {isAuthenticated ? (
              <div className={styles.mobileUserSection}>
                <span className={styles.mobileUserName}>
                  {user?.name || user?.email}
                </span>
                <Button 
                  variant="outline" 
                  size="small" 
                  fullWidth 
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" size="small" fullWidth>
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

