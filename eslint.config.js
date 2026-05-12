const angular = require('@angular-eslint/eslint-plugin');
const angularTemplate = require('@angular-eslint/eslint-plugin-template');
const tsParser = require('@typescript-eslint/parser');
const angularTemplateParser = require('@angular-eslint/template-parser');
const prettier = require('eslint-config-prettier');

module.exports = [
  {
    ignores: [
      'projects/**/*',
      'dist/**/*',
      'www/**/*',
      'build/**/*',
      '.angular/**/*',
      'coverage/**/*',
      'node_modules/**/*',
      'android/**/*',
      'ios/**/*',
      '**/*.config.js',
      '**/*.config.ts',
      'karma.conf.js',
      '**/*.spec.ts',
      '**/*.html',
      '**/index.html',
      '**/environments/**/*',
      '**/main.ts',
      '**/polyfills.ts',
      '**/test.ts',
    ],
  },
  {
    files: ['src/app/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        createDefaultProgram: true,
      },
    },
    plugins: {
      '@angular-eslint': angular,
    },
    rules: {
      ...angular.configs.recommended.rules,
      '@angular-eslint/component-class-suffix': [
        'error',
        {
          suffixes: ['Page', 'Component'],
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      ...prettier.rules,
    },
  },
];
