"use strict";
module.exports = async function (fastify, opts) {
  fastify.get("/", fastify.userController_findAll());
  fastify.get("/:id", fastify.userController_findById());
  fastify.post("/", fastify.userController_save());
  fastify.delete("/:id", fastify.userController_remove());
  fastify.patch("/:id", fastify.userController_update());
  fastify.put("/:id", fastify.userController_renew());

  fastify.addSchema({
    $id: "http://example.com/",
    type: "object",
    properties: {
      hello: { type: "string" },
    },
  });

  fastify.get("/opashow/", {
    handler() {},
    schema: {
      body: {
        type: "array",
        items: { $ref: "http://example.com#/properties/hello" },
      },
    },
  });
};
