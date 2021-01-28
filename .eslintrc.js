module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/typedef': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',

  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/typedef': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
};
