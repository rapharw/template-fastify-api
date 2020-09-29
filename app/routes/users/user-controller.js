"use strict";
const userController = "userController";
const fp = require("fastify-plugin");
const {
  filterQueryParameters,
  getPathParamId,
  getBody,
} = require("./user-filter");

module.exports = fp(async (fastify, opts) => {
  const logger = fastify.logger();
  const models = fastify.models();
  const entitySequelize = fastify.sequelizeInstance();
  const repositories = fastify.repositories();

  fastify.decorate(
    `${userController}_findAll`,
    () => async (request, reply) => {
      const filter = filterQueryParameters(logger, request);
      const userService = new fastify.userService(logger, models, repositories);
      return userService.findAllUsers(filter);
    }
  );

  fastify.decorate(
    `${userController}_findById`,
    () => async (request, reply) => {
      const id = getPathParamId(logger, request);
      const userService = new fastify.userService(logger, models, repositories);
      return userService.findUserById(id);
    }
  );

  fastify.decorate(`${userController}_save`, () => async (request, reply) => {
    const body = getBody(logger, request);
    const userService = new fastify.userService(logger, models, repositories);
    return userService.createAUser(body);
  });

  fastify.decorate(`${userController}_remove`, () => async (request, reply) => {
    const id = getPathParamId(logger, request);
    const userService = new fastify.userService(logger, models, repositories);
    return userService.deleteUserById(id);
  });

  fastify.decorate(`${userController}_update`, () => async (request, reply) => {
    const id = getPathParamId(logger, request);
    const body = getBody(logger, request);
    const userService = new fastify.userService(logger, models, repositories);
    return userService.updateUserById(id, body);
  });

  fastify.decorate(`${userController}_renew`, () => async (request, reply) => {
    const id = getPathParamId(logger, request);
    const body = getBody(logger, request);

    const userService = new fastify.userService(logger, models, repositories);
    return userService.createUserExcludingOld(id, body, entitySequelize);
  });
});
