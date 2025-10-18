import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Todo' | 'In Progress' | 'Completed';
  dueDate?: Date;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>({
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
      validator: function(value: Date) {
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

// Update the updatedAt field on save
taskSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Indexes for performance
taskSchema.index({ userId: 1 });
taskSchema.index({ status: 1 });
taskSchema.index({ priority: 1 });
taskSchema.index({ title: 'text' });
taskSchema.index({ userId: 1, status: 1 });
taskSchema.index({ userId: 1, priority: 1 });

export default mongoose.model<ITask>('Task', taskSchema);