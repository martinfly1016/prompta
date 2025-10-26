/** @type {import('tailwindcss').Config} */
import tokens from './src/design-tokens/tokens.json' assert { type: 'json' }

// Transform design tokens into Tailwind-compatible format
const createColorScale = (colorTokens) => {
  const result = {}
  Object.entries(colorTokens).forEach(([key, value]) => {
    if (typeof value === 'string') {
      result[key] = value
    } else if (typeof value === 'object') {
      Object.entries(value).forEach(([shade, color]) => {
        result[`${key}-${shade}`] = color
      })
    }
  })
  return result
}

const primitiveColors = createColorScale(tokens.colors.primitive)
const semanticColors = {
  dark: tokens.colors.semantic.dark,
  light: tokens.colors.semantic.light,
  status: tokens.colors.semantic.status,
}

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // CSS variable colors (backward compatible)
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        // Design token colors
        ...primitiveColors,
      },
      fontFamily: {
        sans: tokens.typography.fontFamilies.sans.split(',').map(f => f.trim()),
        mono: tokens.typography.fontFamilies.mono.split(',').map(f => f.trim()),
      },
      fontSize: {
        xs: [tokens.typography.fontSizes.xs.size, { lineHeight: tokens.typography.fontSizes.xs.lineHeight, letterSpacing: tokens.typography.fontSizes.xs.letterSpacing }],
        sm: [tokens.typography.fontSizes.sm.size, { lineHeight: tokens.typography.fontSizes.sm.lineHeight }],
        base: [tokens.typography.fontSizes.base.size, { lineHeight: tokens.typography.fontSizes.base.lineHeight }],
        lg: [tokens.typography.fontSizes.lg.size, { lineHeight: tokens.typography.fontSizes.lg.lineHeight }],
        xl: [tokens.typography.fontSizes.xl.size, { lineHeight: tokens.typography.fontSizes.xl.lineHeight, letterSpacing: tokens.typography.fontSizes.xl.letterSpacing }],
        '2xl': [tokens.typography.fontSizes['2xl'].size, { lineHeight: tokens.typography.fontSizes['2xl'].lineHeight, letterSpacing: tokens.typography.fontSizes['2xl'].letterSpacing }],
        '3xl': [tokens.typography.fontSizes['3xl'].size, { lineHeight: tokens.typography.fontSizes['3xl'].lineHeight, letterSpacing: tokens.typography.fontSizes['3xl'].letterSpacing }],
        '4xl': [tokens.typography.fontSizes['4xl'].size, { lineHeight: tokens.typography.fontSizes['4xl'].lineHeight, letterSpacing: tokens.typography.fontSizes['4xl'].letterSpacing }],
        '5xl': [tokens.typography.fontSizes['5xl'].size, { lineHeight: tokens.typography.fontSizes['5xl'].lineHeight, letterSpacing: tokens.typography.fontSizes['5xl'].letterSpacing }],
        '6xl': [tokens.typography.fontSizes['6xl'].size, { lineHeight: tokens.typography.fontSizes['6xl'].lineHeight, letterSpacing: tokens.typography.fontSizes['6xl'].letterSpacing }],
      },
      fontWeight: {
        regular: tokens.typography.fontWeights.regular,
        medium: tokens.typography.fontWeights.medium,
        semibold: tokens.typography.fontWeights.semibold,
        bold: tokens.typography.fontWeights.bold,
      },
      lineHeight: {
        tight: tokens.typography.lineHeights.tight,
        snug: tokens.typography.lineHeights.snug,
        normal: tokens.typography.lineHeights.normal,
        relaxed: tokens.typography.lineHeights.relaxed,
        loose: tokens.typography.lineHeights.loose,
      },
      spacing: tokens.spacing.scale,
      gap: tokens.spacing.gaps,
      padding: tokens.spacing.padding,
      margin: tokens.spacing.margin,
      borderRadius: tokens.borderRadius,
      boxShadow: tokens.shadows,
      transitionDuration: {
        fast: tokens.transitions.durations.fast,
        base: tokens.transitions.durations.base,
        slow: tokens.transitions.durations.slow,
        slower: tokens.transitions.durations.slower,
      },
      transitionTimingFunction: {
        'ease-out': tokens.transitions.timingFunctions['ease-out'],
        'ease-in': tokens.transitions.timingFunctions['ease-in'],
        'ease-in-out': tokens.transitions.timingFunctions['ease-in-out'],
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out',
        'slide-in': 'slide-in 0.3s ease-in-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
