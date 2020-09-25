"use strict";
module.exports = async function (fastify, opts) {
  fastify.get("/", fastify.userController_findAll());
  fastify.get("/:id", fastify.userController_findById());
};
