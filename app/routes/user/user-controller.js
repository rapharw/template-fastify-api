"use strict";
const userController = "userController";
const fp = require("fastify-plugin");

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async (fastify, opts) => {
  const logger = fastify.logger();
  const models = fastify.db;
  const repositories = fastify.repositories;

  fastify.decorate(
    `${userController}_findAll`,
    () => async (request, reply) => {
      const userService = new fastify.userService(logger, models, repositories);
      return userService.findAllUsers();
    }
  );

  fastify.decorate(
    `${userController}_findById`,
    () => async (request, reply) => {
      const id = request.params.id;
      const userService = new fastify.userService(logger, models, repositories);
      return userService.findUserById(id);
    }
  );
});
