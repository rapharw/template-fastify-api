"use strict";
const fp = require("fastify-plugin");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope
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
      const prefix = file.replace("-repository.js", "");

      repositories[`${prefix}Repository`] = repo;
    });

  fastify.decorate(`repositories`, repositories);
});
