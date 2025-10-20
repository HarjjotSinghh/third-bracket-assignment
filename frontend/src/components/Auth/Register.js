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
import { Loader2, UserPlus, Mail, Lock, User } from 'lucide-react';
import { authClient } from "../../lib/auth-client";
var Register = function () {
    // Use better-auth hooks
    var _a = authClient.useSession(), session = _a.data, isPending = _a.isPending, error = _a.error, isRefetching = _a.isRefetching, refetch = _a.refetch;
    var navigate = useNavigate();
    var _b = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }), formData = _b[0], setFormData = _b[1];
    var _c = useState(null), validationError = _c[0], setValidationError = _c[1];
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
        if (validationError) {
            setValidationError(null);
        }
    };
    var validateForm = function () {
        if (formData.password !== formData.confirmPassword) {
            setValidationError("Passwords don't match");
            return false;
        }
        if (formData.password.length < 6) {
            setValidationError("Password must be at least 6 characters long");
            return false;
        }
        return true;
    };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var result, err_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    if (!validateForm()) {
                        return [2 /*return*/];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, authClient.signUp.email({
                            name: formData.name,
                            email: formData.email,
                            password: formData.password,
                        })];
                case 2:
                    result = _b.sent();
                    // Check if the result indicates success
                    if ((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.user) {
                        console.log('Registration successful:', result.data.user);
                        // The session will be automatically updated by the useSession hook
                    }
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _b.sent();
                    // error is handled by error from useSession, but log for dev
                    console.error('Registration error:', err_1);
                    return [3 /*break*/, 5];
                case 4:
                    // Always refetch to get the latest session state
                    refetch();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-rose-100 p-4", children: _jsx("div", { className: "w-full max-w-md", children: _jsxs(Card, { className: "shadow-xl border-0", children: [_jsxs(CardHeader, { className: "space-y-1 text-center", children: [_jsx("div", { className: "flex justify-center mb-4", children: _jsx("div", { className: "w-16 h-16 bg-gradient-to-br from-rose-500 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg", children: "\uD83D\uDCCB" }) }), _jsx(CardTitle, { className: "text-2xl font-bold", children: "Create Account" }), _jsx(CardDescription, { children: "Join TaskFlow to manage your tasks efficiently" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", className: "text-sm font-medium", children: "Full Name" }), _jsxs("div", { className: "relative", children: [_jsx(User, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" }), _jsx(Input, { id: "name", name: "name", type: "text", placeholder: "Enter your full name", value: formData.name, onChange: handleChange, required: true, disabled: isPending || isRefetching, className: "pl-10 transition-all duration-200 focus:ring-2 focus:ring-orange-500" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", className: "text-sm font-medium", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" }), _jsx(Input, { id: "email", name: "email", type: "email", placeholder: "Enter your email", value: formData.email, onChange: handleChange, required: true, disabled: isPending || isRefetching, className: "pl-10 transition-all duration-200 focus:ring-2 focus:ring-orange-500" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", className: "text-sm font-medium", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" }), _jsx(Input, { id: "password", name: "password", type: "password", placeholder: "Create a password", value: formData.password, onChange: handleChange, required: true, disabled: isPending || isRefetching, className: "pl-10 transition-all duration-200 focus:ring-2 focus:ring-orange-500" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "confirmPassword", className: "text-sm font-medium", children: "Confirm Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" }), _jsx(Input, { id: "confirmPassword", name: "confirmPassword", type: "password", placeholder: "Confirm your password", value: formData.confirmPassword, onChange: handleChange, required: true, disabled: isPending || isRefetching, className: "pl-10 transition-all duration-200 focus:ring-2 focus:ring-orange-500" })] })] }), (error || validationError) && (_jsx(Alert, { variant: "destructive", children: _jsx(AlertDescription, { children: (error && typeof error === "object" && "message" in error ? error.message : error) }) })), _jsx(Button, { type: "submit", disabled: !formData.name ||
                                            !formData.email ||
                                            !formData.password ||
                                            !formData.confirmPassword ||
                                            isPending || isRefetching, className: "w-full transition-all duration-200 bg-gradient-to-r from-rose-500 to-orange-600 hover:from-rose-600 hover:to-orange-700", children: isPending || isRefetching ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), isPending ? "Creating Account..." : "Processing..."] })) : (_jsxs(_Fragment, { children: [_jsx(UserPlus, { className: "mr-2 h-4 w-4" }), "Create Account"] })) })] }), _jsx("div", { className: "text-center pt-4 border-t", children: _jsxs("p", { className: "text-sm text-gray-600", children: ["Already have an account?", ' ', _jsx(Link, { to: "/login", className: "font-medium text-orange-600 hover:text-orange-500 transition-colors duration-200", children: "Sign in" })] }) })] })] }) }) }));
};
export default Register;
