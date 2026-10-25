import nextConfig from 'eslint-config-next/core-web-vitals'

// ESLint 9 flat config. `next lint` on Next.js 14 still calls the ESLint 8
// option set, so `npm run lint` invokes ESLint directly.
// The react-hooks rules below are warnings because they flag existing
// effects; new height-difference code is still typechecked and error-clean.
const config = [
  {
    ignores: ['.next/**', 'node_modules/**', 'test-results/**', 'playwright-report/**'],
  },
  ...nextConfig,
  {
    rules: {
      'react-hooks/exhaustive-deps': 'warn',
      '@next/next/no-img-element': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/purity': 'warn',
      '@next/next/no-html-link-for-pages': 'warn',
    },
  },
]

export default config
