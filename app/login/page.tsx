import { LoginForm } from '@/components/auth/LoginForm/LoginForm';
import { Header } from '@/components/layout/Header/Header';
import styles from './page.module.css';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <LoginForm />
      </main>
    </div>
  );
}

