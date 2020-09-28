"use strict";

const fp = require("fastify-plugin");
const SwaggerRouteSchema = require("./swagger/swagger-route-schema");
const SwaggerRouteSchemaResponse = require("./swagger/swagger-route-schema-response");
const SwaggerRouteSchemaParameters = require("./swagger/swagger-route-schema-parameters");
const SwaggerRouteSchemaParametersSchema = require("./swagger/swagger-route-schema-parameters-schema");

module.exports = fp(async (fastify, opts) => {
  fastify.decorate("swaggerRouteSchema", () => {
    return SwaggerRouteSchema;
  });

  fastify.decorate("swaggerRouteSchemaResponse", () => {
    return SwaggerRouteSchemaResponse;
  });

  fastify.decorate("swaggerRouteSchemaParameters", () => {
    return SwaggerRouteSchemaParameters;
  });

  fastify.decorate("swaggerRouteSchemaParametersSchema", () => {
    return SwaggerRouteSchemaParametersSchema;
  });
});
