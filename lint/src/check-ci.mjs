import { config as loadEnv } from "dotenv";
import { NEEDED_IN_ENV_FILE_ENV_VARS } from "./rules/no-unspecified-env-variables";

/**
 * Usage:
 * yarn check_if_env_variables_are_defined {env};
 *
 * Checks if variables in NEEDED_IN_ENV_FILE_ENV_VARS are all defined in .env.{env}
 */
(() => {
  const env = process.argv[2];

  loadEnv({ path: `.env.${env}` });

  const undefinedEnvVariablesInEnvFile = NEEDED_IN_ENV_FILE_ENV_VARS.filter(
    (envVariableName) => !Object.keys(process.env).includes(envVariableName),
  );

  if (undefinedEnvVariablesInEnvFile.length === 0) {
    return;
  }

  throw Error(`This env variables are undefined: ${undefinedEnvVariablesInEnvFile}`);
})();
