const { readFileSync } = require("fs");
const { join } = require("path");

// Used in node scripts: "NODE_ENV=test yarn do-stuff"
const INLINE_DEFINED_ENV_VARS = ["NODE_ENV"];

// Only used locally
const LOCAL_ENV_VARS = ["LOGSTASH_USER", "TEST_RANDOM_SEED", "TEST_LOG_LEVEL"];

// Only used by the CI / CD
const CI_ENV_VARS = ["API_EXPOSE_HTTP", "API_EXPOSE_TASK"];

// Only used in scripts / crons
const SCRIPT_ENV_VARS = ["BUCKET_NAME", "FLEURY_MICHON_CONFIG", "PROJECT_ID"];

// Accept undefined value, for example:
// const name = process.env.REDIS_SENTINEL_NAME_API || 'mymaster'
const POSSIBLY_UNDEFINED_ENV_VARS = [
  "GITHUB_ACTIONS",
  "LOG_LEVEL",
  "PI_ELECTRONIQUE_URL",
  "RABBIT_USER",
  "REDIS_SENTINEL_API_URL",
  "REDIS_SENTINEL_NAME_API",
  "REDIS_SENTINEL_PORT_API",
  "REDIS_USE_SENTINEL",
  "SERVER_KEEPALIVE_TIMEOUT_SEC",
  "METABASE_SECRET_KEY",
];

// This env variables are (probably ?) not used anymore -> TODO delete it
const DEAD_CODE_ENV_VARS = ["API_PORT_LISTENNING", "SECRET_KEY_ORDER_RAW_DATASTORE"];

const OTHER_ENV_VARS = ["FIREBASE_USER"]; // only used in dev environment

const NOT_NEEDED_IN_ENV_FILE_ENV_VARS = INLINE_DEFINED_ENV_VARS.concat(
  LOCAL_ENV_VARS,
  CI_ENV_VARS,
  SCRIPT_ENV_VARS,
  POSSIBLY_UNDEFINED_ENV_VARS,
  DEAD_CODE_ENV_VARS,
  OTHER_ENV_VARS,
);

const dotenvTemplateFile = readFileSync(join(__dirname, "..", "..", ".env.template"), "utf8");

const SPECIFIED_IN_ENV_TEMPLATE_ENV_VARS = dotenvTemplateFile
  .split("\n")
  .filter((line) => /^[^#]*=.*$/.test(line))
  .map((line) => line.split("=")[0]);

const DECLARED_ENV_VARS = SPECIFIED_IN_ENV_TEMPLATE_ENV_VARS.concat(NOT_NEEDED_IN_ENV_FILE_ENV_VARS);

const NEEDED_IN_ENV_FILE_ENV_VARS = SPECIFIED_IN_ENV_TEMPLATE_ENV_VARS.filter(
  (variable) => !NOT_NEEDED_IN_ENV_FILE_ENV_VARS.includes(variable),
);

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
  NEEDED_IN_ENV_FILE_ENV_VARS,
};
