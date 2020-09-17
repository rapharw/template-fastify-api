require("dotenv").config();

const setEnvOrDefault = (name, type = "string") => {
  let parseNegotiate = (y) => y;
  switch (type) {
    case "int":
      parseNegotiate = (y) => parseInt(y);
  }
  return parseNegotiate(
    process.env[name.toUpperCase()] || process.env[name.toLowerCase()]
  );
};

module.exports = {
  environment: {
    type: setEnvOrDefault("environment_type"),
  },

  server: {
    port: setEnvOrDefault("port"),
    context: setEnvOrDefault("server_context"),
  },

  database: {
    host: setEnvOrDefault("database_host"),
    user: setEnvOrDefault("database_user"),
    databaseName: setEnvOrDefault("database_database_name"),
    password: setEnvOrDefault("database_password"),
    poolMaxConnection: setEnvOrDefault("database_pool_max_connection", "int"),
    poolMinConnection: setEnvOrDefault("database_pool_min_connection", "int"),
    poolIdle: setEnvOrDefault("database_pool_idle", "int"),
    poolAcquire: setEnvOrDefault("database_acquire", "int"),
  },
};
