const DECLARED_ENV_VARS = ["DECLARED_VARIABLE"];

module.exports = {
  meta: {
    messages: {
      unspecifiedEnvVariable: "The {{envVariableName}} env variable is not specified in '.env.template'.",
    },
  },

  create(context) {
    /**
         * We check for process.env.someKey, where someKey is not declared in .env.template
         */
    function checkPropertyAccess(node) {
      if (node.object && node.object.name !== "process") {
        return;
      }
      if (node.property && node.property.name !== "env") {
        return;
      }
      if (node.parent.computed === true) {
        // This is for example: process.env[key]
        return;
      }
      if (!node.parent.property || DECLARED_ENV_VARS.includes(node.parent.property.name)) {
        return;
      }

      context.report({
        node,
        messageId: "unspecifiedEnvVariable",
        data: {
          envVariableName: node.parent.property.name,
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
