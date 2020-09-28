"use strict";
const userController = "userController";
const fp = require("fastify-plugin");

module.exports = fp(async (fastify, opts) => {
  const logger = fastify.logger();
  const models = fastify.models();
  const repositories = fastify.repositories();

  fastify.decorate(
    `${userController}_findAll`,
    () => async (request, reply) => {
      console.log(repositories);
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

  fastify.decorate(`${userController}_save`, () => async (request, reply) => {
    const body = request.body;
    const userService = new fastify.userService(logger, models, repositories);
    return userService.createAUser(body);
  });
});
