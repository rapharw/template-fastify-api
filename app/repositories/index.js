/**
 * Loads all files (ignore index.js and repository-template.js), placing them in the fastify instance <br>
 * The files can be obtained with fastify.repositories(); <br>
 *
 * Example: <br>
 * const repositories = { <br>
 *     UserRepository: require(...); <br>
 * };<br>
 */

const fp = require("fastify-plugin");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

const repositories = {};

module.exports = fp(async (fastify, opts) => {
  fs.readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js" &&
        file !== "index.js" &&
        file !== "repository-template.js"
      );
    })
    .forEach((file) => {
      const repo = require(path.join(__dirname, file));
      const prefix = repo.name;

      // the required file "repo" will be inserted on "const repositories = {};" with name of file.
      repositories[prefix] = repo;
    });

  fastify.decorate(`repositories`, () => repositories);
});
