require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env",
});

require("make-promises-safe");
require("babel-register");

const path = require("path");
const startServer = require(path.resolve("app/config/fastify/fastify-config"));

startServer();
