module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb-base",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    quotes: ["error", "double"],
    "no-restricted-syntax": [
      "error",
      {
        selector: "NewExpression[callee.name=Date]",
        message: "Don't use native Date class, use dayjs library instead",
      },
    ],
  },
};
