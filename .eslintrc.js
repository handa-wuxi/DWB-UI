module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'import/no-mutable-exports': 0,
    camelcase: 0,
    'no-new': 0,
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': 0,
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        args: 'none',
      },
    ],
    'vue/multi-word-component-names': 0,
  },
};
