"use strict";
module.exports = async function (fastify, opts) {
  const userController = fastify.userController();

  const userSchema = require("./user-schema")(fastify);
  const schema = userSchema.getSchema();

  fastify.get("/", userController.findAll);
  fastify.get("/:id", userController.findById);
  fastify.post("/", { schema }, userController.save);
  fastify.delete("/:id", userController.remove);
  fastify.patch("/:id", { schema }, userController.update);
  fastify.put("/:id", { schema }, userController.renew);
};
