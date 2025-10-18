# Task Management System

A full-stack task management application built with Node.js, Express, React, and MongoDB. This project implements secure user authentication and comprehensive task lifecycle management following Test-Driven Development principles.

## 🚀 Features

### User Authentication (User Story 1) ✅
- **Secure Registration**: User signup with email validation and password hashing
- **JWT Authentication**: Secure login with JSON Web Tokens and 24-hour sessions
- **Protected Routes**: API endpoints and frontend routes protected by authentication
- **Session Management**: Automatic token refresh and logout functionality

### Task Management (User Story 2) 🚧
- **Task CRUD**: Create, read, update, and delete personal tasks
- **Task Properties**: Title, description, priority levels, and status tracking
- **Due Dates**: Optional due date validation with future date constraints
- **User Isolation**: Each user can only access their own tasks

### Organization & Analytics (User Story 3) 📋
- **Task Filtering**: Filter by status (Todo, In Progress, Completed) and priority
- **Search Functionality**: Full-text search across task titles and descriptions
- **Dashboard Statistics**: Task analytics and completion metrics
- **Responsive Design**: Mobile-friendly interface for all devices

## 🛠 Tech Stack

### Backend
- **Node.js 18+**: JavaScript runtime environment
- **Express.js**: Web application framework
- **TypeScript**: Type-safe JavaScript development
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT**: Authentication and session management
- **bcryptjs**: Password hashing and security
- **express-validator**: Input validation and sanitization

### Frontend
- **React 18+**: User interface library
- **TypeScript**: Type-safe frontend development
- **Vite**: Fast development build tool
- **React Router**: Client-side routing
- **React Context**: State management for authentication
- **Axios**: HTTP client for API communication
- **React Toastify**: User notification system

### Testing
- **Jest**: JavaScript testing framework
- **React Testing Library**: React component testing
- **Supertest**: API endpoint testing
- **MongoDB Memory Server**: In-memory database for testing

## 📋 System Requirements

- **Node.js**: Version 18.0.0 or higher (LTS recommended)
- **MongoDB**: Version 5.0+ (local installation or MongoDB Atlas)
- **npm**: Version 8.0.0 or higher
- **Git**: For version control

## 🚀 Quick Start

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

### 5. Run the Application

#### Development Mode

**Start Backend Server**:
```bash
cd backend
npm run dev
```
Server will run on `http://localhost:3000`

**Start Frontend Development Server**:
```bash
cd frontend
npm run dev
```
Application will run on `http://localhost:5173`

### 6. Test the Application

#### Backend Tests
```bash
cd backend

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --testPathPatterns=auth.test.ts
```

#### Frontend Tests
```bash
cd frontend

# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests with coverage
npm test:coverage
```

## 📊 Project Structure

```
task-management-system/
├── backend/                    # Node.js/Express API
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   ├── controllers/       # Request handlers
│   │   ├── middleware/        # Custom middleware
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # API routes
│   │   ├── validation/       # Input validation rules
│   │   └── tests/            # Test files
│   ├── .env.example          # Environment template
│   ├── package.json          # Dependencies and scripts
│   └── tsconfig.json         # TypeScript configuration
├── frontend/                  # React application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── context/          # Context providers
│   │   ├── services/         # API service layer
│   │   └── test/             # Test setup
│   ├── .env.example          # Environment template
│   ├── package.json          # Dependencies and scripts
│   └── vite.config.ts        # Vite configuration
├── specs/                     # Feature specifications
│   └── 001-task-management/   # Task management feature spec
└── README.md                  # This file
```

## 🔧 Available Scripts

### Backend Scripts
```bash
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript to JavaScript
npm start           # Start production server
npm test            # Run test suite
npm run test:coverage # Run tests with coverage report
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint issues
npm run format      # Format code with Prettier
```

### Frontend Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm test            # Run test suite
npm test:watch      # Run tests in watch mode
npm test:coverage   # Run tests with coverage
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint issues
```

## 🧪 Testing

This project follows **Test-Driven Development (TDD)** principles with comprehensive test coverage:

### Test Categories
- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test API endpoints and database interactions
- **Component Tests**: Test React components and user interactions
- **End-to-End Tests**: Test complete user workflows

### Coverage Requirements
- **Minimum Coverage**: 80% code coverage required
- **Critical Path Coverage**: 100% coverage for authentication and security features

### Running Tests
```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test

# Coverage reports
npm run test:coverage
```

## 🔒 Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure session management with configurable expiration
- **Password Hashing**: bcrypt encryption with salt rounds
- **Input Validation**: Comprehensive validation using express-validator
- **Rate Limiting**: Protection against brute force attacks
- **CORS Configuration**: Cross-origin resource sharing security

### Data Protection
- **User Isolation**: Each user can only access their own data
- **Input Sanitization**: Protection against XSS and injection attacks
- **Environment Variables**: Secure configuration management
- **Error Handling**: Secure error responses without information leakage

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Verify token and get user info

### Task Endpoints (Protected)
- `GET /api/tasks` - Get all tasks for authenticated user
- `GET /api/tasks/:id` - Get specific task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/stats` - Get dashboard statistics

### Response Format
All API responses follow a consistent format:
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

Error responses:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

## 🚀 Deployment

### Production Build
```bash
# Build frontend
cd frontend && npm run build

# Build backend
cd ../backend && npm run build

# Start production server
npm start
```

### Environment Variables for Production
Create `.env.production` with production-specific values:
- Strong JWT secrets
- Production database URLs
- SSL certificates
- Rate limiting appropriate for production

### Health Checks
- Backend: `GET /health`
- Database: `GET /health/db`
- Frontend: Application loads without console errors

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow **Test-Driven Development** (TDD) approach
- Write tests **before** implementation code
- Maintain **80%+ test coverage**
- Follow **TypeScript** best practices
- Use **ESLint** and **Prettier** for code formatting

## 📝 License

This project is licensed under the ISC License.

## 🆘 Troubleshooting

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

#### JWT Token Issues
- Verify `JWT_SECRET` is set in `.env`
- Check token expiration (24 hours)
- Ensure token is sent in Authorization header

#### Frontend Build Issues
- Clear node_modules and reinstall
- Check environment variables
- Verify all dependencies are installed

### Getting Help
- Check console logs for detailed error messages
- Review API documentation for correct endpoints
- Verify environment variables are correctly set
- Ensure all dependencies are installed

## 📊 Project Status

### ✅ Completed Features
- [x] Project setup and configuration
- [x] User authentication system
- [x] Backend API structure
- [x] Frontend routing and navigation
- [x] Database models and relationships
- [x] Testing infrastructure
- [x] Security implementation

### 🚧 In Progress
- [x] Task CRUD operations
- [x] Task filtering and search
- [x] Dashboard statistics
- [x] UI/UX polish and optimization

### 📋 Planned Features
- [ ] Email notifications for task reminders
- [ ] Task categories and labels
- [ ] Team collaboration features
- [ ] Mobile application
- [ ] Advanced analytics and reporting
- [ ] Integration with third-party services

---

**TaskFlow** - Streamline your productivity with intelligent task management.