import { Theme } from './theme.types'

export const theme: Theme = {
  colors: {
    primary: '#3B82F6',
    secondary: '#6366F1',
    background: {
      gradient: {
        from: '#EFF6FF',
        to: '#EEF2FF',
      },
      main: '#F9FAFB',
      white: '#FFFFFF',
    },
    text: {
      primary: '#111827',
      secondary: '#4B5563',
      success: '#059669',
    },
    border: '#E5E7EB',
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      400: '#9CA3AF',
      600: '#4B5563',
      700: '#374151',
    },
    purple: {
      50: '#F5F3FF',
      500: '#8B5CF6',
      600: '#7C3AED',
    },
    indigo: {
      500: '#6366F1',
    },
  },
  layout: {
    minHeight: '100vh',
    container: {
      padding: '1rem',
    },
  },
  spacing: {
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
  },
  borderRadius: {
    default: '0.25rem',
    full: '9999px',
    lg: '0.5rem',
  },
  transitions: {
    default: 'all 0.3s ease',
  },
  shadows: {
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },
} 