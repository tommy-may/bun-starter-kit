/**
 * @typedef {import("eslint/config").Config} Config
 * @typedef {Parameters<typeof defineConfig>} ConfigWithExtendsArray
 */

import js from '@eslint/js';
import prettier from 'eslint-config-prettier/flat';
import perfectionist from 'eslint-plugin-perfectionist';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

const typescriptRules = {
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        disallowTypeAnnotations: true,
        fixStyle: 'separate-type-imports',
        prefer: 'type-imports',
      },
    ],
  },
};

const perfectionistConfig = {
  plugins: {
    perfectionist,
  },
  rules: {
    'perfectionist/sort-exports': [
      'error',
      {
        type: 'natural',
        order: 'asc',
        fallbackSort: { type: 'alphabetical' },
        ignoreCase: true,
        specialCharacters: 'keep',
        partitionByComment: false,
        partitionByNewLine: false,
        newlinesBetween: 'ignore',
        newlinesInside: 'ignore',
        groups: [],
        customGroups: [],
      },
    ],
    'perfectionist/sort-imports': [
      'error',
      {
        type: 'natural',
        order: 'asc',
        fallbackSort: { type: 'alphabetical' },
        ignoreCase: true,
        specialCharacters: 'keep',
        sortBy: 'path',
        internalPattern: ['^~/.+', '^@/.+', '^#.+'],
        partitionByComment: false,
        partitionByNewLine: false,
        newlinesBetween: 1,
        newlinesInside: 0,
        maxLineLength: undefined,
        groups: [
          'react',
          'type-import',
          ['value-builtin', 'value-external'],
          'type-internal-packages',
          'value-internal-packages',
          'type-internal',
          'value-internal',
          ['type-parent', 'type-sibling', 'type-index'],
          ['value-parent', 'value-sibling', 'value-index'],
          'ts-equals-import',
          'unknown',
        ],
        customGroups: [
          {
            groupName: 'react',
            elementNamePattern: ['^react$', '^react-.+'],
          },
          {
            selector: 'type',
            groupName: 'type-internal-packages',
            elementNamePattern: ['^#pkg/.+', '^@pkg/.+'],
          },
          {
            groupName: 'value-internal-packages',
            elementNamePattern: ['^#pkg/.+', '^@pkg/.+'],
          },
        ],
        environment: 'bun',
        useExperimentalDependencyDetection: true,
      },
    ],
    'perfectionist/sort-named-exports': [
      'error',
      {
        type: 'natural',
        order: 'asc',
        fallbackSort: { type: 'alphabetical' },
        ignoreAlias: false,
        ignoreCase: true,
        specialCharacters: 'keep',
        partitionByNewLine: false,
        partitionByComment: false,
        newlinesBetween: 'ignore',
        newlinesInside: 'ignore',
        groups: [],
        customGroups: [],
      },
    ],
    'perfectionist/sort-named-imports': [
      'error',
      {
        type: 'alphabetical',
        order: 'asc',
        fallbackSort: { type: 'unsorted' },
        ignoreAlias: false,
        ignoreCase: true,
        specialCharacters: 'keep',
        partitionByNewLine: false,
        partitionByComment: false,
        newlinesBetween: 'ignore',
        newlinesInside: 'ignore',
        groups: [],
        customGroups: [],
      },
    ],
  },
};

/**
 * @param {ConfigWithExtendsArray} args
 * @returns {Config[]}
 */
export const defineExtraConfig = (...args) =>
  defineConfig([
    {
      files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
      plugins: { js },
      extends: ['js/recommended'],
      rules: {
        'no-console': ['error', { allow: ['warn', 'error'] }],
      },
    },
    tseslint.configs.recommendedTypeChecked,
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
        },
      },
    },
    typescriptRules,
    perfectionistConfig,
    ...args,
    prettier,
  ]);

export default defineExtraConfig();
