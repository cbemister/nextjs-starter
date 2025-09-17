# Next.js Starter 🚀

A comprehensive, production-ready Next.js starter template with authentication, database integration, modern styling, and complete CI/CD pipeline.

## ✨ Features

### 🔐 Authentication System
- **Flexible Authentication**: Switch between mock (development) and real authentication providers
- **Session Management**: Secure session handling with automatic refresh
- **Protected Routes**: Route-level authentication guards
- **User Management**: Complete user profile and account management

### 🗄️ Database Integration
- **Neon PostgreSQL**: Production-ready database with connection pooling
- **Type Safety**: Full TypeScript integration with database models
- **Migrations**: Database schema versioning and migration system
- **Repository Pattern**: Clean data access layer

### 🎨 Modern Styling
- **CSS Modules**: Component-scoped styling with full TypeScript support
- **Theme System**: Light/dark/system theme switching with CSS custom properties
- **Responsive Design**: Mobile-first approach with fluid typography
- **Design Tokens**: Consistent spacing, colors, and typography scale

### 🚀 CI/CD Pipeline
- **GitHub Actions**: Automated testing, linting, and deployment
- **Netlify Integration**: Optimized deployment with preview builds
- **Quality Gates**: Code quality checks and security scanning
- **Environment Management**: Separate staging and production deployments

### 🛠️ Developer Experience
- **TypeScript**: Full type safety across the entire application
- **ESLint & Prettier**: Code quality and formatting enforcement
- **Hot Reload**: Fast development with instant feedback
- **Component Library**: Reusable UI components with consistent API

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 8+
- PostgreSQL database (Neon recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nextjs-starter.git
   cd nextjs-starter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run database migrations** (optional for mock auth)
   ```bash
   npm run db:migrate
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@hostname:port/database"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Development
NEXT_PUBLIC_USE_MOCK_AUTH="true"
```

See `.env.example` for all available configuration options.

### Mock Authentication

For development, the starter includes a mock authentication system with demo users:

- **Admin User**: `admin@example.com` / `admin123`
- **Regular User**: `user@example.com` / `user123`

Set `NEXT_PUBLIC_USE_MOCK_AUTH="true"` to enable mock authentication.

## 📁 Project Structure

```
├── app/                    # Next.js 13+ app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── login/             # Authentication pages
│   └── dashboard/         # Protected pages
├── components/            # Reusable UI components
│   ├── ui/               # Basic UI components (Button, Input, etc.)
│   ├── layout/           # Layout components (Header, Navigation)
│   └── auth/             # Authentication components
├── lib/                  # Utility libraries
│   ├── auth/             # Authentication services
│   ├── database/         # Database connection and models
│   └── config/           # Configuration management
├── styles/               # Global styles and themes
│   ├── globals.css       # Global CSS with design tokens
│   ├── variables.css     # CSS custom properties
│   └── themes.css        # Light/dark theme definitions
├── hooks/                # Custom React hooks
├── contexts/             # React context providers
├── types/                # TypeScript type definitions
└── docs/                 # Additional documentation
```

## 🎨 Styling System

### CSS Modules
Each component has its own CSS module for scoped styling:

```tsx
// Component
import styles from './Button.module.css';

export function Button() {
  return <button className={styles.button}>Click me</button>;
}
```

### Theme System
The starter includes a comprehensive theme system:

```css
/* Light theme variables */
:root {
  --color-primary: #3b82f6;
  --color-background: #ffffff;
  --spacing-md: 1rem;
}

/* Dark theme variables */
[data-theme="dark"] {
  --color-primary: #60a5fa;
  --color-background: #0f172a;
}
```

### Responsive Design
Mobile-first approach with fluid typography:

```css
.title {
  font-size: clamp(2rem, 5vw, 4rem);
}

@media (min-width: 768px) {
  .container {
    padding: var(--spacing-lg);
  }
}
```

## 🔐 Authentication

### Mock Authentication (Development)
```tsx
import { useAuth } from '@/hooks/useAuth';

function LoginForm() {
  const { login, isLoading } = useAuth();
  
  const handleLogin = async () => {
    await login({
      email: 'user@example.com',
      password: 'user123'
    });
  };
}
```

### Real Authentication (Production)
The starter is designed to easily integrate with NextAuth.js or other authentication providers. Update the `AuthService` implementation in `lib/auth/`.

## 🗄️ Database

### Neon Integration
```typescript
// lib/database/connection.ts
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function getUser(id: string) {
  const [user] = await sql`
    SELECT * FROM users WHERE id = ${id}
  `;
  return user;
}
```

### Migrations
```bash
# Run migrations
npm run db:migrate

# Create new migration
npm run db:create-migration "add_user_table"
```

## 🚀 Deployment

### Netlify (Recommended)

1. **Connect your repository** to Netlify
2. **Set environment variables** in Netlify dashboard
3. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `out`
4. **Deploy**: Automatic deployments on push to main branch

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📝 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run type-check` | Run TypeScript type checking |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run tests |
| `npm run db:migrate` | Run database migrations |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📚 Documentation

- [Architecture Overview](docs/ARCHITECTURE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Customization Guide](docs/CUSTOMIZATION.md)
- [API Reference](docs/API.md)

## 🐛 Troubleshooting

### Common Issues

**Build fails with TypeScript errors**
```bash
npm run type-check
# Fix any type errors and try again
```

**Authentication not working**
```bash
# Check environment variables
echo $NEXT_PUBLIC_USE_MOCK_AUTH
# Ensure .env.local is configured correctly
```

**Database connection issues**
```bash
# Verify DATABASE_URL format
# Check Neon dashboard for connection details
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Neon](https://neon.tech/) - Serverless PostgreSQL
- [Netlify](https://netlify.com/) - Deployment platform
- [TypeScript](https://typescriptlang.org/) - Type safety

---

**Happy coding!** 🎉

If you find this starter helpful, please consider giving it a ⭐ on GitHub!

