"use strict";
require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env",
});

require("make-promises-safe");
require("babel-register");

const path = require("path");

// (optional) initialize here your Stream logger, and include on the fastify options below
const fastify = require("fastify")({
  logger: {
    level: process.env.LOGGER_LEVEL || "info",
  },
});

fastify.register(require(path.resolve("app/bootstrap")));
fastify.listen(process.env.PORT || 3000);
