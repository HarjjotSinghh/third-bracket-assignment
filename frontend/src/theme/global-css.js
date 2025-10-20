import { defineGlobalStyles } from '@pandacss/dev';
export var globalCss = defineGlobalStyles({
    extend: {
        '*, *::before, *::after': {
            borderColor: 'gray.a4',
            boxSizing: 'border-box',
            transitionProperty: 'colors, background-color, border-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
            transitionDuration: '150ms',
            transitionTimingFunction: 'ease-in-out',
        },
        '*::selection': {
            bg: 'accent.a3',
            color: 'accent.contrast',
        },
        '*::placeholder': {
            opacity: 1,
            color: 'fg.subtle',
        },
        html: {
            colorPalette: 'gray',
            scrollBehavior: 'smooth',
        },
        body: {
            background: 'linear-gradient(135deg, {colors.gray.1} 0%, {colors.gray.2} 100%)',
            color: 'fg.default',
            minHeight: '100vh',
            fontFamily: 'Inter, system-ui, sans-serif',
        },
        /* Enhanced scrollbar */
        '::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
        },
        '::-webkit-scrollbar-track': {
            background: 'gray.a2',
            borderRadius: '4px',
        },
        '::-webkit-scrollbar-thumb': {
            background: 'gray.a6',
            borderRadius: '4px',
            '&:hover': {
                background: 'gray.a8',
            },
        },
        /* Focus styles */
        '*:focus-visible': {
            outline: '2px solid',
            outlineColor: 'accent.8',
            outlineOffset: '2px',
        },
    },
});
