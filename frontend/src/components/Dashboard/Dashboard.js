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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskAPI } from '../../services/betterAuthApi';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { CheckCircle, Clock, Plus, TrendingUp, Calendar, AlertCircle, FileCheck, } from 'lucide-react';
var Dashboard = function () {
    var navigate = useNavigate();
    var _a = useState([]), tasks = _a[0], setTasks = _a[1];
    var _b = useState({
        total: 0,
        completed: 0,
        pending: 0,
        inProgress: 0,
        highPriority: 0,
        completionRate: 0,
    }), stats = _b[0], setStats = _b[1];
    var _c = useState(true), isLoading = _c[0], setIsLoading = _c[1];
    useEffect(function () {
        fetchTasks();
    }, []);
    var fetchTasks = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, tasksData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    return [4 /*yield*/, taskAPI.getAll()];
                case 1:
                    response = _a.sent();
                    tasksData = response.data.tasks || [];
                    setTasks(tasksData);
                    calculateStats(tasksData);
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
    var calculateStats = function (tasksData) {
        var total = tasksData.length;
        var completed = tasksData.filter(function (task) { return task.status === 'Completed'; }).length;
        var pending = tasksData.filter(function (task) { return task.status === 'Todo'; }).length;
        var inProgress = tasksData.filter(function (task) { return task.status === 'In Progress'; }).length;
        var highPriority = tasksData.filter(function (task) { return task.priority === 'High'; }).length;
        var completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
        setStats({
            total: total,
            completed: completed,
            pending: pending,
            inProgress: inProgress,
            highPriority: highPriority,
            completionRate: completionRate,
        });
    };
    var getRecentTasks = function () {
        return tasks
            .sort(function (a, b) { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); })
            .slice(0, 5);
    };
    var getOverdueTasks = function () {
        var now = new Date();
        return tasks.filter(function (task) {
            return task.dueDate &&
                new Date(task.dueDate) < now &&
                task.status !== 'Completed';
        });
    };
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" }), _jsx("p", { className: "text-muted-foreground", children: "Loading dashboard..." })] }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-background p-6 md:p-8 pt-20 md:pt-24", children: _jsxs("div", { className: "max-w-7xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Dashboard" }), _jsx("p", { className: "text-muted-foreground", children: "Welcome back! Here's an overview of your tasks." })] }), _jsxs(Button, { onClick: function () { return navigate('/tasks'); }, className: "bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Manage Tasks"] })] }), _jsxs("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: [_jsxs(Card, { className: "transition-all duration-200 ", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "Total Tasks" }), _jsx(FileCheck, { className: "h-4 w-4 text-muted-foreground" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: stats.total }), _jsx("p", { className: "text-xs text-muted-foreground", children: "All tasks in your system" })] })] }), _jsxs(Card, { className: "transition-all duration-200 ", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "Completed" }), _jsx(CheckCircle, { className: "h-4 w-4 text-rose-600" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold text-rose-600", children: stats.completed }), _jsxs("p", { className: "text-xs text-muted-foreground", children: [stats.completionRate, "% completion rate"] })] })] }), _jsxs(Card, { className: "transition-all duration-200 ", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "In Progress" }), _jsx(Clock, { className: "h-4 w-4 text-orange-600" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold text-orange-600", children: stats.inProgress }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Currently being worked on" })] })] }), _jsxs(Card, { className: "transition-all duration-200 ", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "High Priority" }), _jsx(AlertCircle, { className: "h-4 w-4 text-red-600" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold text-red-600", children: stats.highPriority }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Tasks needing attention" })] })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(TrendingUp, { className: "h-5 w-5" }), "Progress Overview"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm mb-2", children: [_jsx("span", { children: "Overall Progress" }), _jsxs("span", { className: "font-medium", children: [stats.completionRate, "%"] })] }), _jsx(Progress, { value: stats.completionRate, className: "h-2" })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-gray-600", children: stats.pending }), _jsx("div", { className: "text-xs text-muted-foreground", children: "To Do" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-orange-600", children: stats.inProgress }), _jsx("div", { className: "text-xs text-muted-foreground", children: "In Progress" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-rose-600", children: stats.completed }), _jsx("div", { className: "text-xs text-muted-foreground", children: "Completed" })] })] })] })] }), _jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Calendar, { className: "h-5 w-5" }), "Recent Tasks"] }), _jsx(CardDescription, { children: "Your most recently created tasks" })] }), _jsx(CardContent, { children: getRecentTasks().length > 0 ? (_jsx("div", { className: "space-y-3", children: getRecentTasks().map(function (task) { return (_jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "font-medium text-sm", children: task.title }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(Badge, { variant: task.priority === 'High' ? 'destructive' :
                                                                        task.priority === 'Medium' ? 'default' : 'secondary', className: "text-xs", children: task.priority }), _jsx(Badge, { variant: "outline", className: "text-xs", children: task.status })] })] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: function () { return navigate('/tasks'); }, children: "View" })] }, task.id)); }) })) : (_jsxs("div", { className: "text-center py-8", children: [_jsx("p", { className: "text-muted-foreground mb-4", children: "No tasks yet" }), _jsxs(Button, { onClick: function () { return navigate('/tasks'); }, children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Create Your First Task"] })] })) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2 text-red-600", children: [_jsx(AlertCircle, { className: "h-5 w-5" }), "Overdue Tasks"] }), _jsx(CardDescription, { children: "Tasks that need your immediate attention" })] }), _jsx(CardContent, { children: getOverdueTasks().length > 0 ? (_jsx("div", { className: "space-y-3", children: getOverdueTasks().map(function (task) { return (_jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 transition-colors", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "font-medium text-sm text-red-900", children: task.title }), _jsxs("p", { className: "text-xs text-red-600 mt-1", children: ["Due: ", task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'] })] }), _jsx(Button, { variant: "destructive", size: "sm", onClick: function () { return navigate('/tasks'); }, children: "Update" })] }, task.id)); }) })) : (_jsxs("div", { className: "text-center py-8", children: [_jsx(CheckCircle, { className: "h-12 w-12 text-rose-600 mx-auto mb-4" }), _jsx("p", { className: "text-muted-foreground", children: "Great job! No overdue tasks." })] })) })] })] })] }) }));
};
export default Dashboard;
