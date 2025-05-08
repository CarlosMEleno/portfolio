import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      vue: pluginVue,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...pluginVue.configs['flat/essential'].rules,
    },
  },
  pluginPrettierRecommended,
]
