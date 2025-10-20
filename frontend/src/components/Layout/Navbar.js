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
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '../ui/dropdown-menu';
import { LogOut, LayoutDashboard, CheckSquare, Settings } from 'lucide-react';
import { authClient } from '../../lib/auth-client';
var Navbar = function () {
    var _a, _b;
    // Use session hook from authClient for session/user state
    var _c = authClient.useSession(), session = _c.data, isPending = _c.isPending, isRefetching = _c.isRefetching, refetch = _c.refetch;
    var user = session === null || session === void 0 ? void 0 : session.user;
    var isAuthenticated = !!user;
    var navigate = useNavigate();
    useEffect(function () {
        // Could add any relevant user session effect here if needed
    }, [session]);
    var handleLogout = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    return [4 /*yield*/, authClient.$fetch('/sign-out', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    // Optionally handle/log error
                    console.error('Logout failed:', error_1);
                    return [3 /*break*/, 4];
                case 3:
                    // Always refetch session after logout
                    refetch();
                    // Navigate to login - if not already redirected by auth/session
                    navigate('/login');
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (_jsx("nav", { className: "fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ", children: _jsxs("div", { className: "container flex h-16 items-center justify-between px-4 mx-auto", children: [_jsxs(Link, { to: "/", className: "flex items-center space-x-3 group", children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-orange-500 to-rose-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md group- transition-all duration-200 group-hover:scale-105", children: "\uD83D\uDCCB" }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent group-hover:from-orange-700 group-hover:to-rose-700 transition-all duration-200", children: "TaskFlow" }), _jsx("span", { className: "text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-200", children: "Task Management System" })] })] }), isAuthenticated && user ? (_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "hidden sm:block text-right mr-2", children: [_jsx("p", { className: "text-sm font-medium text-foreground", children: "Welcome back," }), _jsx("p", { className: "text-sm font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent", children: user.name })] }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", className: "relative h-10 w-10 rounded-full", children: _jsx(Avatar, { className: "h-10 w-10 bg-gradient-to-br from-orange-500 to-rose-600 shadow-md  transition-all duration-200", children: _jsx(AvatarFallback, { className: "text-white font-bold", children: ((_b = (_a = user.name) === null || _a === void 0 ? void 0 : _a.charAt(0)) === null || _b === void 0 ? void 0 : _b.toUpperCase()) || 'U' }) }) }) }), _jsxs(DropdownMenuContent, { className: "w-56", align: "end", forceMount: true, children: [_jsx(DropdownMenuLabel, { className: "font-normal", children: _jsxs("div", { className: "flex flex-col space-y-1", children: [_jsx("p", { className: "text-sm font-medium leading-none", children: user.name }), _jsx("p", { className: "text-xs leading-none text-muted-foreground", children: user.email })] }) }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { onClick: function () { return navigate('/dashboard'); }, className: "cursor-pointer", children: [_jsx(LayoutDashboard, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Dashboard" })] }), _jsxs(DropdownMenuItem, { onClick: function () { return navigate('/tasks'); }, className: "cursor-pointer", children: [_jsx(CheckSquare, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "My Tasks" })] }), _jsxs(DropdownMenuItem, { onClick: function () { return navigate('/settings'); }, className: "cursor-pointer", children: [_jsx(Settings, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Settings" })] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { onClick: handleLogout, className: "cursor-pointer text-red-600 focus:text-red-600", disabled: isPending || isRefetching, children: [_jsx(LogOut, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Logout" })] })] })] })] })) : (_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Button, { variant: "outline", size: "sm", asChild: true, className: "transition-all duration-200", disabled: isPending || isRefetching, children: _jsx(Link, { to: "/login", children: "Login" }) }), _jsx(Button, { size: "sm", asChild: true, className: "bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 transition-all duration-200", disabled: isPending || isRefetching, children: _jsx(Link, { to: "/register", children: "Register" }) })] }))] }) }));
};
export default Navbar;
