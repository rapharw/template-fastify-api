class SwaggerRouteSchemaParameters {
  constructor() {}

  static builder() {
    return new SwaggerRouteSchemaParameters();
  }

  addName(name) {
    this.name = name;
    return this;
  }

  addIn(inParam) {
    this.in = inParam;
    return this;
  }

  addRequired(required) {
    this.required = required;
    return this;
  }

  addDescription(description) {
    this.description = description;
    return this;
  }

  addSchema(schema) {
    this.schema = schema;
    return this;
  }
}
module.exports = SwaggerRouteSchemaParameters;
