export const theme = {
  colors: {
    zinc50: '#fafafa',
    zinc100: '#f4f4f5',
    zinc200: '#e4e4e7',
    zinc300: '#d4d4d8',
    zinc400: '#a1a1aa',
    zinc500: '#71717a',
    zinc600: '#52525b',
    zinc700: '#3f3f46',
    zinc800: '#27272a',
    zinc900: '#18181b',
    zinc950: '#09090b',
    indigo400: '#818cf8',
    indigo600: '#4f46e5',
    indigo700: '#4338ca',
    amber50: '#fffbeb',
    amber100: '#fef3c7',
    amber200: '#fde68a',
    amber900: '#78350f',
    amber950: '#451a03',
    red600: '#dc2626',
    white: '#ffffff',
  },
  maxWidth: {
    content: '72rem',
  },
  breakpoints: {
    sm: '640px',
    lg: '1024px',
  },
} as const

export type AppTheme = typeof theme

export const darkMode = '@media (prefers-color-scheme: dark)'
