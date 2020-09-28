class SwaggerRouteSchemaResponseCode {

    constructor() {
    }

    static builder(){
        return new SwaggerRouteSchemaResponseCode();
    }

    addDescription(description){
        this.description = description;
        return this;
    }

    addType(type){
        this.type = type;
        return this;
    }

    addProperties(properties){
        this.properties = properties;
        return this;
    }
}

module.exports = SwaggerRouteSchemaResponseCode;
