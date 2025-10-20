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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon, } from "lucide-react";
import { cn } from "../../lib/utils";
import { buttonVariants } from "./button";
function Pagination(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("nav", __assign({ role: "navigation", "aria-label": "pagination", "data-slot": "pagination", className: cn("mx-auto flex w-full justify-center", className) }, props)));
}
function PaginationContent(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("ul", __assign({ "data-slot": "pagination-content", className: cn("flex flex-row items-center gap-1", className) }, props)));
}
function PaginationItem(_a) {
    var props = __rest(_a, []);
    return _jsx("li", __assign({ "data-slot": "pagination-item" }, props));
}
function PaginationLink(_a) {
    var className = _a.className, isActive = _a.isActive, _b = _a.size, size = _b === void 0 ? "icon" : _b, props = __rest(_a, ["className", "isActive", "size"]);
    return (_jsx("a", __assign({ "aria-current": isActive ? "page" : undefined, "data-slot": "pagination-link", "data-active": isActive, className: cn(buttonVariants({
            variant: isActive ? "outline" : "ghost",
            size: size,
        }), className) }, props)));
}
function PaginationPrevious(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsxs(PaginationLink, __assign({ "aria-label": "Go to previous page", size: "default", className: cn("gap-1 px-2.5 sm:pl-2.5", className) }, props, { children: [_jsx(ChevronLeftIcon, {}), _jsx("span", { className: "hidden sm:block", children: "Previous" })] })));
}
function PaginationNext(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsxs(PaginationLink, __assign({ "aria-label": "Go to next page", size: "default", className: cn("gap-1 px-2.5 sm:pr-2.5", className) }, props, { children: [_jsx("span", { className: "hidden sm:block", children: "Next" }), _jsx(ChevronRightIcon, {})] })));
}
function PaginationEllipsis(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsxs("span", __assign({ "aria-hidden": true, "data-slot": "pagination-ellipsis", className: cn("flex size-9 items-center justify-center", className) }, props, { children: [_jsx(MoreHorizontalIcon, { className: "size-4" }), _jsx("span", { className: "sr-only", children: "More pages" })] })));
}
export { Pagination, PaginationContent, PaginationLink, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis, };
