class SwaggerRouteSchema {
  constructor() {}

  static builder() {
    return new SwaggerRouteSchema();
  }

  addDescription(description) {
    this.description = description;
    return this;
  }

  addTags(tags) {
    this.tags = tags;
    return this;
  }

  addSummary(summary) {
    this.summary = summary;
    return this;
  }

  addResponse(response) {
    if (!this.arrayResponse) this.arrayResponse = [];
    this.arrayResponse.push(response);
    return this;
  }

  addParameters(parameters) {
    if (!this.arrayParameters) this.arrayParameters = [];
    this.arrayParameters.push(parameters);
    return this;
  }

  specApi() {
    const infoSpecApi = {
      schema: {
        description: this.description,
        tags: this.tags,
        summary: this.summary,
        security: [{ apiKey: [] }],
        response: {},
        parameters: this.arrayParameters,
      },
    };

    this.arrayResponse.forEach((response) => {
      infoSpecApi.schema.response[response.code] = {
        description: response.description,
        type: response.type,
      };
    });

    return infoSpecApi;
  }
}

module.exports = SwaggerRouteSchema;
