"use strict";
module.exports = async function (fastify, opts) {
  fastify.get("/", fastify.userHandler_findAll());
  fastify.get("/:id", fastify.userHandler_findById());
};
