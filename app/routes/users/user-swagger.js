"use strict";
module.exports = async function (fastify, opts) {

    const SwaggerRouteSchemaResponseCode = fastify.swaggerRouteSchemaResponseCode()
                                        .builder();

    const SwaggerRouteSchemaResponse = fastify.swaggerRouteSchemaResponse()
                                        .builder()
                                        .addCode(SwaggerRouteSchemaResponseCode);

    const SwaggerRouteSchema = fastify.swaggerRouteSchema()
                                        .builder()
                                        .addDescription('Opa')
                                        .addResponse(SwaggerRouteSchemaResponse);

    console.log(SwaggerRouteSchema.toString());

    // swaggerRouteSchema.builder()
    //                       .description('')
    //                       .tags(['user'])
    //                       .summary('')
    //                       .response()
    //                         .code(200)
    //                           .description('Success')
    //                           .type('object')
    //                           .properties(new Object())
    //                         .end()
    //                       .end()
    //                   .build();
};