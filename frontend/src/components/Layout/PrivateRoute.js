import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/BetterAuthContext';
import { Loader2 } from 'lucide-react';
var PrivateRoute = function (_a) {
    var children = _a.children;
    var _b = useAuth(), isAuthenticated = _b.isAuthenticated, isLoading = _b.isLoading;
    // Show loading spinner while checking authentication
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: _jsxs("div", { className: "flex flex-col items-center space-y-4", children: [_jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Authenticating..." })] }) }));
    }
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    // Render children if authenticated
    return _jsx(_Fragment, { children: children });
};
export default PrivateRoute;
