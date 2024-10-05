import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { configs as tsConfigs } from '@typescript-eslint/eslint-plugin'; // Importing TypeScript ESLint plugin configs

export default {
  // Ignores dist folder from linting
  ignores: ['dist'],
  
  // Main configuration
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],  // Apply these rules to TypeScript and TSX files
      extends: [
        js.configs.recommended,  // Recommended JS rules
        ...tsConfigs.recommended, // Recommended TypeScript ESLint rules
      ],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,  // Browser globals such as 'window'
        sourceType: 'module',
      },
      plugins: {
        'react-hooks': reactHooks, // Enabling React hooks rules
        'react-refresh': reactRefresh, // Enabling React Refresh plugin
      },
      rules: {
        // Enable recommended rules from the react-hooks plugin
        ...reactHooks.configs.recommended.rules,

        // React Refresh rule for ensuring only components are exported
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],

        // Disable the 'react/react-in-jsx-scope' rule for React 17+
        'react/react-in-jsx-scope': 'off',

        // Other potential rules
        'no-unused-vars': 'warn', // Warn about unused variables
        'no-console': 'warn',     // Warn about console.log usage
        'react/jsx-uses-react': 'off', // Prevent React being marked as unused
        'react/jsx-uses-vars': 'error', // Ensure variables used in JSX are marked as used
      },
    },
  ],
};
