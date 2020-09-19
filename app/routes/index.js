const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

async function loadRoutes(fastify, options) {
  fs.readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-9) === "-route.js"
      );
    })
    .forEach((file) => {
      const pluginRoute = require(path.join(__dirname, file));
      const prefix = file.replace("-route.js", "");

      // register route and prefix with name of file
      fastify.register(pluginRoute, { prefix: prefix });
    });
}
module.exports = loadRoutes;
