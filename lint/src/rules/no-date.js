// s'inspirer de https://github.com/eslint/eslint/blob/6f4abe5d5ade2711cc4c21bc8485af952763c2d3/lib/rules/no-array-constructor.js

module.exports = {
  meta: {
    messages: {
      noNativeDate: "Don't use native Date class, use dayjs library instead",
    },
  },

  create(context) {
    function checkIsDate(node) {
      if (node.callee.name !== "Date") {
        return;
      }

      context.report({
        node,
        messageId: "noNativeDate",
      });
    }

    return {
      NewExpression(node) {
        checkIsDate(node);
      },
    };
  },
};
