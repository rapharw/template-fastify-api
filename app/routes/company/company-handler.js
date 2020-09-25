"use strict";
const handler = "companyHandler";
const fp = require("fastify-plugin");

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async (fastify, opts) => {
  fastify.decorate(`${handler}_findAll`, () => async (request, reply) => {
    const st = new fastify.userService();
    return st.findAll();
  });
});
