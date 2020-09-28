class SwaggerRouteSchema {
    constructor() {
    }

    static builder(){
        return new SwaggerRouteSchema();
    }

    addDescription(description){
        this.description = description;
        return this;
    }

    addTags(tags){
        this.tags = tags;
        return this;
    }

    addSummary(summary){
        this.summary = summary;
        return this;
    }

    addResponse(response){
        this.response = response;
        return this;
    }
}

SwaggerRouteSchema.prototype.toString = () => {return this.response};

module.exports = SwaggerRouteSchema;
