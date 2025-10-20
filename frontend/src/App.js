import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/BetterAuthContext';
import Navbar from './components/Layout/Navbar';
import PrivateRoute from './components/Layout/PrivateRoute';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import TaskList from './components/Tasks/TaskList';
import LandingPage from './components/Landing/LandingPage';
var App = function () {
    return (_jsx(Router, { children: _jsx(AuthProvider, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(PrivateRoute, { children: _jsxs("div", { className: "min-h-screen bg-background", children: [_jsx(Navbar, {}), _jsx("main", { className: "flex-1", children: _jsx(Dashboard, {}) })] }) }) }), _jsx(Route, { path: "/tasks", element: _jsx(PrivateRoute, { children: _jsxs("div", { className: "min-h-screen bg-background", children: [_jsx(Navbar, {}), _jsx("main", { className: "flex-1", children: _jsx(TaskList, {}) })] }) }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }) }) }));
};
export default App;
