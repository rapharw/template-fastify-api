"use strict";
const userHandler = "userHandler";
const fp = require("fastify-plugin");

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async (fastify, opts) => {
  const models = fastify.db;
  const repositories = fastify.repositories;

  fastify.decorate(`${userHandler}_findAll`, () => async (request, reply) => {
    fastify.logger().info("OPA");
    return new fastify.userService(models, repositories).findAllUsers();
  });

  fastify.decorate(`${userHandler}_findById`, () => async (request, reply) => {
    const id = request.params.id;
    return new fastify.userService(models, repositories).findUserById(id);
  });
});
