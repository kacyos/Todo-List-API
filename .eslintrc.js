module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es2021: true,
    node: true
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier',
    'standard'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-multiple-empty-lines': ['error', { max: 1 }],
    semi: ['error', 'always']
  }
};
