/**
 * Loads all files (ignore index.js), placing them in the fastify instance <br>
 * The files can be obtained with fastify.services(); <br>
 *
 * Example: <br>
 * const services = { <br>
 *     UserService: require(...); <br>
 * };<br>
 */

const fp = require("fastify-plugin");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

const services = {};

module.exports = fp(async (fastify, opts) => {
  fs.readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js" &&
        file !== "index.js"
      );
    })
    .forEach((file) => {
      const svc = require(path.join(__dirname, file));
      const prefix = svc.name;

      // the required file "svc" will be inserted on "const services = {};" with name of file.
      services[prefix] = svc;
    });

  fastify.decorate(`services`, () => services);
});
