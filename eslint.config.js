import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import tsParser from "@typescript-eslint/parser";

export default defineConfig([
  globalIgnores(['dist']),
  {
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.eslint.json',
      }
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      "react-refresh/only-export-components": ["warn", {
        allowConstantExport: true,
      }],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-useless-escape": "off",
      "typescript-eslint/no-require-imports": "off",
      "no-undef": "off",
      'max-len': ['error', { code: 120 }],
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 'warn',
      'import/order': ['warn', {
        alphabetize: {
          order: 'asc', // or 'desc'
          caseInsensitive: true
        },
        'newlines-between': 'always', // optional: enforce newlines between groups
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      }],
    },
  },
])
