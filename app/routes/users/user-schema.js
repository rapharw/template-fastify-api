module.exports = (fastify) => {
  const getSchema = () => {
    const pathToSchemaYaml = "app/swagger/users/user-schema-spec.yaml";
    const yamlSchema = fastify.converter().loadYamlFromPath(pathToSchemaYaml);

    const schema = {
      body: yamlSchema,
    };

    return schema;
  };

  return { getSchema };
};
