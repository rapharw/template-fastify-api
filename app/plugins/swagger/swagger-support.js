"use strict";

const fp = require("fastify-plugin");
const SwaggerRouteSchema = require('./swagger-route-schema');
const SwaggerRouteSchemaResponse = require('./swagger-route-schema-response');
const SwaggerRouteSchemaResponseCode = require('./swagger-route-schema-response-code');

module.exports = fp(async (fastify, opts) => {
    fastify.decorate('swaggerRouteSchema', () => {
       return SwaggerRouteSchema;
    });

    fastify.decorate('swaggerRouteSchemaResponse', () => {
        return SwaggerRouteSchemaResponse;
    });

    fastify.decorate('swaggerRouteSchemaResponseCode', () => {
        return SwaggerRouteSchemaResponseCode;
    });
});
