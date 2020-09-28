class SwaggerRouteSchemaResponse {
  constructor() {}

  static builder() {
    return new SwaggerRouteSchemaResponse();
  }

  addCode(code) {
    this.code = code;
    return this;
  }

  addDescription(description) {
    this.description = description;
    return this;
  }

  addType(type) {
    this.type = type;
    return this;
  }

  addProperties(properties) {
    this.properties = properties;
    return this;
  }
}
module.exports = SwaggerRouteSchemaResponse;
