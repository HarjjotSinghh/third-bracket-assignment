var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { taskAPI } from '../../services/betterAuthApi';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import TaskFilters from './TaskFilters';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Loader2, Plus, Inbox, Search } from 'lucide-react';
var TaskList = function () {
    var _a = useState([]), tasks = _a[0], setTasks = _a[1];
    var _b = useState([]), filteredTasks = _b[0], setFilteredTasks = _b[1];
    var _c = useState(true), isLoading = _c[0], setIsLoading = _c[1];
    var _d = useState(false), isFormOpen = _d[0], setIsFormOpen = _d[1];
    var _e = useState(null), editingTask = _e[0], setEditingTask = _e[1];
    // Filter states
    var _f = useState(''), searchTerm = _f[0], setSearchTerm = _f[1];
    var _g = useState('all'), statusFilter = _g[0], setStatusFilter = _g[1];
    var _h = useState('all'), priorityFilter = _h[0], setPriorityFilter = _h[1];
    useEffect(function () {
        fetchTasks();
    }, []);
    useEffect(function () {
        filterTasks();
    }, [tasks, searchTerm, statusFilter, priorityFilter]); // eslint-disable-line react-hooks/exhaustive-deps
    var fetchTasks = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    return [4 /*yield*/, taskAPI.getAll()];
                case 1:
                    response = _a.sent();
                    setTasks(response.data.tasks || []);
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error fetching tasks:', error_1);
                    return [3 /*break*/, 4];
                case 3:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var filterTasks = function () {
        var filtered = __spreadArray([], tasks, true);
        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(function (task) {
                return task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
            });
        }
        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(function (task) { return task.status === statusFilter; });
        }
        // Priority filter
        if (priorityFilter !== 'all') {
            filtered = filtered.filter(function (task) { return task.priority === priorityFilter; });
        }
        setFilteredTasks(filtered);
    };
    var handleCreateTask = function () {
        setEditingTask(null);
        setIsFormOpen(true);
    };
    var handleEditTask = function (task) {
        setEditingTask(task);
        setIsFormOpen(true);
    };
    var handleDeleteTask = function (taskId) {
        setTasks(function (prev) { return prev.filter(function (task) { return task.id !== taskId; }); });
    };
    var handleUpdateTask = function (updatedTask) {
        setTasks(function (prev) {
            return prev.map(function (task) { return (task.id === updatedTask.id ? updatedTask : task); });
        });
    };
    var handleTaskSubmit = function (newTask) {
        if (editingTask) {
            handleUpdateTask(newTask);
        }
        else {
            setTasks(function (prev) { return __spreadArray([newTask], prev, true); });
        }
    };
    var handleClearFilters = function () {
        setSearchTerm('');
        setStatusFilter('all');
        setPriorityFilter('all');
    };
    var getActiveFiltersCount = function () {
        var count = 0;
        if (searchTerm)
            count++;
        if (statusFilter !== 'all')
            count++;
        if (priorityFilter !== 'all')
            count++;
        return count;
    };
    var getTaskStats = function () {
        var total = tasks.length;
        var completed = tasks.filter(function (task) { return task.status === 'Completed'; }).length;
        var inProgress = tasks.filter(function (task) { return task.status === 'In Progress'; }).length;
        var todo = tasks.filter(function (task) { return task.status === 'Todo'; }).length;
        return { total: total, completed: completed, inProgress: inProgress, todo: todo };
    };
    var stats = getTaskStats();
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary mx-auto mb-4" }), _jsx("p", { className: "text-muted-foreground", children: "Loading tasks..." })] }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-background p-6 md:p-8 pt-20 md:pt-24", children: [_jsxs("div", { className: "max-w-7xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "My Tasks" }), _jsx("p", { className: "text-muted-foreground", children: "Manage and track all your tasks in one place." })] }), _jsxs(Button, { onClick: handleCreateTask, className: "bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Add Task"] })] }), _jsxs("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "Total Tasks" }), _jsx("div", { className: "h-4 w-4 text-muted-foreground", children: "\uD83D\uDCCB" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: stats.total }), _jsx("p", { className: "text-xs text-muted-foreground", children: "All tasks" })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "To Do" }), _jsx("div", { className: "h-4 w-4 text-muted-foreground", children: "\uD83D\uDCDD" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold text-gray-600", children: stats.todo }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Pending tasks" })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "In Progress" }), _jsx("div", { className: "h-4 w-4 text-muted-foreground", children: "\u23F3" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold text-orange-600", children: stats.inProgress }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Currently working" })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "Completed" }), _jsx("div", { className: "h-4 w-4 text-muted-foreground", children: "\u2705" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold text-rose-600", children: stats.completed }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Done" })] })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: "Search & Filters" }) }), _jsx(CardContent, { children: _jsx(TaskFilters, { searchTerm: searchTerm, onSearchChange: setSearchTerm, statusFilter: statusFilter, onStatusFilterChange: setStatusFilter, priorityFilter: priorityFilter, onPriorityFilterChange: setPriorityFilter, activeFiltersCount: getActiveFiltersCount(), onClearFilters: handleClearFilters }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: [_jsxs("span", { children: ["Tasks (", filteredTasks.length, ")"] }), filteredTasks.length !== tasks.length && (_jsxs("span", { className: "text-sm font-normal text-muted-foreground", children: ["of ", tasks.length, " total"] }))] }) }), _jsx(CardContent, { children: filteredTasks.length > 0 ? (_jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: filteredTasks.map(function (task) { return (_jsx(TaskItem, { task: task, onEdit: handleEditTask, onDelete: handleDeleteTask, onUpdate: handleUpdateTask }, task.id)); }) })) : (_jsx("div", { className: "text-center py-12", children: tasks.length === 0 ? (_jsxs(_Fragment, { children: [_jsx(Inbox, { className: "h-12 w-12 text-muted-foreground mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold mb-2", children: "No tasks yet" }), _jsx("p", { className: "text-muted-foreground mb-4", children: "Create your first task to get started!" }), _jsxs(Button, { onClick: handleCreateTask, children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Create Your First Task"] })] })) : (_jsxs(_Fragment, { children: [_jsx(Search, { className: "h-12 w-12 text-muted-foreground mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold mb-2", children: "No tasks found" }), _jsx("p", { className: "text-muted-foreground mb-4", children: "Try adjusting your search or filters to find what you're looking for." }), _jsx(Button, { variant: "outline", onClick: handleClearFilters, children: "Clear Filters" })] })) })) })] })] }), _jsx(TaskForm, { isOpen: isFormOpen, onClose: function () { return setIsFormOpen(false); }, onSubmit: handleTaskSubmit, editingTask: editingTask })] }));
};
export default TaskList;
