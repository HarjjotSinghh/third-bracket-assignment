import { defineKeyframes } from '@pandacss/dev'

export const keyframes = defineKeyframes({
  // collapse
  'expand-height': {
    from: { height: '0' },
    to: { height: 'var(--height)' },
  },
  'collapse-height': {
    from: { height: 'var(--height)' },
    to: { height: '0' },
  },
  'expand-width': {
    from: { width: '0' },
    to: { width: 'var(--width)' },
  },
  'collapse-width': {
    from: { width: 'var(--width)' },
    to: { width: '0' },
  },
  // fade
  'fade-in': {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  'fade-out': {
    from: { opacity: '1' },
    to: { opacity: '0' },
  },
  // slide from (full)
  'slide-from-left-full': {
    from: { translate: '-100% 0' },
    to: { translate: '0 0' },
  },
  'slide-from-right-full': {
    from: { translate: '100% 0' },
    to: { translate: '0 0' },
  },
  'slide-from-top-full': {
    from: { translate: '0 -100%' },
    to: { translate: '0 0' },
  },
  'slide-from-bottom-full': {
    from: { translate: '0 100%' },
    to: { translate: '0 0' },
  },
  // slide to (full)
  'slide-to-left-full': {
    from: { translate: '0 0' },
    to: { translate: '-100% 0' },
  },
  'slide-to-right-full': {
    from: { translate: '0 0' },
    to: { translate: '100% 0' },
  },
  'slide-to-top-full': {
    from: { translate: '0 0' },
    to: { translate: '0 -100%' },
  },
  'slide-to-bottom-full': {
    from: { translate: '0 0' },
    to: { translate: '0 100%' },
  },
  // slide from
  'slide-from-top': {
    '0%': { translate: '0 -0.5rem' },
    to: { translate: '0' },
  },
  'slide-from-bottom': {
    '0%': { translate: '0 0.5rem' },
    to: { translate: '0' },
  },
  'slide-from-left': {
    '0%': { translate: '-0.5rem 0' },
    to: { translate: '0' },
  },
  'slide-from-right': {
    '0%': { translate: '0.5rem 0' },
    to: { translate: '0' },
  },
  // slide to
  'slide-to-top': {
    '0%': { translate: '0' },
    to: { translate: '0 -0.5rem' },
  },
  'slide-to-bottom': {
    '0%': { translate: '0' },
    to: { translate: '0 0.5rem' },
  },
  'slide-to-left': {
    '0%': { translate: '0' },
    to: { translate: '-0.5rem 0' },
  },
  'slide-to-right': {
    '0%': { translate: '0' },
    to: { translate: '0.5rem 0' },
  },
  // scale
  'scale-in': {
    from: { scale: '0.95' },
    to: { scale: '1' },
  },
  'scale-out': {
    from: { scale: '1' },
    to: { scale: '0.95' },
  },
  'bg-position': {
    from: {
      backgroundPosition: 'var(--animate-from, 1rem) 0',
    },
    to: {
      backgroundPosition: 'var(--animate-to, 0) 0',
    },
  },
  position: {
    from: {
      insetInlineStart: 'var(--animate-from-x)',
      insetBlockStart: 'var(--animate-from-y)',
    },
    to: {
      insetInlineStart: 'var(--animate-to-x)',
      insetBlockStart: 'var(--animate-to-y)',
    },
  },
  // Enhanced modern animations
  'bounce-gentle': {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-4px)' },
  },
  'pulse-subtle': {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.8' },
  },
  'slide-up-fade': {
    from: {
      opacity: '0',
      transform: 'translateY(20px)',
    },
    to: {
      opacity: '1',
      transform: 'translateY(0)',
    },
  },
  'slide-in-from-left': {
    from: {
      opacity: '0',
      transform: 'translateX(-30px)',
    },
    to: {
      opacity: '1',
      transform: 'translateX(0)',
    },
  },
  'slide-in-from-right': {
    from: {
      opacity: '0',
      transform: 'translateX(30px)',
    },
    to: {
      opacity: '1',
      transform: 'translateX(0)',
    },
  },
  'shimmer': {
    '0%': {
      transform: 'translateX(-100%)',
    },
    '100%': {
      transform: 'translateX(100%)',
    },
  },
  'float': {
    '0%, 100%': {
      transform: 'translateY(0px)',
    },
    '50%': {
      transform: 'translateY(-10px)',
    },
  },
  'glow': {
    '0%, 100%': {
      boxShadow: '0 0 20px rgba(251, 191, 36, 0.3)',
    },
    '50%': {
      boxShadow: '0 0 30px rgba(251, 191, 36, 0.6)',
    },
  },
  'rotate-slow': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
  'scale-in-bounce': {
    '0%': {
      opacity: '0',
      transform: 'scale(0.3)',
    },
    '50%': {
      transform: 'scale(1.05)',
    },
    '70%': {
      transform: 'scale(0.9)',
    },
    '100%': {
      opacity: '1',
      transform: 'scale(1)',
    },
  },
})
