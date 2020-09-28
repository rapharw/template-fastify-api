class SwaggerRouteSchemaParametersSchema {
  constructor() {}

  static builder() {
    return new SwaggerRouteSchemaParametersSchema();
  }

  addType(type) {
    this.type = type;
    return this;
  }

  addName(name) {
    this.name = name;
    return this;
  }

  addDefault(isDefault) {
    this.default = isDefault;
    return this;
  }

  addEnum(enums) {
    this.enums = enums;
    return this;
  }
}
module.exports = SwaggerRouteSchemaParametersSchema;
