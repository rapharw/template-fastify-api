"use strict";

module.exports = async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    return `${process.env.TITLE_APP || "My Application"} is Running`;
  });
};
