import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
  build: {
    target: 'es2020',
    // One main stylesheet (all page CSS is imported statically); only the lazily
    // imported 繁體 font CSS (src/styles/fonts-hant.ts) becomes its own file.
    cssCodeSplit: true,
  },
  test: {
    include: ['tests/**/*.test.{ts,tsx}'],
    environment: 'node',
  },
})
