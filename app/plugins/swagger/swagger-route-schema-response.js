class SwaggerRouteSchemaResponse{

    constructor() {
    }

    static builder(){
        return new SwaggerRouteSchemaResponse();
    }

    addCode(code){
        this.code = code;
        return this;
    }
}

SwaggerRouteSchemaResponse.prototype.toString = () => {return 'Pity the Foo'};

module.exports = SwaggerRouteSchemaResponse;
