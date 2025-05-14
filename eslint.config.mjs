import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

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
      globals: { ...globals.jest },
    },
  },
  pluginReact.configs.flat.recommended,
]);
