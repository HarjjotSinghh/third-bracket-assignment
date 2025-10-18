import React from 'react';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Search, Filter, X } from 'lucide-react';

interface TaskFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  priorityFilter: string;
  onPriorityFilterChange: (value: string) => void;
  activeFiltersCount: number;
  onClearFilters: () => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  activeFiltersCount,
  onClearFilters,
}) => {
  const hasActiveFilters = activeFiltersCount > 0;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search tasks by title or description..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>

        <div className="flex flex-wrap gap-3 flex-1">
          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Todo">To Do</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          {/* Priority Filter */}
          <Select value={priorityFilter} onValueChange={onPriorityFilterChange}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <X className="mr-1 h-3 w-3" />
              Clear Filters
            </Button>
          )}
        </div>

        {/* Active Filters Badge */}
        {hasActiveFilters && (
          <Badge variant="secondary" className="text-xs">
            {activeFiltersCount} active
          </Badge>
        )}
      </div>
    </div>
  );
};

export default TaskFilters;