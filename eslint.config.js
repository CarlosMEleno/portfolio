import pluginVue from 'eslint-plugin-vue'
import love from 'eslint-config-love'
import eslint from '@eslint/js'
import prettier from 'eslint-config-prettier'

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...pluginVue.configs['flat/recommended'],
  {
    rules: eslint.configs.recommended.rules,
    files: ['**/*.js'],
  },
  {
    ...love,
    files: ['**/*.ts'],
  },
  prettier,
  {
    rules: {
      'vue/no-lone-template': 'off',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unsafe-type-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/class-methods-use-this': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'eslint-comments/require-description': 'off',
      '@typescript-eslint/prefer-destructuring': 'off',
    },
  },
  {
    ignores: ['public', 'dist'],
  },
]
