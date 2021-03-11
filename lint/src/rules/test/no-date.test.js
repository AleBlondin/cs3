const { RuleTester } = require("eslint");
const rule = require("../no-date");

const ruleTester = new RuleTester();

ruleTester.run("no-date", rule, {
  valid: [
    {
      code: "const a = new Text();",
      parserOptions: { ecmaVersion: 6 },
    },
  ],
  invalid: [
    {
      code: "const a = new Date();",
      parserOptions: { ecmaVersion: 6 },
      errors: [{ messageId: "noNativeDate" }],
    },
  ],
});
