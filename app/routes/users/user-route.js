"use strict";
module.exports = async function (fastify, opts) {
  const teste = {
    schema: {
      description: 'Search a list of all users',
      tags: ['user'],
      summary: 'List all users',
      security: [{ apiKey: [] }],
      response: {
        200: {
          description: 'Succesful response',
          type: 'array'
        },
        201: {
          description: 'Succesful response',
          type: 'array'
        },
      }
    }
  };

  // let swagger = fastify.swagger();
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


  fastify.get("/", teste , fastify.userController_findAll());
  fastify.get("/:id", fastify.userController_findById());
  fastify.post("/", fastify.userController_save());

};
