# Quickstart Guide: Task Management System

**Purpose**: Development setup and getting started instructions
**Date**: 2025-10-16
**Project**: Task Management System (TaskFlow)

## Prerequisites

### System Requirements
- Node.js 18+ (LTS version recommended)
- MongoDB 5.0+ (local installation or MongoDB Atlas)
- Git
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Development Tools (Recommended)
- VS Code with extensions:
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - ESLint
  - MongoDB for VS Code
- Postman or Insomnia for API testing
- MongoDB Compass for database management

## Project Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd task-management-system
```

### 2. Install Dependencies

#### Backend Dependencies
```bash
cd backend
npm install
```

#### Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 3. Environment Configuration

#### Backend Environment (.env)
Create `.env` file in `backend/` directory:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/taskflow
MONGODB_TEST_URI=mongodb://localhost:27017/taskflow_test

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Frontend Environment (.env)
Create `.env` file in `frontend/` directory:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=TaskFlow
VITE_SESSION_TIMEOUT_WARNING=300000
```

### 4. Database Setup

#### Local MongoDB
```bash
# Start MongoDB service
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS

# Create database (optional, will be created automatically)
mongosh
use taskflow
```

#### MongoDB Atlas (Cloud)
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create new cluster (M0 free tier)
3. Create database user with read/write permissions
4. Add your IP address to access list
5. Get connection string and update `MONGODB_URI` in `.env`

## Running the Application

### Development Mode

#### Start Backend Server
```bash
cd backend
npm run dev
```
Server will run on `http://localhost:3000`

#### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
Application will run on `http://localhost:5173`

### Production Mode

#### Build Frontend
```bash
cd frontend
npm run build
```

#### Start Production Server
```bash
cd backend
npm start
```

## Testing

### Backend Tests
```bash
cd backend

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- auth.test.js
```

### Frontend Tests
```bash
cd frontend

# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests with coverage
npm test:coverage
```

## API Testing with Postman

### Import Collection
1. Open Postman
2. Click "Import" → "Link"
3. Paste: `<repository-url>/contracts/postman-collection.json`
4. Set environment variables:
   - `baseUrl`: `http://localhost:3000/api`
   - `token`: (will be set automatically after login)

### Test Authentication Flow
1. **Register User**: `POST /auth/register`
2. **Login**: `POST /auth/login` (copy token from response)
3. **Set Token**: Add `Authorization: Bearer <token>` header
4. **Test Protected Routes**: Try accessing `/tasks`

## Database Seeding (Optional)

### Seed Test Data
```bash
cd backend
npm run seed
```

This creates:
- 3 test users with known credentials
- Sample tasks for each user
- Various task statuses and priorities

### Reset Database
```bash
cd backend
npm run db:reset
```

## Code Quality Tools

### Linting and Formatting
```bash
# Backend
cd backend
npm run lint
npm run lint:fix
npm run format

# Frontend
cd frontend
npm run lint
npm run lint:fix
npm run format
```

### Pre-commit Hooks
```bash
# Install husky hooks
npm run prepare

# Tests will run automatically before commits
```

## Common Development Workflows

### Adding New API Endpoint
1. Define route in `backend/routes/`
2. Implement controller logic in `backend/controllers/`
3. Add validation using express-validator
4. Write tests in `backend/tests/`
5. Update API contract in `contracts/api-contract.md`

### Adding New Frontend Component
1. Create component in `frontend/src/components/`
2. Follow existing naming convention (PascalCase)
3. Add PropTypes or TypeScript interfaces
4. Write component tests
5. Update documentation

### Database Schema Changes
1. Update Mongoose schema in `backend/models/`
2. Write migration script if needed
3. Update validation rules
4. Regenerate API contract
5. Update tests

## Debugging

### Backend Debugging
```bash
cd backend
npm run dev:debug
```
Node.js debugger will be available on port 9229

### Frontend Debugging
- Use browser DevTools (F12)
- React DevTools extension recommended
- Redux DevTools (if using Redux)

### Database Debugging
```bash
# Connect to MongoDB
mongosh taskflow

# View collections
show collections

# Query users
db.users.find().pretty()

# Query tasks
db.tasks.find().pretty()
```

## Deployment Preparation

### Environment Variables
Create `.env.production` with production-specific values:
- Strong JWT secrets
- Production database URLs
- SSL certificates
- Rate limiting appropriate for production

### Build Process
```bash
# Frontend build
cd frontend && npm run build

# Backend production setup
cd backend && npm run build
```

### Health Checks
- Backend: `GET /api/health`
- Database: `GET /api/health/db`
- Frontend: Application should load without console errors

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port 3000
lsof -ti:3000

# Kill process
kill -9 <PID>
```

#### MongoDB Connection Issues
- Verify MongoDB service is running
- Check connection string in `.env`
- Ensure network/firewall allows connection
- Try connecting with MongoDB Compass

#### JWT Token Issues
- Verify JWT_SECRET is set in `.env`
- Check token expiration (24 hours)
- Ensure token is sent in Authorization header

#### CORS Issues
- Verify FRONTEND_URL in backend `.env`
- Check that frontend is making requests to correct port
- Ensure CORS middleware is configured properly

### Getting Help
- Check console logs for detailed error messages
- Review API contract documentation
- Verify environment variables are correctly set
- Ensure all dependencies are installed

## Next Steps

After successful setup:
1. Review the data model in `data-model.md`
2. Study API contracts in `contracts/api-contract.md`
3. Run tests to verify everything works
4. Start implementing features following task breakdown in `tasks.md`
5. Follow development workflow guidelines in TaskFlow Constitution