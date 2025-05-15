import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig([
  {
    ignores: [
      './coverage/**',
      './dist/**',
      './node_modules/**',
      './test/**',
      './.next/**',
    ],
  },
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
  {
    files: ['**/*.cy.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        cy: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
  },
  pluginReact.configs.flat.recommended,
  ...compat.extends('next/core-web-vitals'),
]);
