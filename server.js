// Load Environment Variables per File
require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env",
});

require("make-promises-safe");

const fastify = require("fastify")({
  logger: true,
});

// loading db config
fastify.register(require("./app/database/models/index"));
fastify.register(require("./app/routes/hello-world-route"));

// start server
const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
