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
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Loader2, LogIn, Mail, Lock, RefreshCw } from 'lucide-react';
import { authClient } from '../../lib/auth-client';
var Login = function () {
    var _a = authClient.useSession(), session = _a.data, isPending = _a.isPending, error = _a.error, isRefetching = _a.isRefetching, refetch = _a.refetch;
    var navigate = useNavigate();
    var _b = useState({
        email: '',
        password: '',
    }), formData = _b[0], setFormData = _b[1];
    var _c = useState(true), rememberMe = _c[0], setRememberMe = _c[1];
    // Redirect authenticated users to dashboard
    useEffect(function () {
        if (session === null || session === void 0 ? void 0 : session.user) {
            navigate('/dashboard');
        }
    }, [session === null || session === void 0 ? void 0 : session.user, navigate]);
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
    };
    // Handle remember me change
    var handleRememberMeChange = function (e) {
        setRememberMe(e.target.checked);
    };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    e.preventDefault();
                    if (!formData.email || !formData.password) {
                        return [2 /*return*/];
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, authClient.$fetch("/sign-up/email", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: formData.email,
                                rememberMe: rememberMe,
                                password: formData.password,
                            }),
                        })];
                case 2:
                    result = _c.sent();
                    // const result = await authClient.signIn.email({
                    //   email: formData.email,
                    //   rememberMe,
                    //   password: formData.password,
                    // });
                    // Check if the result indicates success
                    if ((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.user) {
                        console.log('Login successful:', (_b = result === null || result === void 0 ? void 0 : result.data) === null || _b === void 0 ? void 0 : _b.user);
                        // The session will be automatically updated by the useSession hook
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _c.sent();
                    console.error('Login error:', error_1);
                    return [3 /*break*/, 5];
                case 4:
                    // After attempt, refetch session to get the latest state
                    refetch();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-rose-100 p-4", children: _jsx("div", { className: "w-full max-w-md", children: _jsxs(Card, { className: "shadow-xl border-0", children: [_jsxs(CardHeader, { className: "space-y-1 text-center", children: [_jsx("div", { className: "flex justify-center mb-4", children: _jsx("div", { className: "w-16 h-16 bg-gradient-to-br from-orange-500 to-rose-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg", children: "\uD83D\uDCCB" }) }), _jsx(CardTitle, { className: "text-2xl font-bold", children: "Welcome Back" }), _jsx(CardDescription, { children: "Sign in to your TaskFlow account" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", className: "text-sm font-medium", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" }), _jsx(Input, { id: "email", name: "email", type: "email", placeholder: "Enter your email", value: formData.email, onChange: handleChange, required: true, disabled: isPending || isRefetching, className: "pl-10 transition-all duration-200 focus:ring-2 focus:ring-orange-500" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", className: "text-sm font-medium", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" }), _jsx(Input, { id: "password", name: "password", type: "password", placeholder: "Enter your password", value: formData.password, onChange: handleChange, required: true, disabled: isPending || isRefetching, className: "pl-10 transition-all duration-200 focus:ring-2 focus:ring-orange-500" })] })] }), _jsxs("div", { className: "flex items-center", children: [_jsx("input", { id: "rememberMe", name: "rememberMe", type: "checkbox", checked: rememberMe, onChange: handleRememberMeChange, disabled: isPending || isRefetching, className: "mr-2 accent-orange-500" }), _jsx(Label, { htmlFor: "rememberMe", className: "text-sm select-none cursor-pointer", children: "Remember me" }), _jsxs(Button, { type: "button", variant: "ghost", size: "sm", className: "ml-auto flex items-center", onClick: function () { return refetch(); }, disabled: isRefetching, tabIndex: -1, children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-1 ".concat(isRefetching ? 'animate-spin' : '') }), isRefetching ? 'Refreshing...' : 'Refresh session'] })] }), error && (_jsx(Alert, { variant: "destructive", children: _jsx(AlertDescription, { children: error === null || error === void 0 ? void 0 : error.message }) })), _jsx(Button, { type: "submit", disabled: !formData.email || !formData.password || isPending || isRefetching, className: "w-full transition-all duration-200 bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700", children: isPending || isRefetching ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), isPending ? 'Signing In...' : 'Processing...'] })) : (_jsxs(_Fragment, { children: [_jsx(LogIn, { className: "mr-2 h-4 w-4" }), "Sign In"] })) })] }), _jsx("div", { className: "text-center pt-4 border-t", children: _jsxs("p", { className: "text-sm text-gray-600", children: ["Don't have an account?", ' ', _jsx(Link, { to: "/register", className: "font-medium text-orange-600 hover:text-orange-500 transition-colors duration-200", children: "Create account" })] }) })] })] }) }) }));
};
export default Login;
