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
import { useMemo } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Label } from "./label";
import { Separator } from "./separator";
function FieldSet(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("fieldset", __assign({ "data-slot": "field-set", className: cn("flex flex-col gap-6", "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3", className) }, props)));
}
function FieldLegend(_a) {
    var className = _a.className, _b = _a.variant, variant = _b === void 0 ? "legend" : _b, props = __rest(_a, ["className", "variant"]);
    return (_jsx("legend", __assign({ "data-slot": "field-legend", "data-variant": variant, className: cn("mb-3 font-medium", "data-[variant=legend]:text-base", "data-[variant=label]:text-sm", className) }, props)));
}
function FieldGroup(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("div", __assign({ "data-slot": "field-group", className: cn("group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4", className) }, props)));
}
var fieldVariants = cva("group/field flex w-full gap-3 data-[invalid=true]:text-destructive", {
    variants: {
        orientation: {
            vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
            horizontal: [
                "flex-row items-center",
                "[&>[data-slot=field-label]]:flex-auto",
                "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
            ],
            responsive: [
                "flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto",
                "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
                "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
            ],
        },
    },
    defaultVariants: {
        orientation: "vertical",
    },
});
function Field(_a) {
    var className = _a.className, _b = _a.orientation, orientation = _b === void 0 ? "vertical" : _b, props = __rest(_a, ["className", "orientation"]);
    return (_jsx("div", __assign({ role: "group", "data-slot": "field", "data-orientation": orientation, className: cn(fieldVariants({ orientation: orientation }), className) }, props)));
}
function FieldContent(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("div", __assign({ "data-slot": "field-content", className: cn("group/field-content flex flex-1 flex-col gap-1.5 leading-snug", className) }, props)));
}
function FieldLabel(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx(Label, __assign({ "data-slot": "field-label", className: cn("group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50", "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4", "has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10", className) }, props)));
}
function FieldTitle(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("div", __assign({ "data-slot": "field-label", className: cn("flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50", className) }, props)));
}
function FieldDescription(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("p", __assign({ "data-slot": "field-description", className: cn("text-muted-foreground text-sm leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance", "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5", "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4", className) }, props)));
}
function FieldSeparator(_a) {
    var children = _a.children, className = _a.className, props = __rest(_a, ["children", "className"]);
    return (_jsxs("div", __assign({ "data-slot": "field-separator", "data-content": !!children, className: cn("relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2", className) }, props, { children: [_jsx(Separator, { className: "absolute inset-0 top-1/2" }), children && (_jsx("span", { className: "bg-background text-muted-foreground relative mx-auto block w-fit px-2", "data-slot": "field-separator-content", children: children }))] })));
}
function FieldError(_a) {
    var className = _a.className, children = _a.children, errors = _a.errors, props = __rest(_a, ["className", "children", "errors"]);
    var content = useMemo(function () {
        var _a;
        if (children) {
            return children;
        }
        if (!(errors === null || errors === void 0 ? void 0 : errors.length)) {
            return null;
        }
        if ((errors === null || errors === void 0 ? void 0 : errors.length) == 1) {
            return (_a = errors[0]) === null || _a === void 0 ? void 0 : _a.message;
        }
        return (_jsx("ul", { className: "ml-4 flex list-disc flex-col gap-1", children: errors.map(function (error, index) {
                return (error === null || error === void 0 ? void 0 : error.message) && _jsx("li", { children: error.message }, index);
            }) }));
    }, [children, errors]);
    if (!content) {
        return null;
    }
    return (_jsx("div", __assign({ role: "alert", "data-slot": "field-error", className: cn("text-destructive text-sm font-normal", className) }, props, { children: content })));
}
export { Field, FieldLabel, FieldDescription, FieldError, FieldGroup, FieldLegend, FieldSeparator, FieldSet, FieldContent, FieldTitle, };
