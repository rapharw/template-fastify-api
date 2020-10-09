"use strict";
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
  const services = fastify.services();
  const repositories = fastify.repositories();
  const businessErrors = fastify.businessErrors();
  const successHandler = fastify.successHandler();

  fastify.decorate("userController", () => {
    /**
     * Return a List of Users
     */
    const findAll = async (request, reply) => {
      const filter = filterQueryParameters(logger, request);
      const userService = new services.UserService(
        logger,
        models,
        repositories,
        businessErrors
      );
      return successHandler.ok(reply, userService.findAllUsers(filter));
    };

    /**
     * Return an User by ID
     */
    const findById = async (request, reply) => {
      const id = getPathParamId(logger, request);
      const userService = new services.UserService(
        logger,
        models,
        repositories,
        businessErrors
      );
      return successHandler.ok(reply, userService.findUserById(id));
    };

    /**
     * Create an User
     */
    const save = async (request, reply) => {
      const body = getBody(logger, request);
      const userService = new services.UserService(
        logger,
        models,
        repositories,
        businessErrors
      );
      return successHandler.created(reply, userService.createAUser(body));
    };

    /**
     * Remove an User by ID
     */
    const remove = async (request, reply) => {
      const id = getPathParamId(logger, request);
      const userService = new services.UserService(
        logger,
        models,
        repositories,
        businessErrors
      );
      userService.deleteUserById(id);
      return successHandler.ok(reply, id);
    };

    /**
     * Update the atributes of an User by ID
     */
    const update = async (request, reply) => {
      const id = getPathParamId(logger, request);
      const body = getBody(logger, request);
      const userService = new services.UserService(
        logger,
        models,
        repositories,
        businessErrors
      );
      userService.updateUserById(id, body);
      return successHandler.ok(reply, id);
    };

    /**
     * Recreate an User by ID, excluding old User and create a new User.
     */
    const renew = async (request, reply) => {
      const id = getPathParamId(logger, request);
      const body = getBody(logger, request);

      const userService = new services.UserService(
        logger,
        models,
        repositories,
        businessErrors
      );
      return successHandler.ok(reply, userService.createUserExcludingOld(id, body, entitySequelize));
    };

    return { findAll, findById, save, remove, update, renew };
  });
});
