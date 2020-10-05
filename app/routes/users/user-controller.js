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
  const businessErrors = fastify.businessErrors();

  fastify.decorate(
    `${userController}_findAll`,
    () => async (request, reply) => {
      const filter = filterQueryParameters(logger, request);
      const userService = new fastify.UserService(
        logger,
        models,
        repositories,
        businessErrors
      );
      return userService.findAllUsers(filter);
    }
  );

  fastify.decorate(
    `${userController}_findById`,
    () => async (request, reply) => {
      const id = getPathParamId(logger, request);
      const userService = new fastify.UserService(
        logger,
        models,
        repositories,
        businessErrors
      );
      return userService.findUserById(id);
    }
  );

  fastify.decorate(`${userController}_save`, () => async (request, reply) => {
    const body = getBody(logger, request);
    const userService = new fastify.UserService(
      logger,
      models,
      repositories,
      businessErrors
    );
    return userService.createAUser(body);
  });

  fastify.decorate(`${userController}_remove`, () => async (request, reply) => {
    const id = getPathParamId(logger, request);
    const userService = new fastify.UserService(
      logger,
      models,
      repositories,
      businessErrors
    );
    return userService.deleteUserById(id);
  });

  fastify.decorate(`${userController}_update`, () => async (request, reply) => {
    const id = getPathParamId(logger, request);
    const body = getBody(logger, request);
    const userService = new fastify.UserService(
      logger,
      models,
      repositories,
      businessErrors
    );
    return userService.updateUserById(id, body);
  });

  fastify.decorate(`${userController}_renew`, () => async (request, reply) => {
    const id = getPathParamId(logger, request);
    const body = getBody(logger, request);

    const userService = new fastify.UserService(
      logger,
      models,
      repositories,
      businessErrors
    );
    return userService.createUserExcludingOld(id, body, entitySequelize);
  });
});
