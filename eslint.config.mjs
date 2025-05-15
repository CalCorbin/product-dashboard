import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

// Setup for FlatCompat
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig([
  { ignores: ['./coverage/**'] },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: [
      '**/*.test.{js,mjs,cjs,jsx}',
      '**/*.spec.{js,mjs,cjs,jsx}',
      '**/tests/**/*.{js,mjs,cjs,jsx}',
    ],
    languageOptions: {
      globals: { ...globals.jest, ...globals.node, ...globals.browser },
    },
  },
  pluginReact.configs.flat.recommended,
  ...compat.extends('next/core-web-vitals'), // Add Next.js core-web-vitals config
]);
