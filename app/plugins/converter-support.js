/**
 * Converter functions to use on global scope. <br>
 * Example: loadYamlFromPath
 */

const fp = require("fastify-plugin");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

module.exports = fp(async (fastify, options) => {

  /**
   * Load a Yaml file from a Path
   * @param pathToYaml
   * @returns {any}
   */
  const loadYamlFromPath = (pathToYaml) => {
    return yaml.safeLoad(
      fs.readFileSync(path.resolve(pathToYaml), { encoding: "utf-8" })
    );
  };


  fastify.decorate("converter", () => {
    return { loadYamlFromPath };
  });

});
