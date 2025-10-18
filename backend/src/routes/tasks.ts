import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats,
} from '../controllers/taskController';
import { validate, validateTaskCreation, validateTaskUpdate, validateTaskQuery, validateObjectId } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Apply authentication middleware to all task routes
router.use(authenticateToken);

// Create a new task
router.post('/', validate(validateTaskCreation), createTask);

// Get all tasks for the authenticated user with filtering and pagination
router.get('/', validate(validateTaskQuery), getTasks);

// Get task statistics for dashboard
router.get('/stats', getTaskStats);

// Get a specific task by ID
router.get('/:id', validate([validateObjectId]), getTaskById);

// Update a task
router.put('/:id', validate([validateObjectId, validateTaskUpdate]), updateTask);

// Delete a task
router.delete('/:id', validate([validateObjectId]), deleteTask);

export default router;