import { body, param, query } from 'express-validator';

// User validation rules
export const validateUserRegistration = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/)
    .withMessage('Password must be at least 8 characters long and contain at least one letter and one number'),
];

export const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

// Task validation rules
export const validateTaskCreation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Description cannot exceed 2000 characters'),
  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be Low, Medium, or High'),
  body('status')
    .optional()
    .isIn(['Todo', 'In Progress', 'Completed'])
    .withMessage('Status must be Todo, In Progress, or Completed'),
  body('dueDate')
    .optional()
    .isISO8601()
    .toDate()
    .custom((value) => {
      if (value && value <= new Date()) {
        throw new Error('Due date must be in the future');
      }
      return true;
    }),
];

export const validateTaskUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Description cannot exceed 2000 characters'),
  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be Low, Medium, or High'),
  body('status')
    .optional()
    .isIn(['Todo', 'In Progress', 'Completed'])
    .withMessage('Status must be Todo, In Progress, or Completed'),
  body('dueDate')
    .optional()
    .isISO8601()
    .toDate()
    .custom((value) => {
      if (value && value <= new Date()) {
        throw new Error('Due date must be in the future');
      }
      return true;
    }),
];

// Task query validation
export const validateTaskQuery = [
  query('status')
    .optional()
    .isIn(['Todo', 'In Progress', 'Completed'])
    .withMessage('Status must be Todo, In Progress, or Completed'),
  query('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be Low, Medium, or High'),
  query('search')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Search term cannot exceed 100 characters'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
];

// ID validation
export const validateObjectId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format'),
];