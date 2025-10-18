# Data Model: Task Management System

**Purpose**: Database schema and entity relationships for the Task Management System
**Date**: 2025-10-16
**Database**: MongoDB with Mongoose ODM

## User Entity

### Purpose
Represents individual users who can create and manage their personal tasks.

### Schema Definition

```javascript
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
```

### Indexes
- **email**: Unique index for fast user lookup and authentication

### Validation Rules
- Name: Required, max 100 characters, trimmed
- Email: Required, unique, valid email format, lowercase
- Password: Required, minimum 8 characters (will be hashed with bcrypt)

### Relationships
- One-to-Many: User → Tasks (via userId foreign key in Task)

## Task Entity

### Purpose
Represents individual work items that users can create, manage, and organize.

### Schema Definition

```javascript
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  priority: {
    type: String,
    required: [true, 'Priority is required'],
    enum: {
      values: ['Low', 'Medium', 'High'],
      message: 'Priority must be Low, Medium, or High'
    },
    default: 'Medium'
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: {
      values: ['Todo', 'In Progress', 'Completed'],
      message: 'Status must be Todo, In Progress, or Completed'
    },
    default: 'Todo'
  },
  dueDate: {
    type: Date,
    validate: {
      validator: function(value) {
        return !value || value > new Date();
      },
      message: 'Due date must be in the future'
    }
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
```

### Indexes
- **userId**: Index for filtering tasks by user
- **status**: Index for filtering by task status
- **priority**: Index for filtering by priority level
- **title**: Text index for search functionality
- **userId + status**: Compound index for user-specific status filtering
- **userId + priority**: Compound index for user-specific priority filtering

### Validation Rules
- Title: Required, max 200 characters, trimmed
- Description: Optional, max 2000 characters, trimmed
- Priority: Required, enum (Low, Medium, High), default Medium
- Status: Required, enum (Todo, In Progress, Completed), default Todo
- Due Date: Optional, must be future date
- userId: Required, references User

### State Transitions
```
Todo → In Progress → Completed
  ↓           ↓           ↓
  └─────> Completed <─────┘
```

### Relationships
- Many-to-One: Task → User (via userId foreign key)

## Database Constraints

### Performance Constraints
- Maximum 1000 tasks per user (application-level validation)
- Search performance target: <1 second for 1000 tasks
- API response target: <200ms for database operations

### Data Integrity Rules
- Users can only access their own tasks (enforced by userId filtering)
- Email addresses must be unique across all users
- Task titles and descriptions have character limits enforced at database level

### Cascade Operations
- When a user is deleted, all their tasks should be deleted (soft delete recommended)

## Query Patterns

### Common Queries
1. **User Authentication**: Find user by email for login
2. **Task Listing**: Get all tasks for a specific user with optional filters
3. **Task Search**: Full-text search on task titles for a specific user
4. **Dashboard Stats**: Aggregate queries for task statistics per user
5. **Task CRUD**: Create, read, update, delete operations with user isolation

### Optimization Strategies
- Use pagination for large task lists
- Implement database indexing strategy for common filter combinations
- Consider materialized views for complex dashboard statistics

## Data Migration Strategy

### Initial Setup
1. Create users collection with email unique index
2. Create tasks collection with proper indexes
3. Seed database with test data for development

### Schema Evolution
- Use Mongoose schema versioning for future changes
- Implement backward compatibility for API changes
- Document migration scripts for schema updates

## Security Considerations

### Data Protection
- Passwords stored as bcrypt hashes, never plain text
- User data isolation enforced at query level
- Input validation at both application and database level
- Rate limiting on authentication endpoints

### Privacy
- Users can only access their own data
- No cross-user data sharing capabilities
- Audit logging for data access operations