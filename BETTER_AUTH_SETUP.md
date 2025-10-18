# Better Auth Integration Setup

This document outlines the setup for integrating Better Auth into your Task Management application.

## Overview

Better Auth is a modern authentication library that provides a complete authentication solution with support for multiple providers, session management, and security features.

## 📋 Setup Instructions

### 1. Install Better Auth Dependencies

#### Backend
```bash
cd backend
npm install better-auth
```

#### Frontend
```bash
cd frontend
npm install better-auth
```

### 2. Backend Configuration

#### Update package.json scripts
Add the following script to your `backend/package.json`:

```json
{
  "scripts": {
    "dev:better-auth": "ts-node-dev --respawn --transpile-only src/server-better-auth.ts",
    "start:better-auth": "node dist/server-better-auth.js"
  }
}
```

#### Environment Variables
Add these to your `backend/.env`:

```env
# Better Auth Configuration
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
```

### 3. Frontend Configuration

#### Better Auth Client
The client is already configured in `frontend/src/lib/auth-client.ts`:

```typescript
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  plugins: [],
});
```

#### Environment Variables
Add to your `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

### 4. Database Configuration

#### Current Setup (Memory Adapter)
The current setup uses Better Auth's memory adapter for development. This means:

- ✅ Works immediately without database setup
- ❌ Data is lost on server restart
- ❌ Not suitable for production

#### Production Setup
For production, you have several options:

1. **PostgreSQL with Prisma Adapter** (Recommended)
```bash
npm install @prisma/client better-auth/adapters/prisma
```

2. **MongoDB Custom Adapter**
- You'll need to create a custom adapter for MongoDB
- Or migrate to PostgreSQL for full Better Auth support

### 5. Run the Application

#### Backend (with Better Auth)
```bash
cd backend
npm run dev:better-auth
```

#### Frontend
```bash
cd frontend
npm run dev
```

## 🔄 Migration Notes

### What Changed
- ✅ Replaced custom AuthContext with Better Auth hooks
- ✅ Updated all authentication components
- ✅ Integrated Better Auth client and server
- ✅ Maintained existing UI/UX with shadcn components

### API Endpoints
Better Auth automatically provides these endpoints:

#### Authentication
- `POST /api/auth/sign-up/email` - Register new user
- `POST /api/auth/sign-in/email` - Sign in with email/password
- `POST /api/auth/sign-out` - Sign out

#### Session Management
- `GET /api/auth/get-session` - Get current session
- `DELETE /api/auth/session` - End current session

### Custom vs Better Auth Features

| Feature | Custom Implementation | Better Auth |
|---------|----------------------|-------------|
| Email/Password | ✅ | ✅ |
| Session Management | ✅ (JWT) | ✅ (Cookie-based) |
| Social Providers | ❌ | ✅ (Google, GitHub, etc.) |
| Password Reset | ❌ | ✅ |
| Email Verification | ❌ | ✅ |
| Security Features | Basic | Advanced |
| Type Safety | Manual | Built-in |

## 🚀 Next Steps

### 1. Test the Integration
1. Start both backend and frontend
2. Try registering a new user
3. Test login/logout functionality
4. Verify session persistence

### 2. Production Database Setup
1. Choose your database (PostgreSQL recommended)
2. Set up Prisma schema
3. Configure Better Auth database adapter
4. Run database migrations

### 3. Add Advanced Features
- Social providers (Google, GitHub)
- Email verification
- Password reset
- Two-factor authentication
- Rate limiting
- Session management

### 4. Security Enhancements
- CSRF protection
- Rate limiting
- Secure cookies
- Environment variable validation

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `FRONTEND_URL` is correctly set in backend `.env`
   - Check CORS configuration in server

2. **Authentication Not Working**
   - Verify `BETTER_AUTH_SECRET` is set
   - Check that both frontend and backend are running
   - Ensure API endpoints are correctly configured

3. **Session Issues**
   - Check cookie configuration
   - Verify `credentials: true` in frontend requests
   - Ensure same-site cookie settings

### Debug Mode
Enable debug logging by setting:
```env
NODE_ENV=development
LOG_LEVEL=debug
```

## 📚 Additional Resources

- [Better Auth Documentation](https://better-auth.com/docs)
- [Better Auth React Guide](https://better-auth.com/docs/react)
- [Migration Guide](https://better-auth.com/docs/migration)
- [Security Best Practices](https://better-auth.com/docs/security)

## 🤝 Contributing

When making changes to the authentication system:

1. Test both frontend and backend changes
2. Update documentation
3. Consider security implications
4. Test with different user scenarios
5. Verify session management works correctly