import { defineAnimationStyles } from '@pandacss/dev';
export var animationStyles = defineAnimationStyles({
    'slide-fade-in': {
        value: {
            transformOrigin: 'var(--transform-origin)',
            '&[data-placement^=top]': {
                animationName: 'slide-from-bottom, fade-in',
            },
            '&[data-placement^=bottom]': {
                animationName: 'slide-from-top, fade-in',
            },
            '&[data-placement^=left]': {
                animationName: 'slide-from-right, fade-in',
            },
            '&[data-placement^=right]': {
                animationName: 'slide-from-left, fade-in',
            },
        },
    },
    'slide-fade-out': {
        value: {
            transformOrigin: 'var(--transform-origin)',
            '&[data-placement^=top]': {
                animationName: 'slide-to-bottom, fade-out',
            },
            '&[data-placement^=bottom]': {
                animationName: 'slide-to-top, fade-out',
            },
            '&[data-placement^=left]': {
                animationName: 'slide-to-right, fade-out',
            },
            '&[data-placement^=right]': {
                animationName: 'slide-to-left, fade-out',
            },
        },
    },
    'scale-fade-in': {
        value: {
            transformOrigin: 'var(--transform-origin)',
            animationName: 'scale-in, fade-in',
        },
    },
    'scale-fade-out': {
        value: {
            transformOrigin: 'var(--transform-origin)',
            animationName: 'scale-out, fade-out',
        },
    },
    // Enhanced animation styles
    'slide-up-fade': {
        value: {
            animationName: 'slide-up-fade',
            animationDuration: '0.4s',
            animationTimingFunction: 'ease-out',
            animationFillMode: 'both',
        },
    },
    'slide-in-left': {
        value: {
            animationName: 'slide-in-from-left',
            animationDuration: '0.5s',
            animationTimingFunction: 'ease-out',
            animationFillMode: 'both',
        },
    },
    'slide-in-right': {
        value: {
            animationName: 'slide-in-from-right',
            animationDuration: '0.5s',
            animationTimingFunction: 'ease-out',
            animationFillMode: 'both',
        },
    },
    'bounce-gentle': {
        value: {
            animationName: 'bounce-gentle',
            animationDuration: '2s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
        },
    },
    'pulse-subtle': {
        value: {
            animationName: 'pulse-subtle',
            animationDuration: '3s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
        },
    },
    'float-animation': {
        value: {
            animationName: 'float',
            animationDuration: '6s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
        },
    },
    'glow-animation': {
        value: {
            animationName: 'glow',
            animationDuration: '2s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
        },
    },
    'scale-in-bounce': {
        value: {
            animationName: 'scale-in-bounce',
            animationDuration: '0.6s',
            animationTimingFunction: 'ease-out',
            animationFillMode: 'both',
        },
    },
    'shimmer': {
        value: {
            animationName: 'shimmer',
            animationDuration: '2s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
        },
    },
});
