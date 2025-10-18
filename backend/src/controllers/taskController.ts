import { Request, Response } from 'express';
import Task, { ITask } from '../models/Task';
import { AuthRequest } from '../middleware/auth';
import mongoose from 'mongoose';

interface CreateTaskRequest extends Request {
  body: {
    title: string;
    description?: string;
    priority?: 'Low' | 'Medium' | 'High';
    status?: 'Todo' | 'In Progress' | 'Completed';
    dueDate?: string;
  };
}

interface UpdateTaskRequest extends Request {
  body: {
    title?: string;
    description?: string;
    priority?: 'Low' | 'Medium' | 'High';
    status?: 'Todo' | 'In Progress' | 'Completed';
    dueDate?: string;
  };
}

interface TaskQuery {
  status?: string;
  priority?: string;
  search?: string;
  page?: string;
  limit?: string;
}

// Create a new task
export const createTask = async (req: CreateTaskRequest, res: Response): Promise<void> => {
  try {
    const { title, description, priority, status, dueDate } = req.body;
    const userId = (req as AuthRequest).user!._id;

    const taskData: any = {
      title,
      userId,
    };

    if (description !== undefined) {
      taskData.description = description;
    }

    if (priority !== undefined) {
      taskData.priority = priority;
    }

    if (status !== undefined) {
      taskData.status = status;
    }

    if (dueDate !== undefined) {
      taskData.dueDate = new Date(dueDate);
    }

    const task = new Task(taskData);
    await task.save();

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: {
        task: {
          id: task._id,
          title: task.title,
          description: task.description,
          priority: task.priority,
          status: task.status,
          dueDate: task.dueDate,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        },
      },
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
      },
    });
  }
};

// Get all tasks for the authenticated user with filtering and pagination
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as AuthRequest).user!._id;
    const {
      status,
      priority,
      search,
      page = '1',
      limit = '20',
    } = req.query as TaskQuery;

    // Build query
    const query: any = { userId };

    // Add filters
    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    // Add search
    if (search) {
      query.$text = { $search: search };
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Execute query with pagination
    const [tasks, total] = await Promise.all([
      Task.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Task.countDocuments(query),
    ]);

    const formattedTasks = tasks.map(task => ({
      id: task._id,
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }));

    res.status(200).json({
      success: true,
      data: {
        tasks: formattedTasks,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
      },
    });
  }
};

// Get a specific task by ID
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as AuthRequest).user!._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({
        success: false,
        error: {
          code: 'RESOURCE_NOT_FOUND',
          message: 'Task not found',
        },
      });
      return;
    }

    const task = await Task.findOne({ _id: id, userId }).lean();

    if (!task) {
      res.status(404).json({
        success: false,
        error: {
          code: 'RESOURCE_NOT_FOUND',
          message: 'Task not found',
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        task: {
          id: task._id,
          title: task.title,
          description: task.description,
          priority: task.priority,
          status: task.status,
          dueDate: task.dueDate,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        },
      },
    });
  } catch (error) {
    console.error('Get task by ID error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
      },
    });
  }
};

// Update a task
export const updateTask = async (req: UpdateTaskRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as AuthRequest).user!._id;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({
        success: false,
        error: {
          code: 'RESOURCE_NOT_FOUND',
          message: 'Task not found',
        },
      });
      return;
    }

    // Prepare update object
    const updateObj: any = {};
    if (updateData.title !== undefined) {
      updateObj.title = updateData.title;
    }
    if (updateData.description !== undefined) {
      updateObj.description = updateData.description;
    }
    if (updateData.priority !== undefined) {
      updateObj.priority = updateData.priority;
    }
    if (updateData.status !== undefined) {
      updateObj.status = updateData.status;
    }
    if (updateData.dueDate !== undefined) {
      updateObj.dueDate = updateData.dueDate ? new Date(updateData.dueDate) : null;
    }

    const task = await Task.findOneAndUpdate(
      { _id: id, userId },
      updateObj,
      { new: true, runValidators: true }
    ).lean();

    if (!task) {
      res.status(404).json({
        success: false,
        error: {
          code: 'RESOURCE_NOT_FOUND',
          message: 'Task not found',
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: {
        task: {
          id: task._id,
          title: task.title,
          description: task.description,
          priority: task.priority,
          status: task.status,
          dueDate: task.dueDate,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        },
      },
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
      },
    });
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as AuthRequest).user!._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({
        success: false,
        error: {
          code: 'RESOURCE_NOT_FOUND',
          message: 'Task not found',
        },
      });
      return;
    }

    const task = await Task.findOneAndDelete({ _id: id, userId });

    if (!task) {
      res.status(404).json({
        success: false,
        error: {
          code: 'RESOURCE_NOT_FOUND',
          message: 'Task not found',
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
      },
    });
  }
};

// Get task statistics for dashboard
export const getTaskStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as AuthRequest).user!._id;

    const [
      totalTasks,
      completedTasks,
      inProgressTasks,
      todoTasks,
      highPriorityTasks,
      mediumPriorityTasks,
      lowPriorityTasks,
    ] = await Promise.all([
      Task.countDocuments({ userId }),
      Task.countDocuments({ userId, status: 'Completed' }),
      Task.countDocuments({ userId, status: 'In Progress' }),
      Task.countDocuments({ userId, status: 'Todo' }),
      Task.countDocuments({ userId, priority: 'High' }),
      Task.countDocuments({ userId, priority: 'Medium' }),
      Task.countDocuments({ userId, priority: 'Low' }),
    ]);

    const pendingTasks = totalTasks - completedTasks;

    const statistics = {
      total: totalTasks,
      completed: completedTasks,
      pending: pendingTasks,
      byPriority: {
        Low: lowPriorityTasks,
        Medium: mediumPriorityTasks,
        High: highPriorityTasks,
      },
      byStatus: {
        Todo: todoTasks,
        'In Progress': inProgressTasks,
        Completed: completedTasks,
      },
    };

    res.status(200).json({
      success: true,
      data: {
        statistics,
      },
    });
  } catch (error) {
    console.error('Get task stats error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
      },
    });
  }
};