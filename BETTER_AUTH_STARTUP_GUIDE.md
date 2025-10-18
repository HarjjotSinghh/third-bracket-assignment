# Better Auth Integration - Complete Startup Guide

## 🚀 Quick Start

### 1. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 2. Environment Setup

#### Backend Environment
Copy the Better Auth environment file:
```bash
cd backend
cp .env.better-auth .env
```

Edit `.env` if needed:
```env
BETTER_AUTH_SECRET=better-auth-secret-key-change-in-production
BETTER_AUTH_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
PORT=3000
NODE_ENV=development
```

#### Frontend Environment
Create or edit `frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:3000
```

### 3. Start the Applications

#### Option A: Start with Better Auth (Recommended)
```bash
# Terminal 1 - Backend with Better Auth
cd backend
npm run dev:better-auth

# Terminal 2 - Frontend
cd frontend
npm run dev
```

#### Option B: Start Original Backend
```bash
# Terminal 1 - Original Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 🔧 Configuration Details

### Better Auth Features Enabled

#### ✅ Authentication
- Email/Password sign up and sign in
- Session management with secure cookies
- Automatic session refresh
- Logout functionality

#### ✅ Security
- CSRF protection
- Secure cookies (httpOnly, sameSite)
- Password strength requirements (min 6 chars)
- Session expiration (7 days)

#### ✅ Developer Experience
- TypeScript support
- React hooks for easy integration
- Error handling with proper messages
- Loading states

### API Endpoints

#### Better Auth Endpoints
```
POST   /api/auth/sign-up/email     - Register new user
POST   /api/auth/sign-in/email     - Sign in
POST   /api/auth/sign-out          - Sign out
GET    /api/auth/get-session       - Get current session
DELETE /api/auth/session           - End session
GET    /api/auth/check             - Check auth status
```

#### Task Management Endpoints
```
GET    /api/tasks                  - Get all tasks
POST   /api/tasks                  - Create task
GET    /api/tasks/:id              - Get task by ID
PUT    /api/tasks/:id              - Update task
DELETE /api/tasks/:id              - Delete task
GET    /api/tasks/stats            - Get task statistics
```

## 🧪 Testing the Integration

### 1. Test Authentication Flow

#### Register New User
1. Navigate to `http://localhost:5173/register`
2. Fill in name, email, and password
3. Submit form
4. Should redirect to dashboard

#### Login
1. Navigate to `http://localhost:5173/login`
2. Use registered credentials
3. Submit form
4. Should redirect to dashboard

#### Session Persistence
1. Login successfully
2. Refresh page
3. Should remain logged in
4. Close browser and reopen
5. Should still be logged in (session valid for 7 days)

#### Logout
1. Click logout in navbar
2. Should redirect to login page
3. Try accessing protected routes
4. Should redirect back to login

### 2. Test Task Management

#### Create Task
1. Navigate to dashboard or tasks page
2. Click "Add Task" button
3. Fill task details
4. Save task
5. Should see new task in list

#### Update Task
1. Click edit button on a task
2. Modify task details
3. Save changes
4. Should see updated task

#### Delete Task
1. Click delete button on a task
2. Confirm deletion
3. Task should be removed from list

### 3. Test API Directly

#### Using curl
```bash
# Check health
curl http://localhost:3000/health

# Check auth status
curl http://localhost:3000/api/auth/check

# Get session (if logged in)
curl -b cookies.txt http://localhost:3000/api/auth/get-session
```

## 🔍 Debugging

### Common Issues

#### 1. CORS Errors
```bash
# Check if FRONTEND_URL matches your frontend URL
# In backend .env:
FRONTEND_URL=http://localhost:5173
```

#### 2. Authentication Not Working
```bash
# Check Better Auth configuration
# Ensure BETTER_AUTH_SECRET is set
# Check server logs for errors
```

#### 3. Session Issues
```bash
# Clear browser cookies
# Check browser developer tools > Application > Cookies
# Ensure cookies are being set correctly
```

#### 4. Frontend Not Connecting
```bash
# Check VITE_API_BASE_URL in frontend .env
# Ensure backend is running on correct port
# Check network tab in browser dev tools
```

### Debug Mode

#### Enable Detailed Logging
```bash
# In backend .env:
NODE_ENV=development
LOG_LEVEL=debug
```

#### Check Better Auth Configuration
```javascript
// Add to server for debugging
console.log('Better Auth Config:', {
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET ? 'Set' : 'Not Set',
  emailAndPassword: { enabled: true }
});
```

## 🚀 Production Deployment

### Environment Variables
```env
# Production .env
BETTER_AUTH_SECRET=your-super-secret-production-key
BETTER_AUTH_URL=https://yourdomain.com
FRONTEND_URL=https://your-frontend-domain.com
NODE_ENV=production
```

### Database Migration
- Replace memory adapter with PostgreSQL or MySQL
- Run database migrations
- Update configuration

### Security Considerations
- Use strong Better Auth secret
- Enable HTTPS
- Configure secure cookies
- Set up rate limiting
- Enable email verification

## 📚 Additional Resources

### Better Auth Documentation
- [Official Docs](https://better-auth.com/docs)
- [React Integration](https://better-auth.com/docs/react)
- [API Reference](https://better-auth.com/docs/reference)

### Common Integrations
- Social providers (Google, GitHub, etc.)
- Email verification
- Password reset
- Two-factor authentication
- Multi-tenant applications

## 🆘 Troubleshooting Checklist

- [ ] Backend and frontend are running
- [ ] Environment variables are set correctly
- [ ] CORS is configured properly
- [ ] Browser cookies are enabled
- [ ] No conflicting auth middleware
- [ ] Better Auth routes are not conflicting with custom routes
- [ ] Database connection is working (if using database adapter)

## 📝 Migration Notes

### From Custom Auth to Better Auth

#### What Changed
- Custom JWT → Better Auth session management
- Manual auth endpoints → Better Auth built-in endpoints
- Custom middleware → Better Auth middleware
- Manual token refresh → Automatic session management

#### What Stayed Same
- shadcn UI components
- Task management functionality
- Database structure
- API structure for tasks

#### Benefits Gained
- Enhanced security
- Better performance
- Type safety
- Extensibility
- Maintenance