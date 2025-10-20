import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { authClient } from '../../lib/auth-client';
var PrivateRoute = function (_a) {
    var children = _a.children;
    // Use better-auth hook from authClient (like Login/Register)
    var _b = authClient.useSession(), session = _b.data, isPending = _b.isPending, isRefetching = _b.isRefetching;
    var isLoading = isPending || isRefetching;
    var isAuthenticated = !!(session === null || session === void 0 ? void 0 : session.user);
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: _jsxs("div", { className: "flex flex-col items-center space-y-4", children: [_jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Authenticating..." })] }) }));
    }
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
export default PrivateRoute;
