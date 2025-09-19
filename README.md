# Next.js Starter

A comprehensive Next.js starter template with authentication, database integration, and modern development tools.

## 🚀 Features

- **⚡ Next.js 14** - Latest version with App Router
- **🔐 Authentication** - Dual system supporting both mock and real authentication
- **🗄️ Database** - Neon PostgreSQL integration with TypeScript
- **🎨 Styling** - CSS Modules with light/dark theme support
- **📱 Responsive** - Mobile-first design principles
- **🚀 CI/CD** - GitHub Actions and Netlify deployment
- **🧪 Testing** - Jest and React Testing Library setup
- **📝 TypeScript** - Full TypeScript support with strict configuration
- **🔧 Developer Tools** - ESLint, Prettier, Husky pre-commit hooks

## 🛠️ Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** CSS Modules with CSS Custom Properties
- **Database:** Neon PostgreSQL with serverless driver
- **Authentication:** Custom auth service with mock/real providers
- **Testing:** Jest + React Testing Library
- **CI/CD:** GitHub Actions + Netlify
- **Code Quality:** ESLint + Prettier + Husky

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Neon database account (for production)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/cbemister/nextjs-starter.git
   cd nextjs-starter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # For development with mock auth
   NEXT_PUBLIC_USE_MOCK_AUTH=true
   NEXTAUTH_SECRET=your-secret-here
   NEXTAUTH_URL=http://localhost:3000
   
   # For production with real database
   DATABASE_URL=your-neon-database-url
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── login/             # Authentication pages
│   ├── register/
│   ├── dashboard/
│   └── profile/
├── components/            # Reusable UI components
│   ├── Button/
│   ├── Navigation/
│   ├── Layout/
│   ├── Form/
│   └── ThemeProvider/
├── contexts/              # React contexts
│   └── AuthContext.tsx
├── hooks/                 # Custom React hooks
│   └── useAuth.ts
├── lib/                   # Utility libraries
│   ├── auth/              # Authentication services
│   └── database/          # Database utilities
├── styles/                # Global styles and themes
│   ├── globals.css
│   ├── themes.css
│   └── responsive.css
└── __tests__/             # Test files
```

## 🔐 Authentication

The starter includes a flexible authentication system that supports both mock and real authentication:

### Mock Authentication (Development)
- Set `NEXT_PUBLIC_USE_MOCK_AUTH=true`
- Uses localStorage for session management
- Pre-configured demo users
- Perfect for development and demos

### Real Authentication (Production)
- Set `NEXT_PUBLIC_USE_MOCK_AUTH=false`
- Integrates with your API endpoints
- Supports JWT tokens and session cookies
- Ready for production use

### Demo Users (Mock Mode)
- **Email:** demo@example.com, **Password:** any password (6+ chars)
- **Email:** admin@example.com, **Password:** any password (6+ chars)

## 🗄️ Database

### Neon PostgreSQL Setup

1. **Create a Neon account** at [neon.tech](https://neon.tech)

2. **Create a new project** and database

3. **Get your connection string** from the Neon dashboard

4. **Add to environment variables**
   ```env
   DATABASE_URL=postgresql://username:password@hostname/database?sslmode=require
   ```

5. **Run migrations**
   ```bash
   npm run db:migrate
   ```

### Database Schema

The starter includes a complete user management schema:
- Users table with authentication
- User sessions for token management
- User profiles for extended information
- OAuth accounts for social login
- Password reset and email verification tokens

## 🎨 Theming

### CSS Modules + Custom Properties

The styling system uses CSS Modules with CSS Custom Properties for theming:

```css
/* Component styles */
.button {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  border-radius: var(--border-radius-md);
}
```

### Theme System

- **Light Theme** - Default theme with light colors
- **Dark Theme** - Dark mode with adjusted colors
- **System Theme** - Automatically follows OS preference
- **Theme Persistence** - Saves user preference in localStorage

### Responsive Design

Mobile-first approach with CSS custom properties:

```css
/* Mobile first */
.container {
  padding: var(--spacing-md);
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: var(--spacing-lg);
  }
}
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure

- **Unit Tests** - Component and utility testing
- **Integration Tests** - Feature testing with providers
- **Test Utilities** - Custom render functions and mocks

## 🚀 Deployment

### Netlify Deployment

1. **Connect your repository** to Netlify

2. **Set environment variables** in Netlify dashboard:
   ```
   NEXT_PUBLIC_USE_MOCK_AUTH=false
   NEXTAUTH_SECRET=your-production-secret
   NEXTAUTH_URL=https://your-domain.netlify.app
   DATABASE_URL=your-neon-database-url
   ```

3. **Deploy** - Automatic deployments on push to main branch

### GitHub Actions

The starter includes CI/CD workflows:

- **CI Pipeline** - Linting, testing, and building
- **Deploy Pipeline** - Automatic Netlify deployment
- **Security Checks** - Dependency auditing

## 📚 Documentation

- [Authentication Guide](docs/AUTHENTICATION.md)
- [Theming Guide](docs/THEMING.md)
- [Database Guide](docs/DATABASE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Run the test suite
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Neon](https://neon.tech/) - Serverless PostgreSQL
- [Netlify](https://netlify.com/) - Deployment platform
- [Vercel](https://vercel.com/) - Next.js creators

---

**Happy coding!** 🎉

If you find this starter helpful, please consider giving it a ⭐ on GitHub!
