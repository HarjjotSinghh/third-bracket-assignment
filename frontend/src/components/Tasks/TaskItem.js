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
import { useState } from 'react';
import { taskAPI } from '../../services/betterAuthApi';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Separator } from '../ui/separator';
import { cn } from '../../lib/utils';
var TaskItem = function (_a) {
    var task = _a.task, onEdit = _a.onEdit, onDelete = _a.onDelete, onUpdate = _a.onUpdate;
    var _b = useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = useState(false), showDescription = _c[0], setShowDescription = _c[1];
    var getPriorityVariant = function (priority) {
        switch (priority) {
            case 'High': return 'destructive';
            case 'Medium': return 'default';
            case 'Low': return 'secondary';
            default: return 'outline';
        }
    };
    var getStatusVariant = function (status) {
        switch (status) {
            case 'Completed': return 'default';
            case 'In Progress': return 'secondary';
            case 'Todo': return 'outline';
            default: return 'outline';
        }
    };
    var isOverdue = (task === null || task === void 0 ? void 0 : task.dueDate) && new Date(task === null || task === void 0 ? void 0 : task.dueDate) < new Date() && (task === null || task === void 0 ? void 0 : task.status) !== 'Completed';
    var handleStatusChange = function (newStatus) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isLoading)
                        return [2 /*return*/];
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, taskAPI.update(task === null || task === void 0 ? void 0 : task.id, { status: newStatus })];
                case 2:
                    response = _a.sent();
                    onUpdate(response.data.task);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Failed to update task status:', error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isLoading)
                        return [2 /*return*/];
                    if (!window.confirm('Are you sure you want to delete this task?')) {
                        return [2 /*return*/];
                    }
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, taskAPI.delete(task === null || task === void 0 ? void 0 : task.id)];
                case 2:
                    _a.sent();
                    onDelete(task === null || task === void 0 ? void 0 : task.id);
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    console.error('Failed to delete task:', error_2);
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var formatDate = function (dateString) {
        var date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };
    return (_jsxs(Card, { className: cn("transition-all duration-200 ", isOverdue && "border-2 border-red-500 shadow-red-100", (task === null || task === void 0 ? void 0 : task.status) === 'Completed' && "bg-muted/50"), children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1 space-y-2", children: [_jsx(CardTitle, { className: "text-lg font-semibold", children: task === null || task === void 0 ? void 0 : task.title }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(Badge, { variant: getPriorityVariant(task === null || task === void 0 ? void 0 : task.priority), children: task === null || task === void 0 ? void 0 : task.priority }), _jsx(Badge, { variant: getStatusVariant(task === null || task === void 0 ? void 0 : task.status), children: task === null || task === void 0 ? void 0 : task.status }), (task === null || task === void 0 ? void 0 : task.dueDate) && (_jsxs(Badge, { variant: isOverdue ? "destructive" : "outline", className: cn(isOverdue && "animate-pulse"), children: ["\uD83D\uDCC5 ", formatDate(task === null || task === void 0 ? void 0 : task.dueDate), isOverdue && ' (Overdue)'] }))] })] }), _jsxs("div", { className: "flex gap-1", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: function () { return onEdit(task); }, disabled: isLoading, className: "h-8 w-8 p-0", children: "\u270F\uFE0F" }), _jsx(Button, { variant: "ghost", size: "sm", onClick: handleDelete, disabled: isLoading, className: "h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50", children: "\uD83D\uDDD1\uFE0F" })] })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [(task === null || task === void 0 ? void 0 : task.description) && (_jsxs(Collapsible, { open: showDescription, onOpenChange: setShowDescription, children: [_jsx(CollapsibleTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", size: "sm", className: "w-full justify-start text-left h-auto p-0 hover:bg-transparent", children: [showDescription ? '▼' : '▶', " Description"] }) }), _jsx(CollapsibleContent, { className: "mt-2", children: _jsx("p", { className: "text-sm text-muted-foreground pl-4 border-l-2 border-muted", children: task === null || task === void 0 ? void 0 : task.description }) })] })), _jsx(Separator, {}), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-sm font-medium", children: "Change Status:" }), _jsx("div", { className: "flex flex-wrap gap-2", children: ['Todo', 'In Progress', 'Completed'].map(function (status) { return (_jsx(Button, { variant: (task === null || task === void 0 ? void 0 : task.status) === status ? "default" : "outline", size: "sm", onClick: function () { return handleStatusChange(status); }, disabled: isLoading || (task === null || task === void 0 ? void 0 : task.status) === status, className: "text-xs", children: status }, status)); }) })] }), _jsx(Separator, {}), _jsxs("div", { className: "text-xs text-muted-foreground", children: ["Created: ", formatDate(task === null || task === void 0 ? void 0 : task.createdAt), " | Updated: ", formatDate(task === null || task === void 0 ? void 0 : task.updatedAt)] })] })] }));
};
export default TaskItem;
