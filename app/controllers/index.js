const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

async function loadControllers(fastify, options, done) {

  fs.readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-14) === "-controller.js"
      );
    })
    .forEach((file) => {
      const pluginController = require(path.join(__dirname, file));
      const prefix = file.replace("-controller.js", "");

        fastify.register(pluginController);
        fastify.decorate(`controllers`, () => pluginController);
    });


}
module.exports = loadControllers;
