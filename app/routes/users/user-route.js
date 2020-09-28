"use strict";
module.exports = async function (fastify, opts) {
  const userApiSpecMethodGET = fastify.userApiSpecMethodGet();
  const userApiSpecMethodGETParams = fastify.userApiSpecMethodGetParams();
  const userApiSpecMethodPOST = fastify.userApiSpecMethodPost();

  fastify.get("/", userApiSpecMethodGET, fastify.userController_findAll());
  fastify.get(
    "/:id",
    userApiSpecMethodGETParams,
    fastify.userController_findById()
  );
  fastify.post("/", userApiSpecMethodPOST, fastify.userController_save());
};
