"use strict";
const fp = require("fastify-plugin");

module.exports = fp(async (fastify, opts) => {
  fastify.decorate("userApiSpecMethodGetParams", () => {
    const SwaggerRouteSchemaParametersSchema = fastify.swaggerRouteSchemaParametersSchema();
    const SwaggerRouteSchemaParameters = fastify
      .swaggerRouteSchemaParameters()
      .builder()
      .addName("name of my param")
      .addIn("header")
      .addRequired(true)
      .addDescription("rota com id no param");

    const SwaggerRouteSchemaResponse = fastify.swaggerRouteSchemaResponse();

    const SwaggerRouteSchema = fastify
      .swaggerRouteSchema()
      .builder()
      .addDescription("Search an User by ID")
      .addTags(["user"])
      .addSummary("Search one User")
      .addParameters(SwaggerRouteSchemaParameters)
      .addResponse(
        SwaggerRouteSchemaResponse.builder()
          .addCode(200)
          .addDescription("Succesful response")
          .addType("object")
      );

    console.log(SwaggerRouteSchema.specApi());
    return SwaggerRouteSchema.specApi();
  });
});
