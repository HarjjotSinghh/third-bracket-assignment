import '@testing-library/jest-dom';
// Mock IntersectionObserver
global.IntersectionObserver = /** @class */ (function () {
    function IntersectionObserver() {
    }
    IntersectionObserver.prototype.disconnect = function () { };
    IntersectionObserver.prototype.observe = function () { };
    IntersectionObserver.prototype.unobserve = function () { };
    return IntersectionObserver;
}());
// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: function (query) { return ({
        matches: false,
        media: query,
        onchange: null,
        addListener: function () { }, // deprecated
        removeListener: function () { }, // deprecated
        addEventListener: function () { },
        removeEventListener: function () { },
        dispatchEvent: function () { },
    }); },
});
