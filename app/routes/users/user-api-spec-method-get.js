"use strict";
const fp = require("fastify-plugin");

module.exports = fp(async (fastify, opts) => {
  fastify.decorate("userApiSpecMethodGet", () => {
    const SwaggerRouteSchemaResponse = fastify.swaggerRouteSchemaResponse();

    const SwaggerRouteSchema = fastify
      .swaggerRouteSchema()
      .builder()
      .addDescription("Search a list of all users")
      .addTags(["user"])
      .addSummary("List all users")
      .addResponse(
        SwaggerRouteSchemaResponse.builder()
          .addCode(200)
          .addDescription("Succesful response")
          .addType("array")
      )
      .addResponse(
        SwaggerRouteSchemaResponse.builder()
          .addCode(201)
          .addDescription("Succesful created")
          .addType("array")
      );
    return SwaggerRouteSchema.specApi();
  });
});
