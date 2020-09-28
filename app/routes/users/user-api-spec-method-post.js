"use strict";
const fp = require("fastify-plugin");

module.exports = fp(async (fastify, opts) => {
  
  fastify.decorate("userApiSpecMethodPost", () => {
    const SwaggerRouteSchemaResponse = fastify.swaggerRouteSchemaResponse();

    const SwaggerRouteSchema = fastify
      .swaggerRouteSchema()
      .builder()
      .addDescription("Create an User")
      .addTags(["user"])
      .addSummary("Create an User")
      .addResponse(
        SwaggerRouteSchemaResponse.builder()
          .addCode(200)
          .addDescription("Succesful response")
          .addType("object")
      )
      .addResponse(
        SwaggerRouteSchemaResponse.builder()
          .addCode(201)
          .addDescription("Succesful created")
          .addType("object")
      );

    return SwaggerRouteSchema.specApi();
  });
});
