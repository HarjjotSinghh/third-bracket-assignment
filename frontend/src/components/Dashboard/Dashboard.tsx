import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskAPI } from '../../services/api';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  CheckCircle,
  Clock,
  Plus,
  TrendingUp,
  Calendar,
  AlertCircle,
  FileCheck,
} from 'lucide-react';

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

interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  inProgress: number;
  highPriority: number;
  completionRate: number;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<TaskStats>({
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
    highPriority: 0,
    completionRate: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getAll();
      const tasksData = response.data.tasks || [];
      setTasks(tasksData);
      calculateStats(tasksData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (tasksData: Task[]) => {
    const total = tasksData.length;
    const completed = tasksData.filter(task => task.status === 'Completed').length;
    const pending = tasksData.filter(task => task.status === 'Todo').length;
    const inProgress = tasksData.filter(task => task.status === 'In Progress').length;
    const highPriority = tasksData.filter(task => task.priority === 'High').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    setStats({
      total,
      completed,
      pending,
      inProgress,
      highPriority,
      completionRate,
    });
  };

  const getRecentTasks = () => {
    return tasks
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  };

  const getOverdueTasks = () => {
    const now = new Date();
    return tasks.filter(task =>
      task.dueDate &&
      new Date(task.dueDate) < now &&
      task.status !== 'Completed'
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your tasks.
            </p>
          </div>
          <Button
            onClick={() => navigate('/tasks')}
            className="bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Manage Tasks
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                All tasks in your system
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <p className="text-xs text-muted-foreground">
                {stats.completionRate}% completion rate
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.inProgress}</div>
              <p className="text-xs text-muted-foreground">
                Currently being worked on
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.highPriority}</div>
              <p className="text-xs text-muted-foreground">
                Tasks needing attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span className="font-medium">{stats.completionRate}%</span>
              </div>
              <Progress value={stats.completionRate} className="h-2" />
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-600">{stats.pending}</div>
                <div className="text-xs text-muted-foreground">To Do</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{stats.inProgress}</div>
                <div className="text-xs text-muted-foreground">In Progress</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Tasks
              </CardTitle>
              <CardDescription>
                Your most recently created tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              {getRecentTasks().length > 0 ? (
                <div className="space-y-3">
                  {getRecentTasks().map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{task.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={
                              task.priority === 'High' ? 'destructive' :
                              task.priority === 'Medium' ? 'default' : 'secondary'
                            }
                            className="text-xs"
                          >
                            {task.priority}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {task.status}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate('/tasks')}
                      >
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No tasks yet</p>
                  <Button onClick={() => navigate('/tasks')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Task
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Overdue Tasks Alert */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-5 w-5" />
                Overdue Tasks
              </CardTitle>
              <CardDescription>
                Tasks that need your immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              {getOverdueTasks().length > 0 ? (
                <div className="space-y-3">
                  {getOverdueTasks().map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-red-900">{task.title}</h4>
                        <p className="text-xs text-red-600 mt-1">
                          Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => navigate('/tasks')}
                      >
                        Update
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <p className="text-muted-foreground">Great job! No overdue tasks.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;