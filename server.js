"use strict";
require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env",
});
require("make-promises-safe");


// (optional) initialize here your Stream logger, and include on the fastify options below
const fastify = require("fastify")({
  logger: {
    level: process.env.LOGGER_LEVEL || "info",
  },
});


//Initializing Fastify
const path = require("path");
fastify.register(require(path.resolve("app/bootstrap")));

fastify.listen(process.env.PORT || 3000);