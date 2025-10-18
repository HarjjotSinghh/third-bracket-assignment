# 🚀 Official Better Auth Express Integration

This guide documents the **official Better Auth integration** with Express.js following the [Better Auth documentation](https://better-auth.com/docs/integrations/express).

## 📋 Overview

We've integrated Better Auth with your Express.js backend using the official `toNodeHandler` approach, which provides the most robust and recommended integration method.

## 🔧 Key Features of Official Integration

### ✅ **Proper Handler Mounting**
- Uses `toNodeHandler(auth)` for Express.js compatibility
- Better Auth handler mounted **BEFORE** Express middleware
- Prevents JSON parsing conflicts with Better Auth

### ✅ **ESM Support**
- Full ECMAScript Modules support
- Proper TypeScript configuration
- Modern import/export syntax

### ✅ **CORS Configuration**
- Proper CORS setup for Better Auth
- Credential support for cookies
- Multiple frontend origin support

### ✅ **Session Management**
- `fromNodeHeaders()` helper for session retrieval
- Proper session endpoints
- Secure cookie handling

## 📁 Files Created/Modified

### **Backend Files**
```
backend/
├── src/
│   ├── auth.ts                           # Official Better Auth configuration
│   ├── server-official.ts                # Official Express integration
│   ├── config/db.js                      # Database connection (preserved)
│   ├── middleware/errorHandler.js         # Error handling (preserved)
│   └── routes/tasks.js                   # Task routes (preserved)
├── package.json                          # Updated with ESM support
├── tsconfig.json                         # Updated for ESNext modules
└── .env.better-auth                      # Environment configuration
```

### **Frontend Files** (No changes needed)
```
frontend/
├── src/
│   ├── lib/auth-client.ts                # Better Auth client (already configured)
│   └── context/BetterAuthContext.tsx     # Better Auth context (already configured)
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Setup
Copy and configure the environment file:
```bash
cp .env.better-auth .env
```

### 3. Start the Server
```bash
# Option 1: Official Better Auth Integration (Recommended)
npm run dev:official

# Option 2: Custom Integration
npm run dev:better-auth

# Option 3: Original Server
npm run dev
```

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔗 API Endpoints

### Better Auth Endpoints (Official)
```
POST   /api/auth/sign-up/email     # Register new user
POST   /api/auth/sign-in/email     # Sign in with email/password
POST   /api/auth/sign-out          # Sign out
GET    /api/auth/get-session       # Get current session
DELETE /api/auth/session           # End current session
GET    /api/auth/ok                # Health check for Better Auth
```

### Session Management Endpoints
```
GET    /api/me                      # Get user session (custom helper)
GET    /health                      # Server health check
```

### Task Management Endpoints (Preserved)
```
GET    /api/tasks                  # Get all tasks
POST   /api/tasks                  # Create new task
GET    /api/tasks/:id              # Get task by ID
PUT    /api/tasks/:id              # Update task
DELETE /api/tasks/:id              # Delete task
GET    /api/tasks/stats            # Get task statistics
```

## 🔧 Configuration Details

### Better Auth Configuration (`src/auth.ts`)
```typescript
export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET || "better-auth-secret-change-in-production",

  database: memoryAdapter({
    user: {
      additionalFields: {
        name: { type: "string", required: true },
        emailVerified: { type: "boolean", default: false },
      },
    },
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 6,
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: { enabled: true, maxAge: 5 * 60 },
  },
});
```

### Express Server Integration (`src/server-official.ts`)
```typescript
// 1. Mount Better Auth handler FIRST
app.all("/api/auth/*", toNodeHandler(auth));

