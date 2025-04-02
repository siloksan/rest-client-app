/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setup.tests.ts'],
    coverage: {
      include: ['**/*.{ts,tsx}'],
      exclude: [
        '**/node_modules/**',
        '**/*.test.{js,jsx,ts,tsx}',
        '.next/',
        '**/*.config.{js,mjs,ts}',
      ],
    },
  },
});
