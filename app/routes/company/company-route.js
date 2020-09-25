"use strict";
module.exports = async function (fastify, opts) {
  fastify.get("/", fastify.companyHandler_findAll());
};
