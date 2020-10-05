"use strict";
const fp = require("fastify-plugin");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope
const errors = {};

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
      const error = require(path.join(__dirname, file));
      const prefix = error.name;

      errors[prefix] = error;
    });

  fastify.decorate(`businessErrors`, () => errors);
});