// 2. Configure CORS for Better Auth
app.use(cors({
  origin: [process.env.FRONTEND_URL || "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

// 3. Add Express middleware AFTER Better Auth
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Session management endpoint
app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});
```

## 🧪 Testing the Integration

### 1. Health Checks
```bash
# Check if Better Auth is running
curl http://localhost:3000/api/auth/ok

# Check server health
curl http://localhost:3000/health
```

### 2. Authentication Flow
```bash
# Register user
curl -X POST http://localhost:3000/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Sign in
curl -X POST http://localhost:3000/api/auth/sign-in/email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get session (after login)
curl -X GET http://localhost:3000/api/auth/get-session \
  -H "Cookie: better-auth-session-token=your-session-token"

# Custom session endpoint
curl -X GET http://localhost:3000/api/me \
  -H "Cookie: better-auth-session-token=your-session-token"
```

### 3. Frontend Integration Test
1. Navigate to `http://localhost:5173/register`
2. Register a new user
3. Verify redirect to dashboard
4. Test login/logout functionality
5. Check session persistence

## 🔍 Key Differences from Custom Integration

| Feature | Custom Integration | Official Integration |
|---------|-------------------|---------------------|
| Handler | Manual Express setup | `toNodeHandler(auth)` |
| JSON Parsing | Applied globally | Applied **after** Better Auth |
| Session Retrieval | Custom implementation | `fromNodeHeaders()` helper |
| CORS | Basic setup | Better Auth optimized |
| Error Handling | Manual | Built-in Better Auth errors |
| Type Safety | Partial | Full TypeScript support |

## 🚨 Important Notes

### 1. Handler Mounting Order
```typescript
// ✅ CORRECT - Better Auth first
app.all("/api/auth/*", toNodeHandler(auth));
app.use(express.json());

// ❌ WRONG - JSON parsing first breaks Better Auth
app.use(express.json());
app.all("/api/auth/*", toNodeHandler(auth));
```

### 2. ESM Requirements
- Package.json must have `"type": "module"`
- TypeScript config must use `"module": "ESNext"`
- Use `import/export` instead of `require/module.exports`

### 3. CORS Configuration
- Must include `credentials: true`
- Must list all frontend origins
- Must be configured **before** route handlers

### 4. Environment Variables
```env
BETTER_AUTH_SECRET=your-super-secret-key
BETTER_AUTH_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

## 🔧 Debugging

### Common Issues

#### 1. Better Auth Handler Not Working
```bash
# Check handler mounting order
# Ensure no middleware runs before Better Auth handler
# Verify ESM configuration
```

#### 2. CORS Issues
```bash
# Check origin configuration
# Verify credentials: true
# Check frontend URL in environment variables
```

#### 3. Session Not Persisting
```bash
# Check cookie configuration
# Verify domain settings
# Check browser developer tools for cookies
```

#### 4. TypeScript Errors
```bash
# Check tsconfig.json module settings
# Verify ESM configuration
# Check import/export syntax
```

### Debug Mode
```typescript
// Add to server for debugging
console.log("Better Auth Config:", {
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET ? "Set" : "Not Set",
  emailAndPassword: { enabled: true }
});

// Log headers for debugging
app.use((req, res, next) => {
  console.log("Headers:", req.headers);
  next();
});
```

## 🚀 Production Deployment

### Environment Configuration
```env
# Production .env
BETTER_AUTH_SECRET=your-super-secure-production-secret
BETTER_AUTH_URL=https://yourdomain.com
FRONTEND_URL=https://your-frontend-domain.com
NODE_ENV=production
```

### Security Considerations
- Use HTTPS in production
- Set secure cookie flags
- Configure proper CORS origins
- Use strong secret keys
- Enable rate limiting

### Database Migration
- Replace memory adapter with PostgreSQL
- Install Better Auth database adapter
- Run database migrations
- Update configuration

## 📚 Additional Resources

### Official Documentation
- [Better Auth Express Integration](https://better-auth.com/docs/integrations/express)
- [Better Auth Node.js Reference](https://better-auth.com/docs/reference/node)
- [Better Auth Configuration](https://better-auth.com/docs/configuration)

### Advanced Features
- Social providers (Google, GitHub, etc.)
- Email verification
- Password reset
- Two-factor authentication
- Multi-tenant applications

## 🎯 Benefits of Official Integration

### ✅ **Reliability**
- Official Better Auth integration method
- Tested and maintained by Better Auth team
- Compatible with all Better Auth features

### ✅ **Performance**
- Optimized handler mounting
- Efficient session management
- Proper middleware ordering

### ✅ **Maintainability**
- Clean, standardized code
- Easy to upgrade Better Auth versions
- Follows best practices

### ✅ **Security**
- Built-in security features
- Proper cookie handling
- CSRF protection

## 🎉 Conclusion

The official Better Auth integration provides the most robust, secure, and maintainable authentication solution for your Express.js application. It follows Better Auth best practices and ensures compatibility with all current and future Better Auth features.

**Ready for production deployment! 🚀**