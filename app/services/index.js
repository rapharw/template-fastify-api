/**
 * Loads all files (ignore index.js) on the current folder, placing them in the fastify instance <br>
 * The instances can be obtained with fastify.services(); <br>
 *
 */
const fp = require("fastify-plugin");
const path = require("path");
const basename = path.basename(__filename);

module.exports = fp(async (fastify, opts) => {

  const dirName = __dirname;
  const ignoredFiles = ["index.js"];
  const decorateName = 'services';
  
  const loadPluginsInstances = fastify.loadPluginsInstances();
  loadPluginsInstances(dirName, basename, ignoredFiles, decorateName);
});
