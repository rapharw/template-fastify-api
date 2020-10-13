/**
 * Configuration to Helmet Security
 */
const fp = require("fastify-plugin");
const helmet = require("fastify-helmet");

module.exports = fp(async (fastify, options) => {
  fastify.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        scriptSrc: [
          "'self'",
          "'sha256-iV83EgAQc1+Q++O7L1ZemfWFbYYPNv2syB2HreE5S/8='" /* -> permiss swagger script*/,
        ],
        imgSrc: ["'self'", "data:" /* -> permiss swagger img data:*/],
        defaultSrc: [
          "'self'",
          "'sha256-pyVPiLlnqL9OWVoJPs/E6VVF5hBecRzM2gBiarnaqAo='" /* -> permiss swagger defaultScript*/,
        ],
        objectSrc: ["'self'"],
        upgradeInsecureRequests: [],
      },
    },
  });
});
