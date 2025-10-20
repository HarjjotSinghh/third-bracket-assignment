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
import { jsx as _jsx } from "react/jsx-runtime";
import axios from 'axios';
import { createContext, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
var getInitialAuthState = function () {
    var token = localStorage.getItem('token');
    // We don't know user yet, so user remains null, but loading should start if token exists
    return {
        user: null,
        token: token,
        isLoading: !!token,
        isAuthenticated: false,
        error: null,
    };
};
var authReducer = function (state, action) {
    switch (action.type) {
        case 'LOGIN_START':
            return __assign(__assign({}, state), { isLoading: true, error: null });
        case 'LOGIN_SUCCESS':
            return __assign(__assign({}, state), { user: action.payload.user, token: action.payload.token, isLoading: false, isAuthenticated: true, error: null });
        case 'LOGIN_FAILURE':
            return __assign(__assign({}, state), { user: null, token: null, isLoading: false, isAuthenticated: false, error: action.payload.error });
        case 'LOGOUT':
            return __assign(__assign({}, state), { user: null, token: null, isLoading: false, isAuthenticated: false, error: null });
        case 'CLEAR_ERROR':
            return __assign(__assign({}, state), { error: null });
        default:
            return state;
    }
};
var AuthContext = createContext(undefined);
// eslint-disable-next-line react-refresh/only-export-components
export var useAuth = function () {
    var context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
export var AuthProvider = function (_a) {
    var children = _a.children;
    var _b = useReducer(authReducer, getInitialAuthState()), state = _b[0], dispatch = _b[1];
    var navigate = useNavigate();
    // Only run token check on mount
    useEffect(function () {
        var token = localStorage.getItem('token');
        if (token && !state.isAuthenticated) {
            verifyToken(token);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    var verifyToken = function (tokenParam) { return __awaiter(void 0, void 0, void 0, function () {
        var token, response, _a, user, newToken, error_1;
        var _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    token = tokenParam || state.token || localStorage.getItem('token');
                    if (!token) {
                        dispatch({ type: 'LOGOUT' });
                        return [2 /*return*/];
                    }
                    dispatch({ type: 'LOGIN_START' });
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.get("".concat(import.meta.env.VITE_API_BASE_URL, "/auth/verify"), {
                            headers: {
                                Authorization: "Bearer ".concat(token),
                            },
                        })];
                case 2:
                    response = _f.sent();
                    if (response.status === 200 &&
                        ((_c = (_b = response.data) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.user) &&
                        ((_e = (_d = response.data) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.token)) {
                        _a = response.data.data, user = _a.user, newToken = _a.token;
                        localStorage.setItem('token', newToken);
                        dispatch({
                            type: 'LOGIN_SUCCESS',
                            payload: {
                                user: user,
                                token: newToken,
                            },
                        });
                    }
                    else {
                        localStorage.removeItem('token');
                        dispatch({ type: 'LOGOUT' });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _f.sent();
                    console.error('Token verification error:', error_1);
                    localStorage.removeItem('token');
                    dispatch({ type: 'LOGOUT' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var login = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, error_2, errorMessage;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    dispatch({ type: 'LOGIN_START' });
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.post("".concat(import.meta.env.VITE_API_BASE_URL, "/auth/login"), {
                            email: email,
                            password: password,
                        })];
                case 2:
                    response = _c.sent();
                    data = response.data;
                    if (response.status === 200 && data.user && data.token) {
                        localStorage.setItem('token', data.token);
                        dispatch({
                            type: 'LOGIN_SUCCESS',
                            payload: {
                                user: data.user,
                                token: data.token,
                            },
                        });
                        toast.success('Login successful!');
                        navigate('/dashboard');
                    }
                    else {
                        // Set error to returned message even if login succeeded
                        dispatch({ type: 'LOGIN_FAILURE', payload: { error: data.message || 'Login failed' } });
                        toast.error(data.message || 'Login failed');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _c.sent();
                    console.error('Login error:', error_2);
                    errorMessage = axios.isAxiosError(error_2)
                        ? ((_b = (_a = error_2.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Network error. Please try again.'
                        : 'An unexpected error occurred.';
                    dispatch({ type: 'LOGIN_FAILURE', payload: { error: errorMessage } });
                    toast.error(errorMessage);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var register = function (name, email, password) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, error_3, errorMessage;
        var _a, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    dispatch({ type: 'LOGIN_START' });
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.post("".concat(import.meta.env.VITE_API_BASE_URL, "/auth/register"), {
                            name: name,
                            email: email,
                            password: password,
                        })];
                case 2:
                    response = _g.sent();
                    data = response.data;
                    if (response.status === 200 && ((_a = data.data) === null || _a === void 0 ? void 0 : _a.user) && ((_b = data.data) === null || _b === void 0 ? void 0 : _b.token)) {
                        localStorage.setItem('token', data.data.token);
                        dispatch({
                            type: 'LOGIN_SUCCESS',
                            payload: {
                                user: data.data.user,
                                token: data.data.token,
                            },
                        });
                        toast.success('Registration successful!');
                        navigate('/dashboard');
                    }
                    else {
                        dispatch({
                            type: 'LOGIN_FAILURE',
                            payload: { error: ((_c = data.error) === null || _c === void 0 ? void 0 : _c.message) || 'Registration failed' },
                        });
                        toast.error(((_d = data.error) === null || _d === void 0 ? void 0 : _d.message) || 'Registration failed');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _g.sent();
                    console.error('Registration error:', error_3);
                    errorMessage = axios.isAxiosError(error_3)
                        ? ((_f = (_e = error_3.response) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.message) || 'Network error. Please try again.'
                        : 'An unexpected error occurred.';
                    dispatch({ type: 'LOGIN_FAILURE', payload: { error: errorMessage } });
                    toast.error(errorMessage);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var logout = function () {
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
        toast.success('Logged out successfully');
    };
    var clearError = function () {
        dispatch({ type: 'CLEAR_ERROR' });
    };
    var value = __assign(__assign({}, state), { login: login, register: register, logout: logout, clearError: clearError });
    // Remove debug logs for production, but can log for troubleshooting
    // console.log('AuthProvider value', value);
    // console.log('AuthProvider state', state);
    return _jsx(AuthContext.Provider, { value: value, children: children });
};
export default AuthContext;
