const { RuleTester } = require("eslint");
const rule = require("../no-unspecified-env-variables");

const ruleTester = new RuleTester();

ruleTester.run("no-unspecified-env-variables", rule, {
  valid: [
    {
      code: "process.env.DECLARED_VARIABLE;",
    },
    {
      code: "let key = 'key'; process.env[key];",
      parserOptions: { ecmaVersion: 6 },
    },
  ],
  invalid: [
    {
      code: "process.env.RANDOM_VARIABLE;",
      errors: [{ messageId: "unspecifiedEnvVariable" }],
    },
  ],
});
