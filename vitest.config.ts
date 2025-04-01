/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setup.tests.ts'],
    coverage: {
      include: ['**/*.{ts,tsx}'],
      exclude: ['**/node_modules/**', '**/*.test.{js,jsx,ts,tsx}', '.next/'],
    },
  },
});
