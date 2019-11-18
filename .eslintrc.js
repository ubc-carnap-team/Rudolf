// @ts-check
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
  },
  settings: {
    node: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    react: { version: 'detect' },
  },
  plugins: ['@typescript-eslint', 'jsx-a11y', 'react', 'react-hooks'],
  extends: [
    'plugin:promise/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
    'plugin:jsx-a11y/recommended',
  ],
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/promise-function-async': ['error', { allowAny: true }],
    '@typescript-eslint/restrict-plus-operands': 'error',
    '@typescript-eslint/unbound-method': 'warn',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prefer-template': 'error',
    'react/prop-types': 'off',
    'no-useless-rename': 'error',
    'prefer-destructuring': 'error',
    'object-shorthand': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'jsx-a11y/click-events-have-key-events': 'off', // TODO
    'jsx-a11y/no-static-element-interactions': 'off', // TODO
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_$', ignoreRestSiblings: true },
    ],
  },
}
