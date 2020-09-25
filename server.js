"use strict";
require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env",
});

require("make-promises-safe");
require("babel-register");

// (optional) initialize here your Stream logger, and include on the fastify options below
const fastify = require("fastify")({
  logger: {
    level: process.env.LOGGER_LEVEL || "info",
  },
});

const path = require("path");
fastify.register(require(path.resolve("app/bootstrap")));

fastify.listen(process.env.PORT || 3000);