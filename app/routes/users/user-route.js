"use strict";
module.exports = async function (fastify, opts) {
  fastify.get("/", fastify.userController_findAll());
  fastify.get("/:id", fastify.userController_findById());
  fastify.post("/", fastify.userController_save());
  fastify.delete("/:id", fastify.userController_remove());
  fastify.patch("/:id", fastify.userController_update());
};
