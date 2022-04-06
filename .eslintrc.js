module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/ban-types': [
      'error', {
        'extendDefaults': true,
        'types': {
          '{}': false,
          'Function': false,
        },
      },
    ],
    'indent': ['error', 4, { 'SwitchCase': 1, 'ignoredNodes': ['PropertyDefinition'] }],
    // 'indent': 'off',
    // '@typescript-eslint/indent': ['error', { 'SwitchCase': 1, 'ignoredNodes': ['PropertyDefinition'] }],
    // '@typescript-eslint/indent': ['error'],
    'no-tabs': 0,
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': ['error', { 'allow': ['decoratedFunctions'] }]
  },
};
