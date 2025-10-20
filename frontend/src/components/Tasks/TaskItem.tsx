import React, { useState } from 'react';
import { taskAPI } from '../../services/betterAuthApi';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Separator } from '../ui/separator';
import { cn } from '../../lib/utils';

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Todo' | 'In Progress' | 'Completed';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onUpdate: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Completed': return 'default';
      case 'In Progress': return 'secondary';
      case 'Todo': return 'outline';
      default: return 'outline';
    }
  };

  const isOverdue = task?.dueDate && new Date(task?.dueDate) < new Date() && task?.status !== 'Completed';

  const handleStatusChange = async (newStatus: string) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await taskAPI.update(task?.id, { status: newStatus });
      onUpdate(response.data.task);
    } catch (error) {
      console.error('Failed to update task status:', error);
      // Revert the status on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (isLoading) return;

    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    setIsLoading(true);
    try {
      await taskAPI.delete(task?.id);
      onDelete(task?.id);
    } catch (error) {
      console.error('Failed to delete task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className={cn(
      "transition-all duration-200 ",
      isOverdue && "border-2 border-red-500 shadow-red-100",
      task?.status === 'Completed' && "bg-muted/50"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <CardTitle className="text-lg font-semibold">{task?.title}</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge variant={getPriorityVariant(task?.priority)}>
                {task?.priority}
              </Badge>
              <Badge variant={getStatusVariant(task?.status)}>
                {task?.status}
              </Badge>
              {task?.dueDate && (
                <Badge
                  variant={isOverdue ? "destructive" : "outline"}
                  className={cn(isOverdue && "animate-pulse")}
                >
                  📅 {formatDate(task?.dueDate)}
                  {isOverdue && ' (Overdue)'}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              disabled={isLoading}
              className="h-8 w-8 p-0"
            >
              ✏️
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={isLoading}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              🗑️
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        {task?.description && (
          <Collapsible open={showDescription} onOpenChange={setShowDescription}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left h-auto p-0 hover:bg-transparent"
              >
                {showDescription ? '▼' : '▶'} Description
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <p className="text-sm text-muted-foreground pl-4 border-l-2 border-muted">
                {task?.description}
              </p>
            </CollapsibleContent>
          </Collapsible>
        )}

        <Separator />

        {/* Status Controls */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Change Status:</p>
          <div className="flex flex-wrap gap-2">
            {['Todo', 'In Progress', 'Completed'].map((status) => (
              <Button
                key={status}
                variant={task?.status === status ? "default" : "outline"}
                size="sm"
                onClick={() => handleStatusChange(status)}
                disabled={isLoading || task?.status === status}
                className="text-xs"
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Footer */}
        <div className="text-xs text-muted-foreground">
          Created: {formatDate(task?.createdAt)} | Updated: {formatDate(task?.updatedAt)}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskItem;