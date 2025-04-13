// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  ignorePatterns: ['/dist/*'],
  plugins: ['prettier'],
  rules: {
    'no-var': 'error', // 禁止使用 var
    'prettier/prettier': 'error',
  },
};
