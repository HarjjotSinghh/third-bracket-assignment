var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { taskAPI } from '../../services/betterAuthApi';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from '../ui/dialog';
import { Calendar } from '../ui/calendar';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';
var TaskForm = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, onSubmit = _a.onSubmit, editingTask = _a.editingTask;
    var _b = useState({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Todo',
        dueDate: undefined,
    }), formData = _b[0], setFormData = _b[1];
    var _c = useState(false), isLoading = _c[0], setIsLoading = _c[1];
    var _d = useState(false), showCalendar = _d[0], setShowCalendar = _d[1];
    useEffect(function () {
        if (editingTask) {
            setFormData({
                title: editingTask.title,
                description: editingTask.description || '',
                priority: editingTask.priority,
                status: editingTask.status,
                dueDate: editingTask.dueDate ? new Date(editingTask.dueDate) : undefined,
            });
        }
        else {
            setFormData({
                title: '',
                description: '',
                priority: 'Medium',
                status: 'Todo',
                dueDate: undefined,
            });
        }
    }, [editingTask, isOpen]);
    var handleChange = function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var taskData, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!formData.title.trim())
                        return [2 /*return*/];
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    taskData = __assign(__assign({}, formData), { dueDate: formData.dueDate ? formData.dueDate.toISOString() : undefined });
                    response = void 0;
                    if (!editingTask) return [3 /*break*/, 3];
                    return [4 /*yield*/, taskAPI.update(editingTask.id, taskData)];
                case 2:
                    response = _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, taskAPI.create(taskData)];
                case 4:
                    response = _a.sent();
                    _a.label = 5;
                case 5:
                    onSubmit(response.data.task);
                    onClose();
                    return [3 /*break*/, 8];
                case 6:
                    error_1 = _a.sent();
                    console.error('Error saving task:', error_1);
                    return [3 /*break*/, 8];
                case 7:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: _jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: editingTask ? 'Edit Task' : 'Create New Task' }), _jsx(DialogDescription, { children: editingTask
                                ? 'Make changes to your task here.'
                                : 'Fill in the details to create a new task.' })] }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "title", children: "Title" }), _jsx(Input, { id: "title", value: formData.title, onChange: function (e) { return handleChange('title', e.target.value); }, placeholder: "Enter task title", required: true, disabled: isLoading })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "description", children: "Description" }), _jsx(Textarea, { id: "description", value: formData.description, onChange: function (e) { return handleChange('description', e.target.value); }, placeholder: "Enter task description (optional)", rows: 3, disabled: isLoading })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "priority", children: "Priority" }), _jsxs(Select, { value: formData.priority, onValueChange: function (value) { return handleChange('priority', value); }, disabled: isLoading, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select priority" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "Low", children: "Low" }), _jsx(SelectItem, { value: "Medium", children: "Medium" }), _jsx(SelectItem, { value: "High", children: "High" })] })] })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "status", children: "Status" }), _jsxs(Select, { value: formData.status, onValueChange: function (value) { return handleChange('status', value); }, disabled: isLoading, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "Todo", children: "To Do" }), _jsx(SelectItem, { value: "In Progress", children: "In Progress" }), _jsx(SelectItem, { value: "Completed", children: "Completed" })] })] })] })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { children: "Due Date" }), _jsxs("div", { className: "relative", children: [_jsxs(Button, { type: "button", variant: "outline", className: cn("w-full justify-start text-left font-normal", !formData.dueDate && "text-muted-foreground"), onClick: function () { return setShowCalendar(!showCalendar); }, disabled: isLoading, children: [_jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }), formData.dueDate
                                                            ? format(formData.dueDate, "PPP")
                                                            : "Pick a date"] }), showCalendar && (_jsx("div", { className: "absolute top-10 left-0 z-50 mt-1", children: _jsx(Calendar, { mode: "single", selected: formData.dueDate, onSelect: function (date) {
                                                            handleChange('dueDate', date);
                                                            setShowCalendar(false);
                                                        }, initialFocus: true, className: "rounded-md border shadow-md" }) }))] })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { type: "button", variant: "outline", onClick: onClose, disabled: isLoading, children: "Cancel" }), _jsx(Button, { type: "submit", disabled: !formData.title.trim() || isLoading, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), editingTask ? 'Updating...' : 'Creating...'] })) : (editingTask ? 'Update Task' : 'Create Task') })] })] })] }) }));
};
export default TaskForm;
