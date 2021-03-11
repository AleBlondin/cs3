const DECLARED_ENV_VARS = ["DECLARED_VARIABLE"];

module.exports = {
  meta: {
    messages: {
      unspecifiedEnvVariable: "The {{envVariableName}} env variable is not specified",
    },
  },

  create(context) {
    /**
     * We check for process.env.someKey, where someKey is not declared in .env.template
     */
    function checkPropertyAccess(node) {
      return; // no error for now

      context.report({
        node,
        messageId: "unspecifiedEnvVariable",
        data: {
          envVariableName: node, // to complete
        },
      });
    }

    return {
      MemberExpression(node) {
        checkPropertyAccess(node);
      },
    };
  },
  DECLARED_ENV_VARS,
};
